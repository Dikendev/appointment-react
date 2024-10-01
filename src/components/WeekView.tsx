import { useContext } from "react";
import HoursView from "./HoursView";
import FormAddNewEvent from "../pages/forms/FormAddNewEvent";
import EventContextProvider from "./context/BookingContextProvider";
import Header from "./header/Header";
import { DateUtils } from "../pages/week-days";
import GlobalContext from "./context/global/global-context";

export const WeekView = () => {
  const { daysOfWeek, bookingModal } = useContext(GlobalContext);

  const handleClickDay = () => {
    console.log("clicking day");
  };

  const ifIsToday = (day: Date): boolean => {
    return new Date(day).toDateString() === new Date().toDateString();
  };

  const daysWeek = () => {
    const trs: JSX.Element[] = [];
    daysOfWeek.forEach((day, dayOfWeek) =>
      trs.push(
        <th key={dayOfWeek} className="py-2 px-4 ">
          <div className="flex flex-col gap-[3px] text-gray-500">
            <span>{dayOfWeek}</span>
            <div className="w-full">
              <span
                className={`${
                  ifIsToday(day)
                    ? "bg-purple-500 text-white rounded-full p-2"
                    : "hover:cursor-pointer hover:bg-gray-100 hover:border hover:border-gray-300 p-2 border-none rounded-full"
                }`}
                onClick={() => handleClickDay()}
              >
                {DateUtils.formatDate(day.toDateString())}
              </span>
            </div>
          </div>
        </th>
      )
    );
    return trs;
  };

  return (
    <EventContextProvider>
      <Header />
      <table className="min-w-full bg-white mt-2">
        <thead className="text-black">
          <tr>
            <th key="hours" className="py-2 px-4"></th>
            {daysWeek()}
          </tr>
        </thead>
        <HoursView daysOfWeek={daysOfWeek} />
      </table>
      {bookingModal && (
        <div className="absolute inset-0 flex  justify-start items-start h-screen pt-4 pr-1">
          <FormAddNewEvent />
        </div>
      )}
    </EventContextProvider>
  );
};

export default WeekView;
