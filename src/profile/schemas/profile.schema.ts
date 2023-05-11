import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProfileInterface } from '../interfaces/profile.interface';

@Schema({
  timestamps: true,
})
export class Profile implements ProfileInterface {
  @Prop()
  profileName: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
