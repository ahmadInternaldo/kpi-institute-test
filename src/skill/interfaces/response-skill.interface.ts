import { SkillInterface } from './skill.interface';

export interface ResponseSkillInterface {
  statusCode: number;
  message: string | SkillInterface | SkillInterface[];
  error?: '';
}
