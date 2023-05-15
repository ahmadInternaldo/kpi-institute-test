import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface BlacklistInterface {
  token: string;
  status: boolean;
}

@Schema({
  timestamps: true,
})
export class Blacklist extends Document implements BlacklistInterface {
  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  status: boolean;
}

export const BlacklistSchema = SchemaFactory.createForClass(Blacklist);
