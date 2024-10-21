import { useCallback, useMemo, lazy, Suspense } from "react";
import { WeekViewProps } from "../@types/week-view-props";
import { Booking, Bookings } from "../@types/booking";
import { DateUtils } from "../utils/date-utils";
import BookingCard from "./booking-card/BookingCard";
import EmptyCard from "./empty-card/EmptyCard";
import useBooking from "../hooks/useBooking";
import useGlobal from "../hooks/useGlobal";

const LazyNewEventForm = lazy(() => import("../pages/forms/NewEventForm"));

const CalendarView = ({ daysOfWeek, bookings }: WeekViewProps) => {
  const { hours } = useGlobal();

  const { eventModal, openNewBookingModal } = useBooking();

  const findForExistingEvent = useCallback(
    (booking: Bookings, date: Date, hour: string): Booking | undefined => {
      const existStartHour = (booking: Booking, startHour: string) =>
        startHour >= DateUtils.dateAndHour(booking.startAt);
      const existEndHour = (booking: Booking, endHour: string) =>
        endHour <= DateUtils.dateAndHour(booking.finishAt);

      return booking.find((booking) => {
        const month = new Date(booking.startAt).getMonth() + 1;
        const year = new Date(booking.startAt).getFullYear();
        const day = new Date(booking.startAt).getDate();

        const bookingDate = `${year}-${month}-${day}`;

        const monthMonth = date.getMonth() + 1;
        const monthYear = date.getFullYear();
        const monthDay = date.getDate();

        const targetDate = `${monthYear}-${monthMonth}-${monthDay}`;

        return (
          bookingDate === targetDate &&
          existStartHour(booking, hour) &&
          existEndHour(booking, hour)
        );
      });
    },
    []
  );

  const findEvent = useCallback(
    (booking: Bookings, date: Date, hour: string): Booking | undefined => {
      return booking.find((booking) => {
        const startAtAsDate = new Date(booking.startAt);

        const month = startAtAsDate.getMonth() + 1;
        const year = startAtAsDate.getFullYear();
        const day = startAtAsDate.getDate();

        const bookingDate = `${year}-${month}-${day}`;

        const actualMonth = date.getMonth() + 1;
        const actualYear = date.getFullYear();
        const actualDay = date.getDate();

        const targetDate = `${actualYear}-${actualMonth}-${actualDay}`;

        return (
          bookingDate === targetDate &&
          DateUtils.dateAndHour(booking.startAt) === hour
        );
      });
    },
    []
  );

  const daysWeekArray: string[] = useMemo(() => {
    const daysWeekArray: string[] = [];
    daysOfWeek.forEach((value, key) => {
      daysWeekArray.push(`${key} : ${value}`);
    });

    return daysWeekArray;
  }, [daysOfWeek]);

  const memoizedEvents = useMemo(() => {
    return daysWeekArray.reduce((acc, day) => {
      acc[day] = hours.formatted.reduce((hourAcc, hour) => {
        const daySplit = new Date(day.split(" : ")[1]);

        hourAcc[hour] = {
          existingEvent: findForExistingEvent(bookings, daySplit, hour),
          booking: findEvent(bookings, daySplit, hour),
        };
        return hourAcc;
      }, {} as Record<string, { existingEvent: Booking | undefined; booking: Booking | undefined }>);
      return acc;
    }, {} as Record<string, Record<string, { existingEvent: Booking | undefined; booking: Booking | undefined }>>);
  }, [
    bookings,
    daysWeekArray,
    findEvent,
    findForExistingEvent,
    hours.formatted,
  ]);

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
          <tr
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
              const { existingEvent, booking } = memoizedEvents[day][hour];
              if (existingEvent && booking) {
                return (
                  <BookingCard
                    key={`${hour}-${day}-${booking.client.id}-booking-parent`}
                    booking={booking}
                    hoursTime={hoursTime}
                    hours={hours}
                    dateDataStrings={{ day, hour }}
                  />
                );
              } else if (!existingEvent) {
                return (
                  <EmptyCard
                    key={`${day}-${hour}-parent`}
                    dayHour={{ day, hour }}
                    openModal={openNewBookingModal}
                  />
                );
              } else {
                return null;
              }
            })}
          </tr>
        ))}
      </>
    );
  }, [
    comparingWithTodaysHour,
    daysWeekArray,
    hours,
    memoizedEvents,
    openNewBookingModal,
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
