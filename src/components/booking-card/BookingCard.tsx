import { FC, useContext, useMemo, useRef, useState } from "react";
import { DateUtils } from "../../utils/date-utils";
import { Booking } from "../../@types/booking";
import { Times } from "../../pages/hours";
import BookingOptions, { Side } from "../booking-options/BookingOptions";
import GlobalContext from "../../context/global/global-context";

interface BookingCardProps {
  client: { name: string };
  procedure: { name: string; price: number };
  booking: Booking;
  startAt: Date;
  finishAt: Date;
  hoursTime: Date;
  hours: Times;
  dateDataStrings: {
    day: string;
    hour: string;
  };
}

const BookingCard: FC<BookingCardProps> = ({
  client,
  startAt,
  finishAt,
  procedure,
  booking,
  dateDataStrings,
  hoursTime,
  hours,
}) => {
  const { bookingType } = useContext(GlobalContext);
  const [isEditingOpen, setIsEditingOpen] = useState<boolean>(false);

  const sideOption = useRef<Side>("left");

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
    <>
      <td
        className="cursor-pointer relative"
        key={`${dateDataStrings.day}-${dateDataStrings.hour}-${booking.client.name}`}
        style={styleTest(
          booking,
          new Date(dateDataStrings.day.split(":")[1]),
          hoursTime
        )}
        rowSpan={calculateRowSpan(
          hours.formatted,
          DateUtils.dateAndHour(startAt),
          DateUtils.dateAndHour(finishAt)
        )}
        onClick={() => openEditingModal(dateDataStrings)}
      >
        <div className={`${handleStyleCardContent} text-white`}>
          <span>{client.name}</span>
          <span>{procedure.name}</span>
          <span>{procedure.price} reais</span>
          <span>
            {`${DateUtils.dateAndHour(startAt)} - ${DateUtils.dateAndHour(
              finishAt
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
            {" "}
            <br />
          </span>
        )}
      </td>
    </>
  );
};

export default BookingCard;
