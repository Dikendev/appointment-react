import { useCallback, useContext, useMemo, useState } from "react";
import generateTimes from "./hours";
import { ItemOptions } from "../modal/ItemOptions";
import { WeekDays } from "./week-days";
import { AddEvent } from "./AddEvent";
import GlobalContext from "../context/global-context";

const startTime = "08:00";
const endTime = "24:00";
const interval = 30;

export interface User {
  name: string;
  appointmentDescription: string;
  bookingLength?: number;
  startTime?: string;
  hours: {
    startTime: string;
    endTime: string;
  }[];
}

export interface Event {
  day: string;
  startHour: string;
  endHour: string;
  color: string;
  user: User;
}

export const HomePage = () => {
  const [selectedBooking, setSelectedBooking] =
    useState<string>("nada selecionado");
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [rowSpans, setRowSpans] = useState<{ [key: string]: number }>({
    "12:30": 3,
  });
  const [newEventModal, setNewEventModal] = useState<boolean>(true);

  const { events } = useContext(GlobalContext);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleMouseDown = (e: any) => {
    console.log("handleMouseDown", e);
    // setSelectedSlot(index);
  };

  const handleMouseUp = (e: any) => {
    console.log("handleMouseUp", e);

    // setSelectedSlot("");
  };

  const handleOptions = (event: any, data: any) => {
    console.log("handleOptions EXECUTING");
    setIsModalOpen((prev) => !prev);
    newDAta(data);
  };

  const newDAta = useCallback(
    (data) => {
      if (selectedBooking === data.name) {
        console.log("Selected booking is the same, not updating.");
        return;
      }
      console.log("USEMEMO", data);
      setSelectedBooking(data.name);
    },
    [selectedBooking]
  );

  const getTheTr = (event) => {
    console.log("getTheTr", event);

    console.log("getTheTr", event.target.attributes);
  };

  const hours = generateTimes(startTime, endTime, interval);

  const daysOfWeek = useMemo(() => WeekDays.generateWeekDays(), []);

  const calculateRowSpan = (startHour: string, endHour: string) => {
    const startIndex = hours.findIndex((hour) => hour === startHour);
    const endIndex = hours.findIndex((hour) => hour === endHour);
    const rowSpan = endIndex - startIndex;
    const added = rowSpan + 1;
    return added;
  };

  const renderDayCell = (day: string, hour: string, event: Event) => {
    const rowspan = calculateRowSpan(event.startHour, event.endHour);

    return (
      <td
        className="border border-gray-300 text-center align-middle"
        key={day}
        style={{ backgroundColor: event.color }}
        rowSpan={rowspan}
      >
        <div>
          {event.user.name}
          <br />
          {`${event.startHour} - ${event.endHour}`}
        </div>
      </td>
    );
  };

  const renderEmptyCell = () => {
    return (
      <td
        className="bg-white border border-gray-300"
        rowSpan={1}
        onClick={(event) => getTheTr(event)}
        onMouseDown={(event) => handleMouseDown(event)}
        onMouseUp={(event) => handleMouseUp(event)}
      >
        {""}
      </td>
    );
  };

  return (
    <div className="flex flex-col items-center p-4 relative">
      <table className="min-w-full bg-white border border-gray-300 mt-4">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2 px-4">Horas</th>
            {daysOfWeek.map((day) => (
              <th key={day} className="py-2 px-4">
                {day}
              </th>
            ))}
          </tr>
        </thead>
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
                  return renderDayCell(day, hour, event);
                } else if (!existingEvent) {
                  return renderEmptyCell();
                }

                return null;
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {newEventModal && <AddEvent />}

      {isModalOpen && <ItemOptions selectedBooking={selectedBooking} />}
    </div>
  );
};
