import { WeekDaysList } from "../utils/date-utils";
import { BookingsResponse } from "./booking";

export interface WeekViewProps {
  daysOfWeek: WeekDaysList;
  bookings: BookingsResponse;
}
