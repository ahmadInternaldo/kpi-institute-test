import { ProfileInterface } from './profile.interface';

export interface ResponseProfileInterface {
  statusCode: number;
  message: string | ProfileInterface | ProfileInterface[];
  error: string;
}
