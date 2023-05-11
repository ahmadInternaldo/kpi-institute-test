import { ProfileInterface } from '../interfaces/profile.interface';

export class CreateProfileDto implements ProfileInterface {
  profileName: string;
}
