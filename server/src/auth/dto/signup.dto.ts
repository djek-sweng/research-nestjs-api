import { IsNotEmpty, IsString } from 'class-validator';
import { SigninDto } from '.';

export class SignupDto extends SigninDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
