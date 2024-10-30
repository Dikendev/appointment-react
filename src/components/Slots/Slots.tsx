import { CSSProperties, FC } from "react";
import { Booking, BookingsResponse } from "../../@types/booking";
import { DateUtils } from "../../utils/date-utils";
import Card from "./Card";
import EmptyCard from "./EmptyCard";

interface SlotsProps {
  dayHour: {
    day: string;
    hour: string;
  };
  bookings: BookingsResponse;
  openModal: (day: Date, hour: string) => void;
}

const Slots: FC<SlotsProps> = ({ dayHour, bookings, openModal }) => {
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
    const timeWithAddedMinutes = DateUtils.addMinuteToHour(hour, 30);

    if (bookings.length === 0) {
      return (
        <EmptyCard
          calendar={{ day, hour }}
          timeWithAddedMinutes={timeWithAddedMinutes}
          handleTimeClicked={handleTimeClicked}
        />
      );
    }

    const actualDay = new Date(day).getDate();
    const actualMonthIndex = new Date(day).getMonth() + 1;
    const monthEventsData = bookings[0].months.find(
      (month) => month.month === actualMonthIndex
    );

    if (!monthEventsData) {
      return (
        <EmptyCard
          calendar={{ day, hour }}
          timeWithAddedMinutes={timeWithAddedMinutes}
          handleTimeClicked={handleTimeClicked}
        />
      );
    }

    const dayEvents = monthEventsData.days.filter((daysEvent) => {
      return daysEvent.day === actualDay;
    });

    if (!dayEvents.length) {
      return (
        <EmptyCard
          calendar={{ day, hour }}
          timeWithAddedMinutes={timeWithAddedMinutes}
          handleTimeClicked={handleTimeClicked}
        />
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
        <EmptyCard
          calendar={{ day, hour }}
          timeWithAddedMinutes={timeWithAddedMinutes}
          handleTimeClicked={handleTimeClicked}
        />
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

  const handlePosition = (
    heightStyle: CSSProperties,
    booking: Booking,
    day: string,
    hour: string,
    hoursTime: Date
  ) => {
    const timeString = DateUtils.dateAndHour(booking.startAt);
    const isBlockTime = timeString.split(":")[1] === "30";
    const timeWithAddedMinutes = DateUtils.addMinuteToHour(timeString, 30);

    if (isBlockTime) {
      return (
        <>
          <div
            key={`${day}-${hour}-empty`}
            className="w-full h-[3rem] relative border-b border-gray-200"
            onClick={() => handleTimeClicked("full")}
          >
            <div className="w-[8rem]"></div>
          </div>

          <div
            key={`${day}-${timeWithAddedMinutes}-empty`}
            className="w-full h-[3rem] relative"
          >
            <Card
              heightStyle={heightStyle}
              booking={booking}
              day={day}
              hour={hour}
              hoursTime={hoursTime}
            />
          </div>
        </>
      );
    } else {
      return (
        <>
          <div
            key={`${day}-${hour}-empty`}
            className="w-full h-[3rem] relative border-b border-gray-200"
          >
            <Card
              heightStyle={heightStyle}
              booking={booking}
              day={day}
              hour={hour}
              hoursTime={hoursTime}
            />
          </div>

          <div
            key={`${day}-${timeWithAddedMinutes}-empty`}
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

export default Slots;
