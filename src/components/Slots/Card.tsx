import { CSSProperties } from "react";
import { Booking } from "../../@types/booking";
import BookingCard from "../booking-card/BookingCard";
import { useDraggable } from "@dnd-kit/core";

interface CardProps {
  heightStyle: CSSProperties;
  booking: Booking;
  day: string;
  hour: string;
  hoursTime: Date;
}

const Card = ({ heightStyle, booking, day, hour, hoursTime }: CardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: booking.id,
    data: { booking },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      className="bg-black text-white w-[90%] absolute z-10 border rounded-sm shadow-[5px_5px_8px_2px_rgba(0,0,0,0.3)] overflow-hidden"
      style={{ ...style, ...heightStyle }}
      {...listeners}
      {...attributes}
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
