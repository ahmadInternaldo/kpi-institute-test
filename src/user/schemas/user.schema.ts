import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserInterface } from '../interfaces/user.interface';

@Schema({
  timestamps: true,
})
export class User implements UserInterface {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
