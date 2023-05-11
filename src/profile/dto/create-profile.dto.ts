import { IsNotEmpty } from 'class-validator';
import { ProfileInterface } from '../interfaces/profile.interface';

export class CreateProfileDto implements ProfileInterface {
  @IsNotEmpty({
    message: `profile's name cannot be empty`,
  })
  profileName: string;
}
