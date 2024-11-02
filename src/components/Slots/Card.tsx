import { CSSProperties } from "react";
import { Booking } from "../../@types/booking";
import BookingCard from "../booking-card/BookingCard";
import { useDraggable, DragOverlay } from "@dnd-kit/core";
import { GripHorizontal } from "lucide-react";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import useBooking from "../../hooks/useBooking";
import { CSS } from "@dnd-kit/utilities";
import { DateUtils } from "../../utils/date-utils";

interface CardProps {
  booking: Booking;
  day: string;
  hour: string;
}

const Card = ({ booking, day, hour }: CardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
    setActivatorNodeRef,
  } = useDraggable({
    id: booking.id,
    data: { booking },
  });

  const { isBookingLoading } = useBooking();

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  const timeDiff = DateUtils.timeDiff(booking.finishAt, booking.startAt);

  console.log("timediff", timeDiff);

  const hight = timeDiff / 10;

  const heightStyle: CSSProperties = {
    height: `${hight}rem`,
  };

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
          <BookingCard booking={booking} dateDataStrings={{ day, hour }} />
        </div>
      ) : (
        <DragOverlay modifiers={[restrictToWindowEdges]} dropAnimation={null}>
          <div
            className=" text-white w-[97%] absolute z-10 border rounded-sm shadow-[5px_5px_8px_2px_rgba(0,0,0,0.3)] overflow-hidden"
            style={{ ...heightStyle }}
          >
            <div className="flex flex-row justify-end w-full h-[2rem] bg-blue-500">
              <div className="flex flex-row justify-center items-center w-12 cursor-move">
                <GripHorizontal />
              </div>
            </div>
            <BookingCard booking={booking} dateDataStrings={{ day, hour }} />
          </div>
        </DragOverlay>
      )}
    </>
  );
};

export default Card;
