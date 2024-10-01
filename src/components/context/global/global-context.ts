import { createContext, Dispatch, SetStateAction } from "react";
import { NextAndPreviousWeek } from "./GlobalContextProvider";
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
  todayWeek: () => NextAndPreviousWeek;
  nextWeek: () => NextAndPreviousWeek;
  previousWeek: () => NextAndPreviousWeek;
}

const GlobalContext = createContext<GlobalContextType>({
  bookings: [],
  hours: { withOriginal: new Map(), formatted: [] },
  daysOfWeek: new Map(),
  bookingModal: false,
  setBookings: () => {},
  setBookingModal: () => {},
  closeModal: () => {},
  todayWeek: () => ({ firstDayOfWeek: new Date(), lastDayOfWeek: new Date() }),
  nextWeek: () => ({ firstDayOfWeek: new Date(), lastDayOfWeek: new Date() }),
  previousWeek: () => ({
    firstDayOfWeek: new Date(),
    lastDayOfWeek: new Date(),
  }),
});

export default GlobalContext;
