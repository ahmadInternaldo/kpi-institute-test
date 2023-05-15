import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';
import { Skill } from './skill.schema';
import { ActivityInterface } from '../activity/interfaces/activity.interface';

@Schema({
  timestamps: true,
})
export class Activity extends Document implements ActivityInterface {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  start_date: Date;

  @Prop()
  end_date: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  users: User[];

  @Prop({ type: Types.ObjectId, ref: 'Skill' })
  skill: Skill;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
