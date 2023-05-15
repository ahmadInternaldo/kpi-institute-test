import { ActivityInterface } from 'src/activity/interfaces/activity.interface';
import { ProfileInterface } from 'src/schemas/profile.schema';
import { SkillInterface } from 'src/skill/interfaces/skill.interface';

export interface UserInterface {
  name: string;
  email: string;
  username: string;
  password: string;
  profile: ProfileInterface;
  skill: SkillInterface;
  activities?: ActivityInterface[];
}
