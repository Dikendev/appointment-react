import { FC, useCallback, useContext, useMemo } from "react";
import GlobalContext from "../context/global-context";
import { WeekViewProps } from "../@types/week-view-props";
import { Event } from "../@types/event";
import EventContext from "./context/event-context";

const HoursView: FC<WeekViewProps> = (props) => {
  const { daysOfWeek } = props;
  const { hours, events } = useContext(GlobalContext);

  const { openNewEventModal } = useContext(EventContext);

  const findForExistingEvent = useCallback(
    (events: Event[], day: string, hour: string): Event | undefined => {
      console.log(" executing events");
      const existStartHour = (event: Event, startHour: string) =>
        startHour >= event.startHour;
      const existEndHour = (event: Event, endHour: string) =>
        endHour <= event.endHour;

      return events.find(
        (event) =>
          event.day === day &&
          existStartHour(event, hour) &&
          existEndHour(event, hour)
      );
    },
    []
  );

  const findEvent = useCallback(
    (events: Event[], day: string, hour: string) => {
      return events.find(
        (event) => event.day === day && event.startHour === hour
      );
    },
    []
  );

  const daysWeekArray: string[] = useMemo(() => {
    const daysWeekArray: string[] = [];
    daysOfWeek.forEach((value, key) => {
      daysWeekArray.push(`${key} : ${value}`);
    });

    return daysWeekArray;
  }, [daysOfWeek]);

  const memoizedEvents = useMemo(() => {
    return daysWeekArray.reduce((acc, day) => {
      acc[day] = hours.reduce((hourAcc, hour) => {
        hourAcc[hour] = {
          existingEvent: findForExistingEvent(events, day, hour),
          event: findEvent(events, day, hour),
        };
        return hourAcc;
      }, {} as Record<string, { existingEvent: Event | undefined; event: Event | undefined }>);
      return acc;
    }, {} as Record<string, Record<string, { existingEvent: Event | undefined; event: Event | undefined }>>);
  }, [findEvent, findForExistingEvent, hours, events, daysWeekArray]);

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
    <tbody className="table_new">
      {hours.map((hour) => (
        <tr key={`${hour}`} className="even:bg-gray-100">
          <td
            key={`${hour}-${new Date().getTime()}`}
            className="bg-gray-200 border border-gray-300 py-2 px-4 text-center"
          >
            {hour}
          </td>
          {daysWeekArray.map((day) => {
            const { existingEvent, event } = memoizedEvents[day][hour];

            if (existingEvent && event) {
              return (
                <td
                  className="border border-gray-300 text-center align-middle"
                  key={`${day}-${hour}-${
                    new Date().getTime() + Math.random()
                  }-${event.user.name}`}
                  style={{ backgroundColor: event.color }}
                  rowSpan={calculateRowSpan(
                    hours,
                    event.startHour,
                    event.endHour
                  )}
                >
                  <div>
                    {event.user.name}
                    <br />
                    {`${event.startHour} - ${event.endHour}`}
                  </div>
                </td>
              );
            } else if (!existingEvent) {
              return (
                <td
                  key={`${day}-${hour}-${new Date().getTime()}-empty`}
                  className="bg-white border border-gray-300 w-[30rem]"
                  rowSpan={1}
                  onClick={() => openNewEventModal(day, hour)}
                >
                  {""}
                </td>
              );
            } else {
              return null;
            }
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default HoursView;
