import { useEffect, useState } from "react";
import Header from "./header-calendar/Header";
import BOOKING_VIEW_TYPE from "../constants/booking-view";
import DaysWeek from "./header-calendar/DaysOfWeek";
import CalendarView from "./CalendarView";
import BookingContextProvider from "../context/booking/BookingContextProvider";
import useGlobal from "../hooks/useGlobal";

export interface DateInfo {
  month: number;
  fullYear: number;
  monthMessage: string;
}

export const ViewTypes = () => {
  const {
    daysOfWeek,
    bookingType,
    bookings,
    handleOnGetBookings,
    bookingResponse,
    setBookingResponse,
  } = useGlobal();

  const [dateInfo, setDateInfo] = useState<DateInfo>({
    month: new Date().getMonth(),
    fullYear: new Date().getFullYear(),
    monthMessage: "",
  });

  useEffect(() => {
    handleOnGetBookings();
  }, []);

  useEffect(() => {
    if (bookingResponse !== null) {
      handleOnGetBookings();
      setBookingResponse(null);
    }
  }, [bookingResponse, setBookingResponse, handleOnGetBookings]);

  const bookingTypeRender = () => {
    const dayCss = BOOKING_VIEW_TYPE[0] ? "pl-4 pr-4" : "";
    return (
      <table className={`min-w-full w-full bg-white no-border-sides ${dayCss}`}>
        <thead className="text-black sticky top-0 z-[50] bg-white">
          <tr>
            <th key="hours" className="py-2 px-4"></th>
            <DaysWeek
              setDateInfo={setDateInfo}
              daysOfWeek={daysOfWeek}
              bookingType={bookingType}
            />
          </tr>
        </thead>
        <tbody className="w-full">
          <CalendarView daysOfWeek={daysOfWeek} bookings={bookings} />
        </tbody>
      </table>
    );
  };

  return (
    <BookingContextProvider>
      {/* <AppointmentFilterType /> */}
      <Header
        month={dateInfo.month}
        fullYear={dateInfo.fullYear}
        monthMessage={dateInfo.monthMessage}
        setDateInfo={setDateInfo}
      />
      <div className="relative max-h-[650px] w-full overflow-auto mt-2">
        {bookingTypeRender()}
      </div>
    </BookingContextProvider>
  );
};

export default ViewTypes;
