import { useCallback, useMemo, lazy, Suspense } from "react";
import { DateUtils, WeekDaysList } from "../utils/date-utils";
import useBooking from "../hooks/useBooking";
import useGlobal from "../hooks/useGlobal";
import { TableRow } from "./ui/Table";
import { Booking, BookingDto, BookingsResponse } from "../@types/booking";
import Slots from "./slots/Slots";
import { DndContext } from "@dnd-kit/core";
import { patchBooking } from "../services/api-booking";

const LazyNewEventForm = lazy(() => import("../pages/forms/NewEventForm"));

interface CalendarViewProps {
  daysOfWeek: WeekDaysList;
  bookings: BookingsResponse;
}

const CalendarView = ({ daysOfWeek, bookings }: CalendarViewProps) => {
  const { hours, handleOnGetBookings } = useGlobal();
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

  function handleDragEnd(event) {
    const { over, active } = event;

    if (over && active) {
      handleOnDrop(active.data.current.booking, over.id);
    }
  }

  const updateBooking = async (id: string, body: Partial<BookingDto>) => {
    await patchBooking(id, body);
    handleOnGetBookings();
  };

  const getTimeDiff = (startTime: Date, endTime: Date) => {
    const diffInMs = Number(new Date(endTime)) - Number(new Date(startTime));
    const diffInMinutes = Math.floor(diffInMs / 1000 / 60);

    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;
    return `${hours}:${minutes.toString().padStart(2, "0")}`;
  };

  const newFinishAt = (newStartAt: string, timeString: string) => {
    const newDay = new Date(newStartAt);

    const splitTimeString = timeString.split(":");
    const hour = Number(splitTimeString[0]);
    const minutes = Number(splitTimeString[1]);

    newDay.setHours(newDay.getHours() + hour);
    newDay.setMinutes(newDay.getMinutes() + minutes);
    return newDay;
  };

  const handleOnDrop = (booking: Booking, targetDayString: string) => {
    const timeDiff = getTimeDiff(booking.startAt, booking.finishAt);
    const newStartAt = new Date(targetDayString);
    const newFinishDate = newFinishAt(targetDayString, timeDiff);

    updateBooking(booking.id, {
      startAt: newStartAt,
      finishAt: newFinishDate,
    });
  };

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
      <DndContext onDragEnd={handleDragEnd}>{TbodyContent}</DndContext>
    </>
  );
};

export default CalendarView;
