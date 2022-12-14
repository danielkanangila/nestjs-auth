import {
  Module,
  DynamicModule,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { UsersModule } from './../users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { AuthToken } from './auth-token.entity';
import { User } from './../users/users.entity';
import { UserAuditMiddleware } from 'lib/users/users-audit.middleware';
import { AuthModuleConfig } from './interfaces';
import { AuthMiddleware } from './auth-middleware';
import { UserAuthDevices } from './user-auth-devices.entity';

@Module({})
export class AuthModule implements NestModule {
  static register(config: AuthModuleConfig): DynamicModule {
    const dataSource = {
      ...config.dataSource,
      entities: [User, AuthToken, UserAuthDevices],
      synchronize: true,
    } as TypeOrmModuleOptions;

    return {
      module: AuthModule,
      imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: jwtConstants.expiresIn },
        }),
        TypeOrmModule.forRoot(dataSource),
        TypeOrmModule.forFeature([AuthToken, UserAuthDevices]),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        {
          provide: 'AUTH_MODULE_CONFIG',
          useValue: config,
        },
      ],
    };
  }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, UserAuditMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
