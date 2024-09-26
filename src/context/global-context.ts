import { createContext, Dispatch, SetStateAction } from "react";
import { Event } from "../pages/home";

interface GlobalContextType {
  events: Event[];
  setEvents: Dispatch<SetStateAction<Event[]>>;
}

const GlobalContext = createContext<GlobalContextType>({
  events: [],
  setEvents: () => {},
});

export default GlobalContext;
