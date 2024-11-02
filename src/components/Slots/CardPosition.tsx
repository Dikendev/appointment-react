import { CSSProperties, useMemo } from "react";
import { Booking } from "../../@types/booking";
import { DateUtils } from "../../utils/date-utils";
import Card from "./Card";

interface CardPositionProps {
  booking: Booking[];
  day: string;
  hour: string;
  full: {
    key: string;
    style: CSSProperties;
    ref: (element: HTMLElement | null) => void;
  };
  half: {
    key: string;
    style: CSSProperties;
    ref: (element: HTMLElement | null) => void;
  };
  handleTimeClicked: (timeType: "half" | "full") => void;
}

const CardPosition = ({
  booking,
  day,
  hour,
  full,
  half,
  handleTimeClicked,
}: CardPositionProps) => {
  const findForFullTime = useMemo(() => {
    const fulltimeBookings = booking.find((b) => {
      const timeString = DateUtils.dateAndHour(b.startAt);
      return timeString.split(":")[1] === "00";
    });

    return fulltimeBookings ? (
      <Card booking={fulltimeBookings} day={day} hour={hour} />
    ) : (
      <div className="w-[8rem]"></div>
    );
  }, [booking, day, hour]);

  const findForFullHalfTime = useMemo(() => {
    const bookingHalfTime = booking.find((b) => {
      const timeString = DateUtils.dateAndHour(b.startAt);
      return timeString.split(":")[1] === "30";
    });

    return bookingHalfTime ? (
      <Card booking={bookingHalfTime} day={day} hour={hour} />
    ) : (
      <div className="w-[8rem]"></div>
    );
  }, [booking, day, hour]);

  return (
    <>
      <div
        ref={full.ref}
        style={full.style}
        key={full.key}
        className="w-full h-[3rem] relative border-b border-gray-200"
        onClick={() => handleTimeClicked("full")}
      >
        {findForFullTime}
      </div>
      <div
        ref={half.ref}
        style={half.style}
        key={half.key}
        className="w-full h-[3rem] relative"
        onClick={() => handleTimeClicked("half")}
      >
        {findForFullHalfTime}
      </div>
    </>
  );
};

export default CardPosition;
