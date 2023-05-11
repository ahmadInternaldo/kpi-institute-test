import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SkillInterface } from '../interfaces/skill.interface';

@Schema({
  timestamps: true,
})
export class Skill implements SkillInterface {
  @Prop()
  skillName: string;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
