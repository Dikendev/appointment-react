import {
  createContext,
  Dispatch,
  MutableRefObject,
  SetStateAction,
} from "react";
import { ActionDay, NextAndPreviousWeek } from "./GlobalContextProvider";
import { BookingResponse, BookingsResponse } from "../../@types/booking";
import { Times } from "../../pages/hours";
import { WeekDaysList } from "../../utils/date-utils";

interface GlobalContextType {
  bookings: BookingsResponse;
  setBookings: Dispatch<SetStateAction<BookingsResponse>>;
  bookingModal: boolean;
  setBookingModal: Dispatch<SetStateAction<boolean>>;
  closeModal: Dispatch<SetStateAction<boolean>>;
  hours: Times;
  daysOfWeek: WeekDaysList;
  bookingType: string;
  setBookingType: Dispatch<SetStateAction<string>>;
  todayWeek: () => NextAndPreviousWeek;
  nextWeek: () => NextAndPreviousWeek;
  previousWeek: () => NextAndPreviousWeek;
  setTodayDay: (date: Date, daysQuantity: number) => Map<string, Date>;
  handleDayChange: (actionDay: ActionDay) => WeekDaysList | undefined;
  firstDayOfWeekRef: MutableRefObject<Date>;
  lastDayOfWeekRef: MutableRefObject<Date>;
  handleOnGetBookings: () => void;
  setBookingResponse: Dispatch<SetStateAction<BookingResponse | null>>;
  bookingResponse: BookingResponse | null;
}

const GlobalContext = createContext<GlobalContextType>({
  bookings: [],
  hours: { withOriginal: new Map(), formatted: [] },
  daysOfWeek: new Map(),
  bookingModal: false,
  bookingType: "",
  setBookingType: () => {},
  setBookings: () => {},
  setBookingModal: () => {},
  closeModal: () => {},
  todayWeek: () => ({ firstDayOfWeek: new Date(), lastDayOfWeek: new Date() }),
  nextWeek: () => ({ firstDayOfWeek: new Date(), lastDayOfWeek: new Date() }),
  previousWeek: () => ({
    firstDayOfWeek: new Date(),
    lastDayOfWeek: new Date(),
  }),
  setTodayDay: () => new Map(),
  handleDayChange: () => new Map(),
  firstDayOfWeekRef: { current: new Date() },
  lastDayOfWeekRef: { current: new Date() },
  handleOnGetBookings: () => {},
  bookingResponse: null,
  setBookingResponse: () => {},
});

export default GlobalContext;
