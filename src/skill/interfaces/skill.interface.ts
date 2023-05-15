import { UserInterface } from 'src/user/interfaces/user.interface';

export interface SkillInterface {
  skill_name: string;
  users: UserInterface[];
}
