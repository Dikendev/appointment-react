import { user1, user2 } from "./mock-data";
import { useMemo, useRef, useState } from "react";
import GlobalContext from "./global-context";
import { Bookings } from "../../../@types/booking";
import generateTimes, { Times } from "../../../pages/hours";
import { DateUtils, WeekDaysList } from "../../../pages/week-days";

const today = new Date();

const COLORS = ["#03fcdf", "#03a5fc", "#fc036b"];

const initialEvents: Bookings = [
  {
    id: "1",
    startAt: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 5,
      9,
      0o0
    ),
    finishAt: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
      11,
      30
    ),
    client: user1,
    procedure: {
      id: "1",
      color: COLORS[0],
      name: "Haircut",
      price: 50,
      requiredTimeMin: 90,
    },
    total: 50,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    startAt: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 2,
      10,
      30
    ),
    finishAt: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 2,
      12,
      30
    ),
    client: user2,
    procedure: {
      id: "2",
      color: COLORS[1],
      name: "Haircut",
      price: 530,
      requiredTimeMin: 90,
    },
    total: 530,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    startAt: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 3,
      13,
      30
    ),
    finishAt: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 3,
      15,
      30
    ),
    client: user2,
    procedure: {
      id: "2",
      color: COLORS[2],
      name: "Haircut",
      price: 530,
      requiredTimeMin: 90,
    },
    total: 530,
    createdAt: new Date(),
    updatedAt: new Date(),
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
  const [hours] = useState<Times>(() =>
    generateTimes(START_TIME, END_TIME, INTERVAL)
  );

  const {
    week: initialWeek,
    firstDayOfWeek,
    lastDayOfWeek,
  } = useMemo(() => DateUtils.generateWeekDays(), []);

  const firstDayOfWeekRef = useRef(firstDayOfWeek);
  const lastDayOfWeekRef = useRef(lastDayOfWeek);
  const [week, setWeek] = useState<WeekDaysList>(initialWeek);

  const todayWeek = (): NextAndPreviousWeek => {
    const { week, firstDayOfWeek, lastDayOfWeek } =
      DateUtils.generateWeekDays();

    setWeek(week);

    firstDayOfWeekRef.current = firstDayOfWeek;
    lastDayOfWeekRef.current = lastDayOfWeek;

    return {
      firstDayOfWeek,
      lastDayOfWeek,
    };
  };

  const nextWeek = (): NextAndPreviousWeek => {
    const adding = DateUtils.addDayOrMinus(lastDayOfWeekRef.current, true);
    const result = DateUtils.generateWeekDays(adding);

    setWeek(result.week);

    lastDayOfWeekRef.current = result.lastDayOfWeek;
    firstDayOfWeekRef.current = result.firstDayOfWeek;

    return {
      lastDayOfWeek: result.lastDayOfWeek,
      firstDayOfWeek: result.firstDayOfWeek,
    };
  };

  const previousWeek = (): NextAndPreviousWeek => {
    const minus = DateUtils.addDayOrMinus(firstDayOfWeekRef.current, false);
    const result = DateUtils.generateWeekDays(minus);

    setWeek(result.week);

    lastDayOfWeekRef.current = result.lastDayOfWeek;
    firstDayOfWeekRef.current = result.firstDayOfWeek;

    return {
      lastDayOfWeek: result.lastDayOfWeek,
      firstDayOfWeek: result.firstDayOfWeek,
    };
  };

  return (
    <GlobalContext.Provider
      value={{
        bookings: events,
        setBookings: setEvents,
        bookingModal: eventModal,
        setBookingModal: setEventModal,
        closeModal: () => setEventModal(false),
        hours,
        daysOfWeek: week,
        todayWeek,
        nextWeek,
        previousWeek,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;