import { createContext, Dispatch, SetStateAction } from "react";

interface EventContextType {
  selectedDay: string;
  setSelectedDay: Dispatch<SetStateAction<string>>;
  selectedHour: string;
  setSelectedHour: Dispatch<SetStateAction<string>>;
  openNewEventModal: (day: string, hour: string) => void;
}

const EventContext = createContext<EventContextType>({
  selectedDay: "",
  setSelectedDay: () => {},
  selectedHour: "",
  setSelectedHour: () => {},
  openNewEventModal: () => {},
});

export default EventContext;
