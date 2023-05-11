import { UserInterface } from '../interfaces/user.interface';
import { IsEmail } from 'class-validator';
export class CreateUserDto implements UserInterface {
  name: string;

  @IsEmail({}, { message: 'incorrect email structure' })
  email: string;

  username: string;
  password: string;
  token: string;
}
