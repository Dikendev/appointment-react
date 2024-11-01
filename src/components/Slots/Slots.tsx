import { CSSProperties, FC } from "react";
import { BookingsResponse } from "../../@types/booking";
import { DateUtils } from "../../utils/date-utils";
import EmptyCard from "./EmptyCard";
import { useDroppable } from "@dnd-kit/core";
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

  const newDateKey = (date: string, hour: string) => {
    const newDate = new Date(date);
    newDate.setHours(Number(hour.split(":")[0]));
    newDate.setMinutes(Number(hour.split(":")[1]));
    return newDate.toISOString();
  };

  const timeWithAddedMinutes = DateUtils.addMinuteToHour(dayHour.hour, 30);

  let disabledCss = "";

  const isTimeLunch = (hour: string) => {
    if (hour === startAt || hour === finishAt) {
      disabledCss = "bg-gray-200 border-none cursor-not-allowed";
      return true;
    }
    return false;
  };

  const { isOver, setNodeRef } = useDroppable({
    id: `${newDateKey(dayHour.day, dayHour.hour)}`,
    disabled: isTimeLunch(dayHour.hour),
  });

  const style: CSSProperties = {
    backgroundColor: isOver ? "green" : "",
  };

  const { isOver: isOverHalf, setNodeRef: setNodeRefHalf } = useDroppable({
    id: `${newDateKey(dayHour.day, timeWithAddedMinutes)}`,
    disabled: isTimeLunch(timeWithAddedMinutes),
  });

  const styleHalf: CSSProperties = {
    backgroundColor: isOverHalf ? "green" : "",
  };

  const findEvent = (day: string, hour: string) => {
    if (bookings.length === 0) {
      return (
        <EmptyCard
          full={{
            ref: setNodeRef,
            style: style,
            key: newDateKey(dayHour.day, dayHour.hour),
          }}
          half={{
            ref: setNodeRefHalf,
            style: styleHalf,
            key: newDateKey(dayHour.day, timeWithAddedMinutes),
          }}
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
          full={{
            ref: setNodeRef,
            style: style,
            key: newDateKey(dayHour.day, dayHour.hour),
          }}
          half={{
            ref: setNodeRefHalf,
            style: styleHalf,
            key: newDateKey(dayHour.day, timeWithAddedMinutes),
          }}
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
          full={{
            ref: setNodeRef,
            style: style,
            key: newDateKey(dayHour.day, dayHour.hour),
          }}
          half={{
            ref: setNodeRefHalf,
            style: styleHalf,
            key: newDateKey(dayHour.day, timeWithAddedMinutes),
          }}
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
          full={{
            ref: setNodeRef,
            style: style,
            key: newDateKey(dayHour.day, dayHour.hour),
          }}
          half={{
            ref: setNodeRefHalf,
            style: styleHalf,
            key: newDateKey(dayHour.day, timeWithAddedMinutes),
          }}
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

    const full = {
      key: newDateKey(dayHour.day, dayHour.hour),
      style: style,
      ref: setNodeRef,
    };

    const half = {
      key: newDateKey(dayHour.day, timeWithAddedMinutes),
      style: styleHalf,
      ref: setNodeRefHalf,
    };

    return (
      <CardPosition
        heightStyle={heightStyle}
        day={day}
        hour={hour}
        full={full}
        half={half}
        booking={bookingData[0]}
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
