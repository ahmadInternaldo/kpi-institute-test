import { IsNotEmpty } from 'class-validator';
import { SkillInterface } from '../interfaces/skill.interface';

export class CreateSkillDto implements SkillInterface {
  @IsNotEmpty({
    message: `skill's cannot be empty`,
  })
  skillName: string;
}
