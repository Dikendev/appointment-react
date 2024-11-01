import { useContext } from "react";
import BookingContext from "../context/booking/booking-context";

const useBooking = () => {
  const bookingContext = useContext(BookingContext);
  return { ...bookingContext };
};

export default useBooking;
