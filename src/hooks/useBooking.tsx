import { useContext } from "react";
import BookingContext from "../context/booking/booking-context";

const useBooking = () => {
  const {
    selectedDate,
    setSelectedDate,
    selectedHour,
    setSelectedHour,
    openNewBookingModal,
    procedures,
    setProcedures,
    availableHours,
    setAvailableHours,
    eventModal,
    closeEventModal,
  } = useContext(BookingContext);

  return {
    selectedDate,
    setSelectedDate,
    selectedHour,
    setSelectedHour,
    openNewBookingModal,
    procedures,
    setProcedures,
    availableHours,
    setAvailableHours,
    eventModal,
    closeEventModal,
  };
};

export default useBooking;
