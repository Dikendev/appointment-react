import { FC, useMemo, useRef, useState } from "react";
import { DateUtils } from "../../utils/date-utils";
import { Booking } from "../../@types/booking";
import BookingOptions, { Side } from "../booking-options/BookingOptions";
import useGlobal from "../../hooks/useGlobal";

interface BookingCardProps {
  booking: Booking;
  hoursTime: Date;
  dateDataStrings: {
    day: string;
    hour: string;
  };
}

const BookingCard: FC<BookingCardProps> = ({
  booking,
  hoursTime,
  dateDataStrings,
}) => {
  const { bookingType, hours } = useGlobal();
  const [isEditingOpen, setIsEditingOpen] = useState<boolean>(false);

  const sideOption = useRef<Side>("left");

  const styleTest = (booking: Booking, day: Date, hoursTime: Date) => {
    const today = new Date();
    const normalizedBookingDate = DateUtils.dateAndHour(
      new Date(booking.finishAt)
    );

    if (isToday(day, today) && normalizedBookingDate <= "11:30") {
      return {
        backgroundColor: "#000000c0",
      };
    } else {
      return { backgroundColor: "#000456c0" };
    }
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

  const openEditingModal = (dateDataStrings: { day: string; hour: string }) => {
    const weekDay = dateDataStrings.day.split(":")[0].trim();

    if (bookingType === "DAY") {
      sideOption.current = "top";
    } else {
      switch (weekDay) {
        case "Mon":
        case "Sun":
          sideOption.current = "right";
          break;
        default:
          sideOption.current = "left";
          break;
      }
    }
    setIsEditingOpen(true);
  };

  const handleStyleCardContent = useMemo(() => {
    if (bookingType === "DAY") {
      return "flex flex-col justify-start items-start p-4";
    } else {
      return "flex flex-col";
    }
  }, [bookingType]);

  return (
    <div
      className="cursor-pointer relative w-full h-full"
      key={`${dateDataStrings.day}-${dateDataStrings.hour}-${booking.client.name}`}
      style={styleTest(
        booking,
        new Date(dateDataStrings.day.split(":")[1]),
        hoursTime
      )}
      onClick={() => openEditingModal(dateDataStrings)}
    >
      <div className={`${handleStyleCardContent} text-white`}>
        <span>{booking.client.name}</span>
        <span>{booking.procedure.name}</span>
        <span>
          {`${DateUtils.dateAndHour(booking.startAt)} - ${DateUtils.dateAndHour(
            booking.finishAt
          )}`}
        </span>
        <span className="flex flex-row items-center justify-center"></span>
      </div>
      {isEditingOpen ? (
        <BookingOptions
          booking={booking}
          onOpenChange={setIsEditingOpen}
          side={sideOption.current}
        />
      ) : (
        <span>
          <br />
        </span>
      )}
    </div>
  );
};

export default BookingCard;
