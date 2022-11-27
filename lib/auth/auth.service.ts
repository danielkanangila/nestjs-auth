import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'lib/users/typeorm/dto';
import { jwtConstants } from './constants';
import { UsersService } from 'lib/users/typeorm/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByCredentials(username);
        if (user && bcrypt.compareSync(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
            expiresIn: jwtConstants.expiresIn,
        };
    }

    async register(userDto: CreateUserDto) {
        const messages = await this.usersService.checkIfUserExists(userDto);
        if (messages) throw new BadRequestException(messages);

        const user = await this.usersService.create(userDto);
        return this.login(user);
    }
}
