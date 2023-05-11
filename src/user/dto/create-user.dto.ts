import { UserInterface } from '../interfaces/user.interface';

export class CreateUserDto implements UserInterface {
  name: string;
  email: string;
  username: string;
  password: string;
  token: string;
}
