import { useDroppable } from "@dnd-kit/core";
import { CSSProperties, forwardRef } from "react";
import { DateUtils } from "../../utils/date-utils";

interface EmptyCardProps {
  disabledCss: string;
  dayHour: {
    day: string;
    hour: string;
  };
  lunchTimeBlock: {
    startAt: string;
    finishAt: string;
  };
  handleTimeClicked: (timeType: "half" | "full") => void;
}

const EmptyCard = forwardRef(
  ({
    disabledCss,
    dayHour: { day, hour },
    lunchTimeBlock: { startAt, finishAt },
    handleTimeClicked,
  }: EmptyCardProps) => {
    const newDateKey = (date: string, hour: string) => {
      const newDate = new Date(date);
      newDate.setHours(Number(hour.split(":")[0]));
      newDate.setMinutes(Number(hour.split(":")[1]));
      return newDate.toISOString();
    };

    const timeWithAddedMinutes = DateUtils.addMinuteToHour(hour, 30);

    const isTimeLunch = (hour: string) => {
      if (hour === startAt || hour === finishAt) {
        disabledCss = "bg-gray-200 border-none cursor-not-allowed";
        return true;
      }
      return false;
    };

    const { isOver, setNodeRef } = useDroppable({
      id: `${newDateKey(day, hour)}`,
      disabled: isTimeLunch(hour),
    });

    const style: CSSProperties = {
      backgroundColor: isOver ? "green" : "",
    };

    const { isOver: isOverHalf, setNodeRef: setNodeRefHalf } = useDroppable({
      id: `${newDateKey(day, timeWithAddedMinutes)}`,
      disabled: isTimeLunch(timeWithAddedMinutes),
    });

    const styleHalf: CSSProperties = {
      backgroundColor: isOverHalf ? "green" : "",
    };

    return (
      <>
        <div
          ref={setNodeRef}
          style={style}
          key={`${newDateKey(day, hour)}`}
          className={`w-full h-[3rem] relative border-b border-gray-200 ${disabledCss}`}
          onClick={() => handleTimeClicked("full")}
        >
          <div className="w-[8rem]"></div>
        </div>

        <div
          ref={setNodeRefHalf}
          style={styleHalf}
          key={`${newDateKey(day, timeWithAddedMinutes)}`}
          className={`w-full h-[3rem] relative ${disabledCss}`}
          onClick={() => handleTimeClicked("half")}
        >
          <div className="w-[8rem]"></div>
        </div>
      </>
    );
  }
);

export default EmptyCard;
