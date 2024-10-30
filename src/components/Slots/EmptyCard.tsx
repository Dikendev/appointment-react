import { useDroppable } from "@dnd-kit/core";

interface EmptyCardProps {
  calendar: {
    day: string;
    hour: string;
  };
  timeWithAddedMinutes: string;
  handleTimeClicked: (timeType: "half" | "full") => void;
}
const EmptyCard = ({
  calendar: { day, hour },
  timeWithAddedMinutes,
  handleTimeClicked,
}: EmptyCardProps) => {
  const newDateKey = (date: string, hour: string) => {
    const newDate = new Date(date);
    newDate.setHours(Number(hour.split(":")[0]));
    newDate.setMinutes(Number(hour.split(":")[1]));
    return newDate.toISOString();
  };

  const { isOver, setNodeRef } = useDroppable({
    id: `${newDateKey(day, hour)}`,
  });
  const style = {
    backgroundColor: isOver ? "green" : "",
  };

  const { isOver: isOverHalf, setNodeRef: setNodeRefHalf } = useDroppable({
    id: `${newDateKey(day, timeWithAddedMinutes)}`,
  });
  const styleHalf = {
    backgroundColor: isOverHalf ? "green" : "",
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        key={newDateKey(day, hour)}
        className="w-full h-[3rem] relative border-b border-gray-200"
        onClick={() => handleTimeClicked("full")}
      >
        <div className="w-[8rem]"></div>
      </div>

      <div
        ref={setNodeRefHalf}
        style={styleHalf}
        key={newDateKey(day, timeWithAddedMinutes)}
        className="w-full h-[3rem] relative"
        onClick={() => handleTimeClicked("half")}
      >
        <div className="w-[8rem]"></div>
      </div>
    </>
  );
};

export default EmptyCard;
