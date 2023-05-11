import { IsNotEmpty } from 'class-validator';
import { ActivityInterface } from '../interfaces/activity.interface';

export class CreateActivityDto implements ActivityInterface {
  @IsNotEmpty({
    message: 'title cannot be empty',
  })
  title: string;

  @IsNotEmpty({
    message: 'description cannot be empty',
  })
  description: string;

  @IsNotEmpty({
    message: 'start date cannot be empty',
  })
  startDate: Date;

  @IsNotEmpty({
    message: 'end date cannot be empty',
  })
  endDate: Date;
}
