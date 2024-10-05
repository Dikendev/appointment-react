import { useContext, useState } from "react";
import FormAddNewEvent from "../pages/forms/FormAddNewEvent";
import Header from "./header-calendar/Header";
import BOOKING_VIEW_TYPE from "../constants/booking-view";
import DaysWeek from "./header-calendar/DaysOfWeek";
import AppointmentFilterType from "./AppointmentFilterType";
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
      {bookingType === BOOKING_VIEW_TYPE[1] && (
        <table className="min-w-full w-full bg-white mt-2">
          <thead className="text-black">
            <tr>
              <th key="hours" className="py-2 px-4"></th>
              <DaysWeek setDateInfo={setDateInfo} daysOfWeek={daysOfWeek} />
            </tr>
          </thead>
          <CalendarView daysOfWeek={daysOfWeek} />
        </table>
      )}
      {bookingType === BOOKING_VIEW_TYPE[0] && (
        <table className="min-w-full w-full bg-white mt-2">
          <thead className="text-black">
            <tr>
              <th key="hours" className="py-2 px-4"></th>
              <DaysWeek setDateInfo={setDateInfo} daysOfWeek={daysOfWeek} />
            </tr>
          </thead>
          <CalendarView daysOfWeek={daysOfWeek} />
        </table>
      )}
      {bookingModal && (
        <div className="absolute inset-0 flex justify-start items-start h-screen pt-4 pr-1">
          {/* <FormAddNewEvent /> */}
        </div>
      )}
    </EventContextProvider>
  );
};

export default ViewTypes;
