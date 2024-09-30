import { createContext, Dispatch, SetStateAction } from "react";
import { NextAndPreviousWeek } from "./GlobalContextProvider";
import { WeekDaysList } from "../../../pages/week-days";
import { Bookings } from "../../../@types/booking";

interface GlobalContextType {
  bookings: Bookings;
  setBookings: Dispatch<SetStateAction<Bookings>>;
  bookingModal: boolean;
  setBookingModal: Dispatch<SetStateAction<boolean>>;
  closeModal: Dispatch<SetStateAction<boolean>>;
  hours: string[];
  setHours: Dispatch<SetStateAction<string[]>>;
  daysOfWeek: WeekDaysList;
  nextWeek: () => NextAndPreviousWeek;
  previousWeek: () => NextAndPreviousWeek;
}

const GlobalContext = createContext<GlobalContextType>({
  bookings: [],
  hours: [],
  daysOfWeek: new Map(),
  bookingModal: false,
  setBookings: () => {},
  setBookingModal: () => {},
  closeModal: () => {},
  setHours: () => {},
  nextWeek: () => ({ firstDayOfWeek: new Date(), lastDayOfWeek: new Date() }),
  previousWeek: () => ({
    firstDayOfWeek: new Date(),
    lastDayOfWeek: new Date(),
  }),
});

export default GlobalContext;
