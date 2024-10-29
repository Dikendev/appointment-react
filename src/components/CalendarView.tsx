import { useCallback, useMemo, lazy, Suspense } from "react";
import { WeekViewProps } from "../@types/week-view-props";
import { DateUtils } from "../utils/date-utils";
import EmptyCard from "./empty-card/EmptyCard";
import useBooking from "../hooks/useBooking";
import useGlobal from "../hooks/useGlobal";
import { TableRow } from "./ui/Table";
import { initialEvents } from "../context/global/mock-events";
import { BookingsResponse } from "../@types/booking";

const LazyNewEventForm = lazy(() => import("../pages/forms/NewEventForm"));

const mockEvent: BookingsResponse = [
  {
    year: 2024,
    months: [
      {
        month: 10,
        days: [
          { day: 27, bookings: initialEvents },
          // { day: 22, bookings: initialEvents },
          // { day: 23, bookings: initialEvents },
          // { day: 24, bookings: initialEvents },
          // { day: 25, bookings: initialEvents },
          // { day: 26, bookings: initialEvents },
          // { day: 27, bookings: initialEvents },
          // { day: 28, bookings: initialEvents },
          // { day: 29, bookings: initialEvents },
          // { day: 30, bookings: initialEvents },
          // { day: 31, bookings: initialEvents },
        ],
      },
      { month: 10, days: [] },
    ],
  },
];

const CalendarView = ({ daysOfWeek, bookings }: WeekViewProps) => {
  const { hours } = useGlobal();
  const { eventModal, openNewBookingModal } = useBooking();

  const daysWeekArray: string[] = useMemo(() => {
    const daysWeekArray: string[] = [];
    daysOfWeek.forEach((value, key) => {
      daysWeekArray.push(`${key} : ${value}`);
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
                <EmptyCard
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
        <Suspense fallback={<div>Loading...</div>}>
          <LazyNewEventForm />
        </Suspense>
      )}
      {TbodyContent}
    </>
  );
};

export default CalendarView;
