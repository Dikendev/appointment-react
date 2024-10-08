import { useContext } from "react";
import BookingContext from "../context/booking-context";

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
  };
};

export default useBooking;
