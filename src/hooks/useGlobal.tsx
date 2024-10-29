import { useContext } from "react";
import GlobalContext from "../context/global/global-context";

const useGlobal = () => {
  const {
    bookings,
    setBookings,
    hours,
    bookingType,
    todayWeek,
    nextWeek,
    previousWeek,
    setTodayDay,
    handleDayChange,
    firstDayOfWeekRef,
    lastDayOfWeekRef,
    handleOnGetBookings,
    daysOfWeek,
    bookingResponse,
    setBookingResponse,
  } = useContext(GlobalContext);

  return {
    bookings,
    setBookings,
    hours,
    bookingType,
    todayWeek,
    nextWeek,
    previousWeek,
    setTodayDay,
    handleDayChange,
    firstDayOfWeekRef,
    lastDayOfWeekRef,
    handleOnGetBookings,
    daysOfWeek,
    bookingResponse,
    setBookingResponse,
  };
};

export default useGlobal;
