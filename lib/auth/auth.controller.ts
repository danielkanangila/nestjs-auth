import {
    Body,
    Controller,
    Post,
    Request,
    UseGuards,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
    import { AuthService } from './auth.service';
    import { LocalAuthGuard } from './local-auth.guard';
    import { CreateUserDto } from './../users/typeorm/dto/user-create.dto';

    @Controller('auth')
    export class AuthController {
        constructor(private authService: AuthService) {}
    
        @UseGuards(LocalAuthGuard)
        @Post('login')
        async login(@Request() req) {
            return this.authService.login(req.user);
        }
    
        @UsePipes(new ValidationPipe({ transform: true }))
        @Post('register')
        async register(@Body() createUserDto: CreateUserDto) {
            return this.authService.register(createUserDto);
        }
        }