import { ActivityInterface } from './activity.interface';

export interface ResponseActivityInterface {
  statusCode: number;
  message: string | ActivityInterface | ActivityInterface[];
  error?: string;
}
