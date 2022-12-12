import {
  Controller,
  ClassSerializerInterceptor,
  Get,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { UserResponseDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get profile' })
  @ApiResponse({
    status: 200,
    description: 'Return profile',
    type: UserResponseDto,
  })
  async getProfile(@Request() req) {
    const user = await this.usersService.findOne(req.user.userId);
    return user;
  }
}
