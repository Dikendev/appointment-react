import { useCallback, useMemo, lazy, Suspense } from "react";
import { DateUtils, WeekDaysList } from "../utils/date-utils";
import useBooking from "../hooks/useBooking";
import useGlobal from "../hooks/useGlobal";
import { TableRow } from "./ui/Table";
import { BookingsResponse } from "../@types/booking";
import Slots from "./Slots/Slots";

const LazyNewEventForm = lazy(() => import("../pages/forms/NewEventForm"));

interface CalendarViewProps {
  daysOfWeek: WeekDaysList;
  bookings: BookingsResponse;
}

const CalendarView = ({ daysOfWeek, bookings }: CalendarViewProps) => {
  const { hours } = useGlobal();
  const { eventModal, openNewBookingModal } = useBooking();

  const daysWeekArray: string[] = useMemo(() => {
    const daysWeekArray: string[] = [];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    daysOfWeek.forEach((value, _) => {
      daysWeekArray.push(`${value}`);
    });

    return daysWeekArray;
  }, [daysOfWeek]);

  const roundMinutes = (minutes: number) => {
    return minutes >= 30 && minutes < 60 ? `30` : `00`;
  };

  const comparingWithTodaysHour = useCallback((date: Date, hour: string) => {
    const today = new Date();
    const nowHour = today.getHours();
    const nowMinutes = roundMinutes(today.getMinutes());

    const nowFullTime = `${nowHour.toString().padStart(2, "0")}:${nowMinutes
      .toString()
      .padStart(2, "0")}`;

    return nowFullTime === DateUtils.dateAndHour(date);
  }, []);

  const TbodyContent = useMemo(() => {
    return (
      <>
        {Array.from(hours.withOriginal.entries()).map(([hour, hoursTime]) => (
          <TableRow
            key={`${hour}-content`}
            className={
              comparingWithTodaysHour(hoursTime, hour)
                ? "border-t-purple-600 border-t-[3px]"
                : "even:bg-gray-100 border-solid"
            }
          >
            <td
              key={`${hour}-hour`}
              className="bg-gray-200 border border-gray-300 py-2 px-4 text-center  w-3 min-w-2"
            >
              {hour}
            </td>
            {daysWeekArray.map((day) => {
              return (
                <Slots
                  key={`${day}-${hour}-parent`}
                  dayHour={{ day, hour }}
                  bookings={bookings}
                  openModal={openNewBookingModal}
                />
              );
            })}
          </TableRow>
        ))}
      </>
    );
  }, [
    comparingWithTodaysHour,
    daysWeekArray,
    hours,
    openNewBookingModal,
    bookings,
  ]);

  return (
    <>
      {eventModal && (
        <Suspense>
          <LazyNewEventForm />
        </Suspense>
      )}
      {TbodyContent}
    </>
  );
};

export default CalendarView;
