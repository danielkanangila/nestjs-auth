import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import * as DeviceDetector from 'device-detector-js';
import { CreateUserDto } from './../users/dto';
import { jwtConstants } from './constants';
import { UsersService } from './../users/users.service';
import { AuthToken } from './auth-token.entity';
import { Request } from 'express';
import { UserAuthDevices } from './user-auth-devices.entity';
import { User } from './../users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(AuthToken)
    private readonly authTokenRepository: Repository<AuthToken>,
    @InjectRepository(UserAuthDevices)
    private readonly userAuthDevicesRepository: Repository<UserAuthDevices>,
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

  async extractToken(req: Request) {
    if (!req.headers.authorization) return null;
    const token = req.headers.authorization.split(' ')[1];
    return token;
  }

  async getDeviceInfo(req: Request) {
    const deviceDetector = new DeviceDetector();
    const userAgent = req.headers['user-agent'];
    const deviceInfo = deviceDetector.parse(userAgent);
    const deviceToken = `${deviceInfo.device.type}-${deviceInfo.device.brand}-${deviceInfo.client.name}-${deviceInfo.os.name}-${req.ip}`;
    // check if device is already registered
    const userAuthDevice = await this.userAuthDevicesRepository.findOne({
      where: { deviceToken },
    });
    return {
      ...deviceInfo,
      ip: req.ip,
      deviceToken: deviceToken,
      userAgent: userAgent,
      isNewDevice: userAuthDevice ? false : true,
      revoked: userAuthDevice ? userAuthDevice.revoked : false,
    };
  }

  async saveDeviceDetailsIfNew(req: Request) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const user = await this.usersService.findOne(req.user.id);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const deviceInfo: any = req.deviceInfo;
    // save device details if it's new
    if (deviceInfo.isNewDevice) {
      await this.saveDevice(deviceInfo, user);
    }
  }

  async saveDevice(deviceInfo: any, user: User) {
    const userAuthDevice = new UserAuthDevices();
    userAuthDevice.user = user;
    userAuthDevice.userAgent = deviceInfo.userAgent;
    userAuthDevice.deviceToken = deviceInfo.deviceToken;
    userAuthDevice.deviceType = deviceInfo.device.type;
    userAuthDevice.deviceBrand = deviceInfo.device.brand;
    userAuthDevice.deviceModel = deviceInfo.device.model;
    userAuthDevice.clientName = deviceInfo.client.name;
    userAuthDevice.clientType = deviceInfo.client.type;
    userAuthDevice.clientVersion = deviceInfo.client.version;
    userAuthDevice.clientEngineVersion = deviceInfo.client.engineVersion;
    userAuthDevice.clientEngine = deviceInfo.client.engine;
    userAuthDevice.osName = deviceInfo.os.name;
    userAuthDevice.osVersion = deviceInfo.os.version;
    userAuthDevice.osPlatform = deviceInfo.os.platform;
    userAuthDevice.ip = deviceInfo.ip;

    return this.userAuthDevicesRepository.save(userAuthDevice);
  }
}
