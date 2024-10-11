import { useContext, useState } from "react";
import Header from "./header-calendar/Header";
import BOOKING_VIEW_TYPE from "../constants/booking-view";
import DaysWeek from "./header-calendar/DaysOfWeek";
import GlobalContext from "../context/global/global-context";
import EventContextProvider from "../context/BookingContextProvider";
import CalendarView from "./CalendarView";

export interface DateInfo {
  month: number;
  fullYear: number;
  monthMessage: string;
}

export const ViewTypes = () => {
  const { daysOfWeek, bookingModal, bookingType } = useContext(GlobalContext);

  const [dateInfo, setDateInfo] = useState<DateInfo>({
    month: new Date().getMonth(),
    fullYear: new Date().getFullYear(),
    monthMessage: "",
  });

  return (
    <EventContextProvider>
      {/* <AppointmentFilterType /> */}
      <Header
        month={dateInfo.month}
        fullYear={dateInfo.fullYear}
        monthMessage={dateInfo.monthMessage}
        setDateInfo={setDateInfo}
      />
      <div className="relative max-h-[600px] overflow-auto mt-2">
        {bookingType === BOOKING_VIEW_TYPE[1] && (
          <table className="min-w-full w-full bg-white no-border-sides">
            <thead className="text-black sticky top-0 z-10 bg-white">
              <tr>
                <th key="hours" className="py-2 px-4"></th>
                <DaysWeek setDateInfo={setDateInfo} daysOfWeek={daysOfWeek} />
              </tr>
            </thead>
            <tbody>
              <CalendarView daysOfWeek={daysOfWeek} />
            </tbody>
          </table>
        )}
        {bookingType === BOOKING_VIEW_TYPE[0] && (
          <table className="min-w-full w-full bg-white no-border-sides pl-4 pr-4">
            <thead className="text-black sticky top-0 z-10 bg-white">
              <tr>
                <th key="hours" className="py-2 px-4"></th>
                <DaysWeek setDateInfo={setDateInfo} daysOfWeek={daysOfWeek} />
              </tr>
            </thead>
            <tbody>
              <CalendarView daysOfWeek={daysOfWeek} />
            </tbody>
          </table>
        )}
      </div>
    </EventContextProvider>
  );
};

export default ViewTypes;
