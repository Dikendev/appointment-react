import { useDrop } from "react-dnd";
import { Booking, BookingDto, BookingsResponse } from "../../@types/booking";

interface EmptyCardProps {
  calendar: {
    day: string;
    hour: string;
  };
  timeWithAddedMinutes: string;
  bookings: BookingsResponse;
  handleTimeClicked: (timeType: "half" | "full") => void;
  patchBooking: (id: string, body: Partial<BookingDto>) => Promise<void>;
}
const EmptyCard = ({
  calendar: { day, hour },
  timeWithAddedMinutes,
  handleTimeClicked,
  bookings,
  patchBooking,
}: EmptyCardProps) => {
  const getTimeDiff = (startTime: Date, endTime: Date) => {
    const diffInMs = Number(new Date(endTime)) - Number(new Date(startTime));
    console.log("diffInMs", diffInMs);

    const diffInMinutes = Math.floor(diffInMs / 1000 / 60);

    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;
    return `${hours}:${minutes.toString().padStart(2, "0")}`;
  };

  const newFinishAt = (newStartAt: string, timeString: string) => {
    const newDay = new Date(day);

    const splitTimeString = timeString.split(":");
    const hour = Number(splitTimeString[0]);
    const minutes = Number(splitTimeString[1]);

    const splitNewStartAt = newStartAt.split(":");

    newDay.setHours(Number(splitNewStartAt[0]) + hour);
    newDay.setMinutes(Number(splitNewStartAt[1]) + minutes);
    return newDay;
  };

  const handleOnDrop = (booking: Booking, isHalf: boolean = false) => {
    const timeDiff = getTimeDiff(booking.startAt, booking.finishAt);

    let newFinishDate: Date;

    const newStartAt = new Date(day);

    if (isHalf) {
      newFinishDate = newFinishAt(timeWithAddedMinutes, timeDiff);
      newStartTime(newStartAt, timeWithAddedMinutes);
    } else {
      newFinishDate = newFinishAt(hour, timeDiff);

      newStartTime(newStartAt, hour);
    }

    patchBooking(booking.id, {
      startAt: newStartAt,
      finishAt: newFinishDate,
    });
  };

  const newStartTime = (newStartAt: Date, hour: string) => {
    newStartAt.setHours(Number(hour.split(":")[0]));
    newStartAt.setMinutes(Number(hour.split(":")[1]));
    return newStartAt;
  };

  const [{ isOverFull, canDropFull }, dropFull] = useDrop(
    () => ({
      accept: "ALL",
      canDrop: () => true,
      drop: (item: { booking: Booking }) => {
        handleOnDrop(item.booking);

        return { moved: true };
      },
      collect: (monitor) => ({
        isOverFull: !!monitor.isOver(),
        canDropFull: !!monitor.canDrop(),
      }),
    }),
    [bookings]
  );

  const [{ isOverHalf, canDropHalf }, dropHalf] = useDrop(
    () => ({
      accept: "ALL",
      canDrop: () => true,
      drop: (item: { booking: Booking }) => {
        handleOnDrop(item.booking, true);
        return { moved: true };
      },
      collect: (monitor) => ({
        isOverHalf: !!monitor.isOver(),
        canDropHalf: !!monitor.canDrop(),
      }),
    }),
    [bookings]
  );

  return (
    <>
      <div
        ref={dropFull}
        key={`${day}-${hour}-empty`}
        className="w-full h-[3rem] relative"
        onClick={() => handleTimeClicked("full")}
      >
        <div className="w-[8rem]"></div>
        {isOverFull && canDropFull && (
          <div
            className="overlay"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              zIndex: 1,
              opacity: 0.5,
              backgroundColor: "green",
            }}
          />
        )}
      </div>

      <div
        ref={dropHalf}
        key={`${day}-${timeWithAddedMinutes}-empty`}
        className="w-full h-[3rem] relative"
        onClick={() => handleTimeClicked("half")}
      >
        <div className="w-[8rem]"></div>
        {isOverHalf && canDropHalf && (
          <div
            className="overlay"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              zIndex: 1,
              opacity: 0.5,
              backgroundColor: "yellow",
            }}
          />
        )}
      </div>
    </>
  );
};

export default EmptyCard;
