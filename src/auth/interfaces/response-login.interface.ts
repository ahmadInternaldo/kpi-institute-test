import { ProfileInterface } from 'src/schemas/profile.schema';

export interface ResponseLoginInterface {
  token: string;
  profile: ProfileInterface;
}
