import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class UserResponseDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  username: string;

  @Expose()
  @ApiProperty()
  firstName: string;

  @Expose()
  @ApiProperty()
  lastName: string;

  @Expose()
  @ApiProperty()
  dateLastLoginAttempt: Date;

  @Expose()
  @ApiProperty()
  dateLastLogin: Date;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  phone: string;

  @Expose()
  @ApiProperty()
  emailVerified: boolean;

  @Expose()
  @ApiProperty()
  phoneVerified: boolean;

  @Expose()
  @ApiProperty()
  verificationToken: string;

  @Expose()
  @ApiProperty()
  status: string;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  lastUpdatedAt: Date;
}
