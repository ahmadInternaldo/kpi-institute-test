import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

export interface ProfileInterface {
  profile_name: string;
}

@Schema({
  timestamps: true,
})
export class Profile extends Document implements ProfileInterface {
  @Prop({ required: true })
  profile_name: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User[];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
