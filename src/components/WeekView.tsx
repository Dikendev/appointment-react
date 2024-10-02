import { useContext } from "react";
import HoursView from "./HoursView";
import FormAddNewEvent from "../pages/forms/FormAddNewEvent";
import EventContextProvider from "./context/BookingContextProvider";
import Header from "./header/Header";
import GlobalContext from "./context/global/global-context";
import BOOKING_VIEW_TYPE from "../constants/booking-view";
import DaysWeek from "./header/DaysOfWeek";

export const WeekView = () => {
  const { daysOfWeek, bookingModal, bookingType } = useContext(GlobalContext);

  return (
    <EventContextProvider>
      <Header />
      {bookingType === BOOKING_VIEW_TYPE[1] && (
        <table className="min-w-full w-full bg-white mt-2">
          <thead className="text-black">
            <tr>
              <th key="hours" className="py-2 px-4"></th>
              <DaysWeek daysOfWeek={daysOfWeek} />
            </tr>
          </thead>
          <HoursView daysOfWeek={daysOfWeek} />
        </table>
      )}

      {bookingType === BOOKING_VIEW_TYPE[0] && (
        <table className="min-w-full w-full bg-white mt-2">
          <thead className="text-black">
            <tr>
              <th key="hours" className="py-2 px-4"></th>
              <DaysWeek daysOfWeek={daysOfWeek} />
            </tr>
          </thead>
          <HoursView daysOfWeek={daysOfWeek} />
        </table>
      )}

      {bookingModal && (
        <div className="absolute inset-0 flex justify-start items-start h-screen pt-4 pr-1">
          <FormAddNewEvent />
        </div>
      )}
    </EventContextProvider>
  );
};

export default WeekView;
