import { CSSProperties } from "react";
import { Booking } from "../../@types/booking";
import BookingCard from "../booking-card/BookingCard";
import { useDraggable, DragOverlay } from "@dnd-kit/core";
import { GripHorizontal } from "lucide-react";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import useBooking from "../../hooks/useBooking";
import { CSS } from "@dnd-kit/utilities";

interface CardProps {
  heightStyle: CSSProperties;
  booking: Booking;
  day: string;
  hour: string;
  hoursTime: Date;
}

const Card = ({ heightStyle, booking, day, hour, hoursTime }: CardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
    setActivatorNodeRef,
    over,
  } = useDraggable({
    id: booking.id,
    data: { booking },
  });

  const { isBookingLoading } = useBooking();

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
        over,
      }
    : undefined;

  return (
    <>
      {!isDragging ? (
        <div
          ref={setNodeRef}
          className={`bg-black ${
            isBookingLoading ? "hidden" : ""
          } text-white w-[90%] absolute z-10 border rounded-sm shadow-[5px_5px_8px_2px_rgba(0,0,0,0.3)] overflow-hidden`}
          style={{ ...style, ...heightStyle }}
        >
          <div
            ref={setActivatorNodeRef}
            {...listeners}
            {...attributes}
            className="flex flex-row justify-end w-full h-[2rem] bg-blue-500"
          >
            <div className="flex flex-row justify-center items-center w-12 cursor-move">
              <GripHorizontal />
            </div>
          </div>
          <BookingCard
            booking={booking}
            dateDataStrings={{ day, hour }}
            hoursTime={hoursTime}
          />
        </div>
      ) : (
        <DragOverlay
          modifiers={[restrictToWindowEdges]}
          dropAnimation={{
            duration: 3000,
            easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
          }}
        >
          <div
            className=" text-white w-[97%] absolute z-10 border rounded-sm shadow-[5px_5px_8px_2px_rgba(0,0,0,0.3)] overflow-hidden"
            style={{ ...heightStyle }}
          >
            <div className="flex flex-row justify-end w-full h-[2rem] bg-blue-500">
              <div className="flex flex-row justify-center items-center w-12 cursor-move">
                <GripHorizontal />
              </div>
            </div>
            <BookingCard
              booking={booking}
              dateDataStrings={{ day, hour }}
              hoursTime={hoursTime}
            />
          </div>
        </DragOverlay>
      )}
    </>
  );
};

export default Card;
