import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';
import { ProfileInterface } from '../profile/interfaces/profile.interface';

@Schema({
  timestamps: true,
})
export class Profile extends Document implements ProfileInterface {
  @Prop({ required: true })
  profile_name: string;

  @Prop({ type: Types.ObjectId, ref: 'User', unique: true })
  user: User;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
