import {
    Controller,
    ClassSerializerInterceptor,
    Get,
    Request,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from './../../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}