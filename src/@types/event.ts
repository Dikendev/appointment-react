import { User } from "./user";

export interface Event {
  date: Date;
  startHour: string;
  endHour: string;
  color: string;
  user: User;
}
