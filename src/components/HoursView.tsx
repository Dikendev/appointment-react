import { FC, useContext } from "react";
import RenderDaysCell from "./DaysCell";
import RenderEmptyCell from "./EmptyCell";
import GlobalContext from "../context/global-context";
import { WeekViewProps } from "../@types/week-view-props";

const HoursView: FC<WeekViewProps> = (props) => {
  const { daysOfWeek } = props;
  const { hours, events } = useContext(GlobalContext);

  return (
    <tbody className="table_new">
      {hours.map((hour) => (
        <tr key={hour} className="even:bg-gray-100">
          <td className="bg-gray-200 border border-gray-300 py-2 px-4 text-center">
            {hour}
          </td>
          {daysOfWeek.map((day) => {
            const existingEvent = events.find(
              (event) =>
                event.day === day &&
                hour >= event.startHour &&
                hour <= event.endHour
            );

            const event = events.find(
              (event) => event.day === day && event.startHour === hour
            );

            if (existingEvent && event) {
              return <RenderDaysCell hours={hours} event={event} day={day} />;
            } else if (!existingEvent) {
              return <RenderEmptyCell />;
            }
            return null;
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default HoursView;
