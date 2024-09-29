import { createContext, Dispatch, SetStateAction } from "react";
import { Event } from "../@types/event";
import { WeekDaysList } from "../pages/week-days";
import { NextAndPreviousWeek } from "./GlobalContextProvider";

interface GlobalContextType {
  events: Event[];
  setEvents: Dispatch<SetStateAction<Event[]>>;
  eventModal: boolean;
  setEventModal: Dispatch<SetStateAction<boolean>>;
  closeModal: Dispatch<SetStateAction<boolean>>;
  hours: string[];
  setHours: Dispatch<SetStateAction<string[]>>;
  daysOfWeek: WeekDaysList;
  nextWeek: () => NextAndPreviousWeek;
  previousWeek: () => NextAndPreviousWeek;
}

const GlobalContext = createContext<GlobalContextType>({
  events: [],
  hours: [],
  daysOfWeek: new Map(),
  eventModal: false,
  setEvents: () => {},
  setEventModal: () => {},
  closeModal: () => {},
  setHours: () => {},
  nextWeek: () => ({ firstDayOfWeek: new Date(), lastDayOfWeek: new Date() }),
  previousWeek: () => ({
    firstDayOfWeek: new Date(),
    lastDayOfWeek: new Date(),
  }),
});

export default GlobalContext;
