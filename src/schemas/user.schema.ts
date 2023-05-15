import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Profile } from './profile.schema';
import { Activity } from './activity.schema';
import { Skill } from './skill.schema';
import { UserInterface } from '../user/interfaces/user.interface';

@Schema()
export class User extends Document implements UserInterface {
  @Prop({ required: true })
  name: string;

  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Types.ObjectId, ref: 'Profile' })
  profile: Profile;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Activity' }] })
  activities: Activity[];

  @Prop({ type: Types.ObjectId, ref: 'Skill' })
  skill: Skill;
}

export const UserSchema = SchemaFactory.createForClass(User);
