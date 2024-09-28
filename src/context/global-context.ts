import { createContext, Dispatch, SetStateAction } from "react";
import { Event } from "../@types/event";

interface GlobalContextType {
  events: Event[];
  setEvents: Dispatch<SetStateAction<Event[]>>;
  newEventModal: boolean;
  setNewEventModal: Dispatch<SetStateAction<boolean>>;
  hours: string[];
  setHours: Dispatch<SetStateAction<string[]>>;
  daysOfWeek: string[];
}

const GlobalContext = createContext<GlobalContextType>({
  events: [],
  setEvents: () => {},
  newEventModal: false,
  setNewEventModal: () => {},
  hours: [],
  setHours: () => {},
  daysOfWeek: [],
});

export default GlobalContext;
