import { useMemo, useRef, useState } from "react";
import { user1, user2 } from "./mock-data";
import GlobalContext from "./global-context";
import generateTimes from "../pages/hours";
import { WeekDays, WeekDaysList } from "../pages/week-days";
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

export interface NextAndPreviousWeek {
  firstDayOfWeek: Date;
  lastDayOfWeek: Date;
}

const GlobalContextProvider: React.FC<React.PropsWithChildren<object>> = ({
  children,
}) => {
  const [events, setEvents] = useState(initialEvents);
  const [eventModal, setEventModal] = useState<boolean>(false);
  const [hours, setHours] = useState<string[]>(() =>
    generateTimes(START_TIME, END_TIME, INTERVAL)
  );

  const {
    week: initialWeek,
    firstDayOfWeek: initialFirst,
    lastDayOfWeek: initialLast,
  } = useMemo(() => WeekDays.generateWeekDays(), []);
  const firstDayOfWeek = useRef(initialFirst);
  const lastDayOfWeek = useRef(initialLast);

  const [week, setWeek] = useState<WeekDaysList>(initialWeek);

  const nextWeek = (): NextAndPreviousWeek => {
    const result = WeekDays.generateWeekDays(lastDayOfWeek.current);

    setWeek(WeekDays.generateWeekDays(lastDayOfWeek.current).week);

    lastDayOfWeek.current = result.lastDayOfWeek;
    firstDayOfWeek.current = result.firstDayOfWeek;

    return {
      firstDayOfWeek: result.firstDayOfWeek,
      lastDayOfWeek: result.lastDayOfWeek,
    };
  };

  const previousWeek = (): NextAndPreviousWeek => {
    const result = WeekDays.generateWeekDays(firstDayOfWeek.current);

    setWeek(WeekDays.generateWeekDays(firstDayOfWeek.current).week);

    lastDayOfWeek.current = result.lastDayOfWeek;
    firstDayOfWeek.current = result.firstDayOfWeek;

    return {
      firstDayOfWeek: result.firstDayOfWeek,
      lastDayOfWeek: result.lastDayOfWeek,
    };
  };

  return (
    <GlobalContext.Provider
      value={{
        events,
        setEvents: setEvents,
        eventModal,
        setEventModal,
        closeModal: () => setEventModal(false),
        hours,
        setHours,
        daysOfWeek: week,
        nextWeek,
        previousWeek,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
