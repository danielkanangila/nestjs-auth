import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'lib/users/dto';
import { jwtConstants } from './constants';
import { UsersService } from './../users/users.service';
import { AuthToken } from './auth-token.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(AuthToken)
    private readonly authTokenRepository: Repository<AuthToken>,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByCredentials(username);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      // update last login
      await this.usersService.update(user.id, {
        ...user,
        dateLastLogin: new Date().toISOString(),
      });
      return result;
    } else if (user && !bcrypt.compareSync(pass, user.password)) {
      // update last login attempt date
      await this.usersService.update(user.id, {
        ...user,
        dateLastLoginAttempt: new Date().toISOString(),
      });
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    await this.saveToken(accessToken, user.id);
    return {
      access_token: accessToken,
      expiresIn: jwtConstants.expiresIn,
    };
  }

  async register(userDto: CreateUserDto) {
    const messages = await this.usersService.checkIfUserExists(userDto);
    if (messages) throw new BadRequestException(messages);

    const user = await this.usersService.create(userDto);
    return this.login(user);
  }

  async logout(token: string) {
    const authToken = await this.authTokenRepository.findOne({
      where: { token },
    });
    if (authToken) {
      await this.authTokenRepository.remove(authToken);
    }
  }

  async logoutAll(userId: string) {
    const authTokens = await this.authTokenRepository.find({
      where: { userId },
    });
    if (authTokens) {
      await this.authTokenRepository.remove(authTokens);
    }
  }

  async saveToken(token: string, userId: string) {
    const authToken = new AuthToken();
    authToken.token = token;
    authToken.userId = userId;
    authToken.refreshToken = '';
    return this.authTokenRepository.save(authToken);
  }

  async checkToken(token: string) {
    const authToken = await this.authTokenRepository.findOne({
      where: { token },
    });
    return authToken ? true : false;
  }

  async extractToken(req: any) {
    if (!req.headers.authorization) return null;
    const token = req.headers.authorization.split(' ')[1];
    return token;
  }
}
