import { CSSProperties, FC, useRef } from "react";
import { BookingsResponse } from "../../@types/booking";
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
      return null;
    }

    console.log("bookings", bookings);

    const actualDay = new Date(day).getDate();

    const actualMonthIndex = new Date(day).getMonth() + 1;

    const monthEventsData = bookings[0].months.filter(
      (month) => month.month === actualMonthIndex
    );

    if (monthEventsData.length === 0) {
      return null;
    }

    const dayEvents = monthEventsData.filter((monthEvents) => {
      return monthEvents.days.find((daysEvent) => {
        // console.log("actualDay", actualDay);
        // console.log("daysEvent.day", daysEvent.day);
        // console.log("END  ");

        return daysEvent.day === actualDay;
      });
    });

    if (dayEvents.length === 0) {
      return null;
    }

    const bookingData = dayEvents[0].days[0].bookings.find((bookingEvent) => {
      const startTime = DateUtils.dateAndHour(bookingEvent.startAt);
      return startTime === hour;
    });

    if (!bookingData) {
      return null;
    }

    // console.log("bookingData", bookingData);

    const timeDiff = DateUtils.timeDiff(
      bookingData.startAt,
      bookingData.finishAt
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

    return (
      <div
        ref={eventRef}
        className="bg-black text-white w-[90%]"
        style={{
          ...heightStyle,
          position: "absolute",
          zIndex: 5,
        }}
      >
        <BookingCard
          booking={bookingData}
          dateDataStrings={{ day, hour }}
          hoursTime={bookingData.startAt}
        />
      </div>
    );
  };

  return (
    <td
      key={`${dayHour.day}-${dayHour.hour}-empty`}
      className="bg-white border border-gray-300 w-[30rem]"
      rowSpan={1}
    >
      <div
        className="w-full h-[3rem] relative"
        onClick={() => handleTimeClicked("full")}
      >
        {findEvent(dayHour.day, dayHour.hour)}
      </div>

      <div
        className="w-full h-[3rem] relative"
        onClick={() => handleTimeClicked("half")}
      >
        <div className="w-[8rem]"></div>
      </div>
    </td>
  );
};

export default EmptyCard;
