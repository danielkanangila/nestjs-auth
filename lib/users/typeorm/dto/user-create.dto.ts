import {
  IsString,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsAlpha,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  @IsPhoneNumber('US' || 'RW')
  phone: string;

  @IsString()
  @MinLength(2)
  username: string;

  @IsOptional()
  @IsAlpha()
  @MinLength(2)
  firstName: string;

  @IsOptional()
  @IsAlpha()
  @MinLength(2)
  lastName: string;

  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message: 'password too weak',
    },
  )
  password: string;
}
