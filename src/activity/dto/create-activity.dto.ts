import { IsNotEmpty } from 'class-validator';
import { ActivityInterface } from '../interfaces/activity.interface';
import { UserInterface } from 'src/user/interfaces/user.interface';

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
  start_date: Date;

  @IsNotEmpty({
    message: 'end date cannot be empty',
  })
  end_date: Date;

  @IsNotEmpty({
    message: 'skill id cannot be empty',
  })
  skill_id: string;

  @IsNotEmpty({
    message: 'skill name cannot be empty',
  })
  skill_name: string;

  @IsNotEmpty({
    message: 'participants cannot be empty',
  })
  participants: UserInterface[];
}
