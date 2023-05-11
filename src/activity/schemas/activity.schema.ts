import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ActivityInterface } from '../interfaces/activity.interface';

@Schema({
  timestamps: true,
})
export class Activity implements ActivityInterface {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
