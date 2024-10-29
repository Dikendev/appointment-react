import { CSSProperties, FC, useRef } from "react";
import { Booking, BookingsResponse } from "../../@types/booking";
import { DateUtils } from "../../utils/date-utils";
import BookingCard from "../booking-card/BookingCard";

interface EmptyCardProps {
  dayHour: {
    day: string;
    hour: string;
  };
  bookings: BookingsResponse;
  openModal: (day: Date, hour: string) => void;
}

const EmptyCard: FC<EmptyCardProps> = ({ dayHour, bookings, openModal }) => {
  const eventRef = useRef<HTMLDivElement>(null);

  const handleTimeClicked = (timeType: "half" | "full") => {
    switch (timeType) {
      case "full": {
        openModal(new Date(dayHour.day), dayHour.hour);
        break;
      }
      case "half": {
        const hourAndMinutes = dayHour.hour.split(":");
        const addingMinutes = `${hourAndMinutes[0]}:30`;

        openModal(new Date(dayHour.day), `${addingMinutes}`);
        break;
      }
      default: {
        openModal(new Date(dayHour.day), dayHour.hour);
        break;
      }
    }
  };

  const findEvent = (day: string, hour: string) => {
    if (bookings.length === 0) {
      return (
        <>
          <div
            className="w-full h-[3rem] relative"
            onClick={() => handleTimeClicked("full")}
          >
            <div className="w-[8rem]"></div>
          </div>

          <div
            className="w-full h-[3rem] relative"
            onClick={() => handleTimeClicked("half")}
          >
            <div className="w-[8rem]"></div>
          </div>
        </>
      );
    }

    const actualDay = new Date(day).getDate();
    const actualMonthIndex = new Date(day).getMonth() + 1;
    const monthEventsData = bookings[0].months.find(
      (month) => month.month === actualMonthIndex
    );

    if (!monthEventsData) {
      return (
        <>
          <div
            className="w-full h-[3rem] relative"
            onClick={() => handleTimeClicked("full")}
          >
            <div className="w-[8rem]"></div>
          </div>

          <div
            className="w-full h-[3rem] relative"
            onClick={() => handleTimeClicked("half")}
          >
            <div className="w-[8rem]"></div>
          </div>
        </>
      );
    }

    const dayEvents = monthEventsData.days.filter((daysEvent) => {
      return daysEvent.day === actualDay;
    });

    if (!dayEvents.length) {
      return (
        <>
          <div
            className="w-full h-[3rem] relative"
            onClick={() => handleTimeClicked("full")}
          >
            <div className="w-[8rem]"></div>
          </div>

          <div
            className="w-full h-[3rem] relative"
            onClick={() => handleTimeClicked("half")}
          >
            <div className="w-[8rem]"></div>
          </div>
        </>
      );
    }

    const bookingData = dayEvents[0].bookings.filter((bookingEvent) => {
      const startTime = DateUtils.dateAndHour(bookingEvent.startAt);
      const is30min = startTime.split(":")[1] === "30";

      if (is30min) {
        const newActual = `${hour.split(":")[0]}:30`;
        return startTime === newActual;
      } else {
        return startTime === hour;
      }
    });

    if (!bookingData.length) {
      return (
        <>
          <div
            className="w-full h-[3rem] relative"
            onClick={() => handleTimeClicked("full")}
          >
            <div className="w-[8rem]"></div>
          </div>

          <div
            className="w-full h-[3rem] relative"
            onClick={() => handleTimeClicked("half")}
          >
            <div className="w-[8rem]"></div>
          </div>
        </>
      );
    }

    const timeDiff = DateUtils.timeDiff(
      bookingData[0].startAt,
      bookingData[0].finishAt
    );

    let hight = 0;
    const minCount = timeDiff.split(":")[1];

    if (Number(minCount) === 30) {
      hight = hight + 3;
    }

    const hourCount = Number(timeDiff.split(":")[0]);

    if (hourCount >= 1) {
      const hourMultiplier = hourCount * 6;
      hight = hight + hourMultiplier;
    }

    const heightStyle: CSSProperties = {
      height: `${hight}rem`,
    };

    return handlePosition(
      heightStyle,
      bookingData[0],
      day,
      hour,
      bookingData[0].startAt
    );
  };

  const card = (
    heightStyle: CSSProperties,
    booking: Booking,
    day: string,
    hour: string,
    hoursTime: Date
  ) => {
    return (
      <div
        ref={eventRef}
        className="bg-black text-white w-[90%] absolute z-10 border rounded-sm shadow-[5px_5px_8px_2px_rgba(0,0,0,0.3)] overflow-hidden"
        style={{
          ...heightStyle,
        }}
      >
        <BookingCard
          booking={booking}
          dateDataStrings={{ day, hour }}
          hoursTime={hoursTime}
        />
      </div>
    );
  };

  const handlePosition = (
    heightStyle: CSSProperties,
    booking: Booking,
    day: string,
    hour: string,
    hoursTime: Date
  ) => {
    const timeString = DateUtils.dateAndHour(booking.startAt);
    const isBlockTime = timeString.split(":")[1] === "30";

    if (isBlockTime) {
      return (
        <>
          <div
            className="w-full h-[3rem] relative"
            onClick={() => handleTimeClicked("full")}
          >
            <div className="w-[8rem]"></div>
          </div>

          <div className="w-full h-[3rem] relative">
            {card(heightStyle, booking, day, hour, hoursTime)}
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="w-full h-[3rem] relative">
            {card(heightStyle, booking, day, hour, hoursTime)}
          </div>

          <div
            className="w-full h-[3rem] relative"
            onClick={() => handleTimeClicked("half")}
          >
            <div className="w-[8rem]"></div>
          </div>
        </>
      );
    }
  };

  return (
    <td
      key={`${dayHour.day}-${dayHour.hour}-empty`}
      className="bg-white border border-gray-300 w-[30rem]"
      rowSpan={1}
    >
      {findEvent(dayHour.day, dayHour.hour)}
    </td>
  );
};

export default EmptyCard;
