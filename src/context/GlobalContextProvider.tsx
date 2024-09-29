import { user1, user2 } from "./mock-data";
import { useMemo, useRef, useState } from "react";
import GlobalContext from "./global-context";
import generateTimes from "../pages/hours";
import { DateUtils, WeekDaysList } from "../pages/week-days";
import { Event } from "../@types/event";

const today = new Date();
const tomorrow = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() + 1
);

const initialEvents: Event[] = [
  {
    date: today,
    startHour: "08:00",
    endHour: "09:30",
    color: "red",
    user: user1,
  },
  {
    date: tomorrow,
    startHour: "13:00",
    endHour: "15:00",
    color: "blue",
    user: user2,
  },
  {
    date: today,
    startHour: "15:30",
    endHour: "16:00",
    color: "red",
    user: user2,
  },
];

const START_TIME = "08:00";
const END_TIME = "20:30";
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
  } = useMemo(() => DateUtils.generateWeekDays(), []);

  const firstDayOfWeek = useRef(initialFirst);
  const lastDayOfWeek = useRef(initialLast);
  const [week, setWeek] = useState<WeekDaysList>(initialWeek);

  const nextWeek = (): NextAndPreviousWeek => {
    const adding = DateUtils.addDayOrMinus(lastDayOfWeek.current, true);
    const result = DateUtils.generateWeekDays(adding);

    setWeek(result.week);

    lastDayOfWeek.current = result.lastDayOfWeek;
    firstDayOfWeek.current = result.firstDayOfWeek;

    return {
      lastDayOfWeek: result.lastDayOfWeek,
      firstDayOfWeek: result.firstDayOfWeek,
    };
  };

  const previousWeek = (): NextAndPreviousWeek => {
    const minus = DateUtils.addDayOrMinus(firstDayOfWeek.current, false);
    const result = DateUtils.generateWeekDays(minus);

    setWeek(result.week);

    lastDayOfWeek.current = result.lastDayOfWeek;
    firstDayOfWeek.current = result.firstDayOfWeek;

    return {
      lastDayOfWeek: result.lastDayOfWeek,
      firstDayOfWeek: result.firstDayOfWeek,
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
