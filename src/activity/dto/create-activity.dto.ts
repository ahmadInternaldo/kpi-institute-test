import { ActivityInterface } from '../interfaces/activity.interface';

export class CreateActivityDto implements ActivityInterface {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
}
