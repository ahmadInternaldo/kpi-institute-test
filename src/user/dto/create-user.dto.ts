import { ProfileInterface } from 'src/schemas/profile.schema';
import { UserInterface } from '../interfaces/user.interface';
import { IsEmail, IsEmpty, IsNotEmpty } from 'class-validator';
import { SkillInterface } from 'src/skill/interfaces/skill.interface';
export class CreateUserDto implements UserInterface {
  @IsNotEmpty({
    message: 'name cannot be empty',
  })
  name: string;

  @IsEmail({}, { message: 'incorrect email structure' })
  email: string;

  @IsNotEmpty({
    message: 'username cannot be empty',
  })
  username: string;

  @IsNotEmpty({
    message: 'password cannot be empty',
  })
  password: string;

  @IsEmpty()
  token: string;

  @IsNotEmpty()
  profile: ProfileInterface;

  @IsNotEmpty()
  skill: SkillInterface;
}
