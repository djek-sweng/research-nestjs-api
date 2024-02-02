import { IsNotEmpty, IsString } from 'class-validator';
import { SigninDto } from './signin.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto extends SigninDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;
}
