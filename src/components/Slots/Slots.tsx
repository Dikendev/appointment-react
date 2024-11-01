import { CSSProperties, FC } from "react";
import { BookingsResponse } from "../../@types/booking";
import { DateUtils } from "../../utils/date-utils";
import EmptyCard from "./EmptyCard";
import CardPosition from "./CardPosition";

interface SlotsProps {
  dayHour: {
    day: string;
    hour: string;
  };
  bookings: BookingsResponse;
  lunchTimeBlock: {
    startAt: string;
    finishAt: string;
  };
  openModal: (day: Date, hour: string) => void;
}

const Slots: FC<SlotsProps> = ({
  dayHour,
  bookings,
  openModal,
  lunchTimeBlock: { startAt, finishAt },
}) => {
  const handleTimeClicked = (timeType: "half" | "full") => {
    if (isTimeLunch(dayHour.hour)) {
      return;
    }

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

  let disabledCss = "";

  const isTimeLunch = (hour: string) => {
    if (hour === startAt || hour === finishAt) {
      disabledCss = "bg-gray-200 border-none cursor-not-allowed";
      return true;
    }
    return false;
  };

  const findEvent = (day: string, hour: string) => {
    if (bookings.length === 0) {
      return (
        <EmptyCard
          dayHour={dayHour}
          lunchTimeBlock={{ startAt, finishAt }}
          handleTimeClicked={handleTimeClicked}
          disabledCss={disabledCss}
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
          dayHour={dayHour}
          lunchTimeBlock={{ startAt, finishAt }}
          handleTimeClicked={handleTimeClicked}
          disabledCss={disabledCss}
        />
      );
    }

    const dayEvents = monthEventsData.days.filter((daysEvent) => {
      return daysEvent.day === actualDay;
    });

    if (!dayEvents.length) {
      return (
        <EmptyCard
          dayHour={dayHour}
          lunchTimeBlock={{ startAt, finishAt }}
          handleTimeClicked={handleTimeClicked}
          disabledCss={disabledCss}
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
          dayHour={dayHour}
          lunchTimeBlock={{ startAt, finishAt }}
          handleTimeClicked={handleTimeClicked}
          disabledCss={disabledCss}
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

    return (
      <CardPosition
        heightStyle={heightStyle}
        booking={bookingData[0]}
        day={day}
        hour={hour}
        hoursTime={bookingData[0].startAt}
        handleTimeClicked={handleTimeClicked}
      />
    );
  };

  return (
    <td
      key={`${dayHour.day}-${dayHour.hour}-slot`}
      className="bg-white border border-gray-300 w-[30rem]"
    >
      {findEvent(dayHour.day, dayHour.hour)}
    </td>
  );
};

export default Slots;
