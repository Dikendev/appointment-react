import { User } from "./user";

export interface Event {
  day: string;
  startHour: string;
  endHour: string;
  color: string;
  user: User;
}
