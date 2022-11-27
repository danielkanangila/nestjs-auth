import {
    IsString,
    IsEmail,
    IsOptional,
    IsPhoneNumber,
    IsAlpha,
    Matches,
    MinLength,
    IsBoolean,
    IsDateString,
  } from 'class-validator';

  export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @MinLength(2)
    username: string;

    @IsOptional()
    @IsString()
    @Matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message: 'password too weak',
      },
    )
    password: string;

    @IsOptional()
    @IsAlpha()
    @MinLength(2)
    firstName: string;

    @IsOptional()
    @IsAlpha()
    @MinLength(2)
    lastName: string;

    @IsOptional()
    @IsDateString()
    dateLastLoginAttempt: Date;

    @IsOptional()
    @IsDateString()
    dateLastLogin: Date;

    @IsOptional()
    @IsString()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    @IsPhoneNumber('US' || 'RW')
    phone: string;

    @IsOptional()
    @IsBoolean()
    emailVerified: boolean;

    @IsOptional()
    @IsBoolean()
    phoneVerified: boolean;

    @IsOptional()
    @IsString()
    verificationToken: string;

    @IsOptional()
    @IsString()
    status: string;
  }