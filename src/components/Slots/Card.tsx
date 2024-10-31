import { CSSProperties } from "react";
import { Booking } from "../../@types/booking";
import BookingCard from "../booking-card/BookingCard";
import { useDraggable } from "@dnd-kit/core";
import { GripHorizontal } from "lucide-react";

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
      {...attributes}
    >
      <div className="flex flex-row justify-end w-full h-[2rem] bg-blue-500">
        <div
          className="flex flex-row justify-center items-center w-12 cursor-move"
          {...listeners}
        >
          <GripHorizontal />
        </div>
      </div>
      <BookingCard
        booking={booking}
        dateDataStrings={{ day, hour }}
        hoursTime={hoursTime}
      />
    </div>
  );
};

export default Card;
