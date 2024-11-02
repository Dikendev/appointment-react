import { CSSProperties } from "react";
import { Booking } from "../../@types/booking";
import { DateUtils } from "../../utils/date-utils";
import Card from "./Card";

interface CardPositionProps {
  booking: Booking;
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
  const timeString = DateUtils.dateAndHour(booking.startAt);
  const isBlockTime = timeString.split(":")[1] === "30";

  if (isBlockTime) {
    return (
      <>
        <div
          ref={full.ref}
          style={full.style}
          key={full.key}
          className="w-full h-[3rem] relative border-b border-gray-200"
          onClick={() => handleTimeClicked("full")}
        >
          <div className="w-[8rem]"></div>
        </div>

        <div
          ref={half.ref}
          style={half.style}
          key={half.key}
          className="w-full h-[3rem] relative"
        >
          <Card booking={booking} day={day} hour={hour} />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          ref={full.ref}
          style={full.style}
          key={full.key}
          className="w-full h-[3rem] relative border-b border-gray-200"
        >
          <Card booking={booking} day={day} hour={hour} />
        </div>
        <div
          ref={half.ref}
          style={half.style}
          key={half.key}
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
