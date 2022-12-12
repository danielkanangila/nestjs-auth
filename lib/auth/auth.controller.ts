import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserDto } from '../users/dto/user-create.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'john.smith@gmail.com',
        },
        password: {
          type: 'string',
          example: '095ee216@',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiam9obi5zbWl0aEBnbWFpbC5jb20iLCJpYXQiOjE1NzYyNjQ4MjMsImV4cCI6MTU3NjI2ODQyM30.1Q2w3e4r5t6y7u8i9o0p',
        },
        expiresIn: {
          type: 'string',
          example: '3600s',
        },
      },
    },
  })
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('register')
  @ApiOperation({ summary: 'Register' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiam9obi5zbWl0aEBnbWFpbC5jb20iLCJpYXQiOjE1NzYyNjQ4MjMsImV4cCI6MTU3NjI2ODQyM30.1Q2w3e4r5t6y7u8i9o0p',
        },
        expiresIn: {
          type: 'string',
          example: '3600s',
        },
      },
    },
  })
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiOperation({ summary: 'Logout' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  async logout(@Request() req) {
    const token = await this.authService.extractToken(req);
    return await this.authService.logout(token);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout_all')
  @ApiOperation({ summary: 'Logout all' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  async logoutAll(@Request() req) {
    return await this.authService.logoutAll(req.user.userId);
  }
}
