import { CSSProperties } from "react";
import { Booking } from "../../@types/booking";
import { useDroppable } from "@dnd-kit/core";
import { DateUtils } from "../../utils/date-utils";
import Card from "./Card";

interface CardPositionProps {
  heightStyle: CSSProperties;
  booking: Booking;
  day: string;
  hour: string;
  hoursTime: Date;
  handleTimeClicked: (timeType: "half" | "full") => void;
}

const CardPosition = ({
  heightStyle,
  booking,
  day,
  hour,
  hoursTime,
  handleTimeClicked,
}: CardPositionProps) => {
  const newDateKey = (date: string, hour: string) => {
    const newDate = new Date(date);
    newDate.setHours(Number(hour.split(":")[0]));
    newDate.setMinutes(Number(hour.split(":")[1]));
    return newDate.toISOString();
  };

  const timeWithAddedMinutes = DateUtils.addMinuteToHour(hour, 30);

  const { isOver, setNodeRef } = useDroppable({
    id: `${newDateKey(day, hour)}`,
  });

  const style: CSSProperties = {
    backgroundColor: isOver ? "green" : "",
  };

  const { isOver: isOverHalf, setNodeRef: setNodeRefHalf } = useDroppable({
    id: `${newDateKey(day, timeWithAddedMinutes)}`,
  });

  const styleHalf: CSSProperties = {
    backgroundColor: isOverHalf ? "green" : "",
  };

  const timeString = DateUtils.dateAndHour(booking.startAt);
  const isBlockTime = timeString.split(":")[1] === "30";

  if (isBlockTime) {
    return (
      <>
        <div
          ref={setNodeRef}
          style={style}
          key={`${newDateKey(day, hour)}`}
          className="w-full h-[3rem] relative border-b border-gray-200"
          onClick={() => handleTimeClicked("full")}
        >
          <div className="w-[8rem]"></div>
        </div>

        <div
          ref={setNodeRefHalf}
          style={styleHalf}
          key={`${newDateKey(day, timeWithAddedMinutes)}`}
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
          ref={setNodeRef}
          style={style}
          key={`${newDateKey(day, hour)}`}
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
          ref={setNodeRefHalf}
          style={styleHalf}
          key={`${newDateKey(day, timeWithAddedMinutes)}`}
          className="w-full h-[3rem] relative"
          onClick={() => handleTimeClicked("half")}
        >
          <div className="w-[8rem]"></div>
        </div>
      </>
    );
  }
};

export default CardPosition;
