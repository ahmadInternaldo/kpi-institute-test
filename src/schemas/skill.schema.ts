import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';
import { Activity } from './activity.schema';
import { SkillInterface } from 'src/skill/interfaces/skill.interface';

@Schema()
export class Skill extends Document implements SkillInterface {
  @Prop({ required: true })
  skill_name: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: Types.ObjectId, ref: 'Activity' })
  activity: Activity;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
