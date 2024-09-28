import { FC } from "react";
import { Event } from "../@types/event";

export interface RenderDaysCellProps {
  hours: string[];
  event: Event;
  day: string;
}

export const RenderDaysCell: FC<RenderDaysCellProps> = (props) => {
  const { hours, event, day } = props;

  const calculateRowSpan = (
    hours: string[],
    startHour: string,
    endHour: string
  ) => {
    const startIndex = hours.findIndex((hour) => hour === startHour);
    const endIndex = hours.findIndex((hour) => hour === endHour);
    const rowSpan = endIndex - startIndex;
    const added = rowSpan + 1;
    return added;
  };

  return (
    <td
      className="border border-gray-300 text-center align-middle"
      key={day}
      style={{ backgroundColor: event.color }}
      rowSpan={calculateRowSpan(hours, event.startHour, event.endHour)}
    >
      <div>
        {event.user.name}
        <br />
        {`${event.startHour} - ${event.endHour}`}
      </div>
    </td>
  );
};

export default RenderDaysCell;
