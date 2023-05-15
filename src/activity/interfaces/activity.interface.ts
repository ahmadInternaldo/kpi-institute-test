import { UserInterface } from 'src/user/interfaces/user.interface';

export interface ActivityInterface {
  title: string;
  description: string;
  start_date: Date;
  end_date: Date;
  skill_id: string;
  skill_name: string;
  participants: UserInterface[];
}
