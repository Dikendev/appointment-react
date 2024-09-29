import { createContext, Dispatch, SetStateAction } from "react";

interface EventContextType {
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  selectedHour: string;
  setSelectedHour: Dispatch<SetStateAction<string>>;
  openNewEventModal: (day: Date, hour: string) => void;
}

const EventContext = createContext<EventContextType>({
  selectedDate: new Date(),
  setSelectedDate: () => {},
  selectedHour: "",
  setSelectedHour: () => {},
  openNewEventModal: () => {},
});

export default EventContext;
