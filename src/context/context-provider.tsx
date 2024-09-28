import { useMemo, useState } from "react";
import { user1, user2 } from "./mock-data";
import GlobalContext from "./global-context";
import generateTimes from "../pages/hours";
import { WeekDays } from "../pages/week-days";
import { Event } from "../@types/event";

const initialEvents: Event[] = [
  {
    day: "Tue : 24",
    startHour: "08:00",
    endHour: "09:30",
    color: "red",
    user: user1,
  },
  {
    day: "Thu : 26",
    startHour: "13:00",
    endHour: "15:00",
    color: "blue",
    user: user2,
  },
  {
    day: "Thu : 26",
    startHour: "15:30",
    endHour: "16:00",
    color: "red",
    user: user2,
  },
];

const START_TIME = "08:00";
const END_TIME = "24:00";
const INTERVAL = 30;

const ContextProvider: React.FC<React.PropsWithChildren<object>> = (props) => {
  const [events, setEvents] = useState(initialEvents);
  const [newEventModal, setNewEventModal] = useState<boolean>(false);
  const [hours, setHours] = useState<string[]>(() =>
    generateTimes(START_TIME, END_TIME, INTERVAL)
  );
  const daysOfWeek = useMemo(() => WeekDays.generateWeekDays(), []);

  return (
    <GlobalContext.Provider
      value={{
        events,
        setEvents: setEvents,
        newEventModal,
        setNewEventModal,
        hours,
        setHours,
        daysOfWeek,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
