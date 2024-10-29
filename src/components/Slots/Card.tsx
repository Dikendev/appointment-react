import { CSSProperties } from "react";
import { Booking } from "../../@types/booking";
import * as dnd from "react-dnd";
import BookingCard from "../booking-card/BookingCard";

interface CardProps {
  heightStyle: CSSProperties;
  booking: Booking;
  day: string;
  hour: string;
  hoursTime: Date;
}

const Card = ({ heightStyle, booking, day, hour, hoursTime }: CardProps) => {
  const [{ isDragging }, drag, preview] = dnd.useDrag(
    () => ({
      type: "ALL",
      item: { booking },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [booking]
  );

  return (
    <div
      ref={drag}
      className="bg-black text-white w-[90%] absolute z-10 border rounded-sm shadow-[5px_5px_8px_2px_rgba(0,0,0,0.3)] overflow-hidden"
      style={{
        ...heightStyle,
        opacity: isDragging ? 0.5 : 1,
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

export default Card;
