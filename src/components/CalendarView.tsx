import { FC, useCallback, useContext, useMemo, useState } from "react";
import { WeekViewProps } from "../@types/week-view-props";
import { Booking, Bookings } from "../@types/booking";
import { DateUtils } from "../utils/date-utils";
import BookingContext from "../context/booking-context";
import GlobalContext from "../context/global/global-context";
import FormAddNewEvent from "../pages/forms/FormAddNewEvent";
import BookingCard from "./booking-card/BookingCard";
import EmptyCard from "./empty-card/EmptyCard";

const CalendarView: FC<WeekViewProps> = (props) => {
  const { daysOfWeek } = props;
  const { hours, bookings } = useContext(GlobalContext);
  const { openNewBookingModal } = useContext(BookingContext);
  const [modal, setModal] = useState<boolean>(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const findForExistingEvent = useCallback(
    (booking: Bookings, date: Date, hour: string): Booking | undefined => {
      const existStartHour = (booking: Booking, startHour: string) =>
        startHour >= DateUtils.dateAndHour(booking.startAt);
      const existEndHour = (booking: Booking, endHour: string) =>
        endHour <= DateUtils.dateAndHour(booking.finishAt);

      return booking.find((booking) => {
        const month = booking.startAt.getMonth() + 1;
        const year = booking.startAt.getFullYear();
        const day = booking.startAt.getDate();

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
        const month = booking.startAt.getMonth() + 1;
        const year = booking.startAt.getFullYear();
        const day = booking.startAt.getDate();

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
  }, [findEvent, findForExistingEvent, hours, bookings, daysWeekArray]);

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
      <tbody key={`t-body`}>
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
                    key={`${hour}-${booking.client.id}-booking-parent`}
                    client={booking.client}
                    procedure={booking.procedure}
                    booking={booking}
                    startAt={booking.startAt}
                    finishAt={booking.finishAt}
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
                    openModal={openModal}
                  />
                );
              } else {
                return null;
              }
            })}
          </tr>
        ))}
      </tbody>
    );
  }, [hours, comparingWithTodaysHour, daysWeekArray, memoizedEvents]);

  return (
    <>
      {modal && <FormAddNewEvent closeModals={closeModal} />}
      {TbodyContent}
    </>
  );
};

export default CalendarView;
