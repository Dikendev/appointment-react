import { useEffect, useMemo, useRef, useState } from "react";
import GlobalContext from "./global-context";
import { initialEvents } from "./mock-events";
import generateTimes, { Times } from "../../pages/hours";
import BOOKING_VIEW_TYPE from "../../constants/booking-view";
import { DateUtils, WeekDaysList } from "../../utils/date-utils";
import Loading from "../../pages/loading/Loading";

const START_TIME = "08:00";
const END_TIME = "20:30";
const INTERVAL = 30;

export interface NextAndPreviousWeek {
  firstDayOfWeek: Date;
  lastDayOfWeek: Date;
}

export type ActionDay = "today" | "previous" | "next";

const GlobalContextProvider: React.FC<React.PropsWithChildren<object>> = ({
  children,
}) => {
  const [events, setEvents] = useState(initialEvents);
  const [eventModal, setEventModal] = useState<boolean>(false);
  const [hours] = useState<Times>(() =>
    generateTimes(START_TIME, END_TIME, INTERVAL)
  );

  const [bookingType, setBookingType] = useState<string>(BOOKING_VIEW_TYPE[1]);

  const {
    week: initialWeek,
    firstDayOfWeek,
    lastDayOfWeek,
  } = useMemo(() => DateUtils.generateWeekDays(), []);

  const firstDayOfWeekRef = useRef(firstDayOfWeek);
  const lastDayOfWeekRef = useRef(lastDayOfWeek);
  const [week, setWeek] = useState<WeekDaysList>(initialWeek);

  const setTodayDay = (date: Date) => {
    const todaysDayDate = DateUtils.generateDays(date, 0);
    setWeek(() => todaysDayDate);

    let retrieveNewDate = DateUtils.getDayFromList(todaysDayDate);
    if (!retrieveNewDate) retrieveNewDate = new Date();

    updateWeeksRef(retrieveNewDate);

    return todaysDayDate;
  };

  const todayWeek = (): NextAndPreviousWeek => {
    const { week, firstDayOfWeek, lastDayOfWeek } =
      DateUtils.generateWeekDays();

    setWeek(week);

    firstDayOfWeekRef.current = firstDayOfWeek;
    lastDayOfWeekRef.current = lastDayOfWeek;

    updateWeeksRef(lastDayOfWeek, firstDayOfWeek);

    return {
      firstDayOfWeek,
      lastDayOfWeek,
    };
  };

  const nextWeek = (): NextAndPreviousWeek => {
    const adding = DateUtils.addDay(lastDayOfWeekRef.current, 1);
    const result = DateUtils.generateWeekDays(adding);

    setWeek(result.week);

    lastDayOfWeekRef.current = result.lastDayOfWeek;
    firstDayOfWeekRef.current = result.firstDayOfWeek;

    updateWeeksRef(result.lastDayOfWeek, result.firstDayOfWeek);

    return {
      lastDayOfWeek: result.lastDayOfWeek,
      firstDayOfWeek: result.firstDayOfWeek,
    };
  };

  const handleDayChange = (actionDay: ActionDay): WeekDaysList | undefined => {
    switch (actionDay) {
      case "today": {
        return setDays(0);
      }
      case "next": {
        return setDays(1);
      }
      case "previous": {
        return setDays(-1);
      }
    }
  };

  const setDays = (days: number): WeekDaysList | undefined => {
    const actualDay = DateUtils.getDayFromList(week);

    if (!actualDay) return;

    const day = DateUtils.generateDays(actualDay, days);
    setWeek(day);

    const newDate = DateUtils.getDayFromList(day);

    if (!newDate) return;

    updateWeeksRef(newDate);

    return day;
  };

  const previousWeek = (): NextAndPreviousWeek => {
    const minus = DateUtils.addDay(firstDayOfWeekRef.current, -1);
    const result = DateUtils.generateWeekDays(minus);

    setWeek(result.week);
    updateWeeksRef(result.lastDayOfWeek, result.firstDayOfWeek);

    return {
      lastDayOfWeek: result.lastDayOfWeek,
      firstDayOfWeek: result.firstDayOfWeek,
    };
  };

  const updateWeeksRef = (lastDayOfWeek: Date, firstDayOfWeek?: Date) => {
    lastDayOfWeekRef.current = lastDayOfWeek;
    firstDayOfWeekRef.current = firstDayOfWeek ? firstDayOfWeek : lastDayOfWeek;
  };

  const [isLoading, setIsLoading] = useState(true);

  //simulating
  useEffect(() => {
    //fetch all the events initial, to render in system and fill the context.
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

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
        bookingType,
        setBookingType,
        setTodayDay,
        handleDayChange,
        firstDayOfWeekRef,
        lastDayOfWeekRef,
      }}
    >
      {isLoading ? <Loading /> : children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
