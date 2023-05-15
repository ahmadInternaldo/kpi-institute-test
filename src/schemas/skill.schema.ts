import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';
import { Activity } from './activity.schema';
import { SkillInterface } from '../skill/interfaces/skill.interface';

@Schema({
  timestamps: true,
})
export class Skill extends Document implements SkillInterface {
  @Prop({ required: true })
  skill_name: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  users: User[];

  @Prop({ type: Types.ObjectId, ref: 'Activity' })
  activity: Activity[];
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
