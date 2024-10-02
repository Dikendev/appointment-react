import { createContext, Dispatch, SetStateAction } from "react";
import { ActionDay, NextAndPreviousWeek } from "./GlobalContextProvider";
import { WeekDaysList } from "../../../pages/week-days";
import { Bookings } from "../../../@types/booking";
import { Times } from "../../../pages/hours";

interface GlobalContextType {
  bookings: Bookings;
  setBookings: Dispatch<SetStateAction<Bookings>>;
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
});

export default GlobalContext;
