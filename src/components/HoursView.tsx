import { FC, useCallback, useContext, useMemo } from "react";
import { WeekViewProps } from "../@types/week-view-props";
import EventContext from "./context/booking-context";
import { Booking, Bookings } from "../@types/booking";
import { DateUtils } from "../pages/date-utils";
import GlobalContext from "./context/global/global-context";
import { BookingCard } from "./BookingCard";

const HoursView: FC<WeekViewProps> = (props) => {
  const { daysOfWeek } = props;
  const { hours, bookings } = useContext(GlobalContext);

  const { openNewBookingModal } = useContext(EventContext);

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

  const calculateRowSpan = (
    hours: string[],
    startHour: string,
    endHour: string
  ) => {
    const startIndex = hours.findIndex((hour) => hour === startHour);
    const endIndex = hours.findIndex((hour) => hour === endHour);
    const rowSpan = endIndex - startIndex;
    const added = rowSpan + 1;
    return added;
  };

  const roundMinutes = (minutes: number) => {
    return minutes >= 30 && minutes < 60 ? `30` : `00`;
  };

  const comparingWithTodaysHour = (date: Date) => {
    const today = new Date();
    const nowHour = today.getHours();
    const nowMinutes = roundMinutes(today.getMinutes());

    const nowFullTime = `${nowHour.toString().padStart(2, "0")}:${nowMinutes
      .toString()
      .padStart(2, "0")}`;

    return nowFullTime === DateUtils.dateAndHour(date);
  };

  const isToday = (queryDay: Date, todayDate: Date) => {
    if (
      queryDay.getDate() === todayDate.getDate() &&
      queryDay.getMonth() === todayDate.getMonth() &&
      queryDay.getFullYear() === todayDate.getFullYear()
    ) {
      return true;
    }
    return false;
  };

  // essa funcao vai ser responsavel por estilizar os eventos que ainda não aconteceram e os que já aconteceram
  const styleTest = (booking: Booking, day: Date, hoursTime: Date) => {
    const today = new Date();
    const normalizedBookingDate = DateUtils.dateAndHour(booking.finishAt);

    if (isToday(day, today) && normalizedBookingDate <= "11:30") {
      return {
        backgroundColor: "#000000c0",
      };
    } else {
      return { backgroundColor: `${booking.procedure.color}` };
    }
  };

  // rounded-sm border-blue-950 text-center align-middle transform -translate-x-0.5 -translate-y-0.5 esse o é css para os eventos que ainda não aconteceram

  return (
    <tbody>
      {Array.from(hours.withOriginal.entries()).map(([hour, hoursTime]) => (
        <tr
          key={`${hour}`}
          className={
            comparingWithTodaysHour(hoursTime)
              ? "border-t-purple-600 border-t-[3px]"
              : "even:bg-gray-100 border-solid"
          }
        >
          <td
            key={`${hour}-${new Date().getTime()}`}
            className="bg-gray-200 border border-gray-300 py-2 px-4 text-center"
          >
            {hour}
          </td>
          {daysWeekArray.map((day) => {
            const { existingEvent, booking } = memoizedEvents[day][hour];
            if (existingEvent && booking) {
              return (
                <td
                  key={`${day}-${hour}-${
                    new Date().getTime() + Math.random()
                  }-${booking.client.name}`}
                  style={styleTest(
                    booking,
                    new Date(day.split(":")[1]),
                    hoursTime
                  )}
                  rowSpan={calculateRowSpan(
                    hours.formatted,
                    DateUtils.dateAndHour(booking.startAt),
                    DateUtils.dateAndHour(booking.finishAt)
                  )}
                >
                  <BookingCard
                    client={booking.client}
                    startAt={booking.startAt}
                    finishAt={booking.finishAt}
                    procedure={booking.procedure}
                  />
                </td>
              );
            } else if (!existingEvent) {
              return (
                <td
                  key={`${day}-${hour}-${new Date().getTime()}-empty`}
                  className="bg-white border border-gray-300 w-[30rem]"
                  rowSpan={1}
                  onClick={() =>
                    openNewBookingModal(new Date(day.split(":")[1]), hour)
                  }
                >
                  {""}
                </td>
              );
            } else {
              return null;
            }
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default HoursView;
