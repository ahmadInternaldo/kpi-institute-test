import { SkillInterface } from 'src/skill/interfaces/skill.interface';
import { UserInterface } from 'src/user/interfaces/user.interface';

export class UpdateActivityDto {
  title?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  participants?: UserInterface[];
  skill?: SkillInterface;
  skill_name?: string;
  skill_id?: string;
}
