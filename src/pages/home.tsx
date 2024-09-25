import { useCallback, useEffect, useMemo, useState } from "react";
import { createSwapy } from "swapy";
import generateTimes from "./hours";
import { ItemOptions } from "../modal/ItemOptions";
import { WeekDays } from "./week-days";

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

const user1: User = {
  name: "DIEGO",
  appointmentDescription: "Haircut",
  bookingLength: 4,
  startTime: "08:00",
  hours: [
    {
      startTime: "08:00",
      endTime: "09:30",
    },
  ],
};

const user2: User = {
  name: "Jane Doe",
  appointmentDescription: "Nails",
  bookingLength: 3,
  startTime: "13:00",
  hours: [
    {
      startTime: "13:00",
      endTime: "14:00",
    },
  ],
};

const bookingsByHours = [
  { day: "Sun : 22", bookings: [] },
  { day: "Mon : 23", bookings: [] },
  {
    day: "Tue : 24",
    bookings: [
      {
        hour: "08:00",
        user: user1,
      },
      {
        hour: "08:30",
        user: user1,
      },
      {
        hour: "09:00",
        user: user1,
      },
      {
        hour: "09:30",
        user: user1,
      },
      {
        hour: "10:00",
        user: null,
      },
      {
        hour: "10:30",
        user: user2,
      },
      {
        hour: "11:00",
        user: user2,
      },
      {
        hour: "11:30",
        user: null,
      },
      {
        hour: "12:00",
        user: null,
      },
      {
        hour: "12:30",
        user: null,
      },
      {
        hour: "13:00",
        user: null,
      },
      {
        hour: "13:30",
        user: null,
      },
      {
        hour: "14:00",
        user: null,
      },
      {
        hour: "14:30",
        user: null,
      },
      {
        hour: "15:00",
        user: null,
      },
      {
        hour: "15:30",
        user: null,
      },
    ],
  },
  { day: "Wed : 25", bookings: [] },
  { day: "Thu : 26", bookings: [] },
  { day: "Fri : 27", bookings: [] },
  { day: "Sat : 28", bookings: [] },
];

interface Event {
  day: string;
  startHour: string;
  endHour: string;
  color: string;
  user: User;
}

const initialEvents: Event[] = [
  {
    day: "Tue : 24",
    startHour: "08:00",
    endHour: "09:30",
    color: "red",
    user: user1,
  },
  {
    day: "Thu : 26",
    startHour: "13:00",
    endHour: "15:00",
    color: "blue",
    user: user2,
  },
];

export const HomePage = () => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [selectedBooking, setSelectedBooking] = useState("nada selecionado");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [rowSpans, setRowSpans] = useState<{ [key: string]: number }>({
    "12:30": 3,
  });

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

  useEffect(() => {
    const container = document.querySelector(".container");
    const swapy = createSwapy(container, {
      animation: "none",
    });

    return () => {
      swapy.destroy();
    };
  }, []);

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
        key={day}
        className={`slot ${hour}-${day}`}
        data-swapy-slot={`${hour}-${day}`}
        style={{ backgroundColor: event.color }}
        rowSpan={rowspan}
      >
        <div
          className={`item ${hour}-${day}`}
          data-swapy-item={`${hour}-${day}`}
        >
          <div className="handle" data-swapy-handle>
            {event.user.name}
            <br />
            {`${event.startHour} - ${event.endHour}`}
          </div>
        </div>
      </td>
    );
  };

  const renderEmptyCell = () => {
    const randomNumber = new Date().getTime() + Math.random();
    console.log("randomNumber", randomNumber);

    return (
      <td
        rowSpan={1}
        onClick={(event) => getTheTr(event)}
        onMouseDown={(event) => handleMouseDown(event)}
        onMouseUp={(event) => handleMouseUp(event)}
        className={`slot ${randomNumber}`}
        data-swapy-slot={randomNumber}
      >
        <div className={`item ${randomNumber}`} data-swapy-item={randomNumber}>
          <div className="handle" data-swapy-handle></div>
        </div>
      </td>
    );
  };

  return (
    <>
      <table className="container">
        <thead className="table_header">
          <tr>
            <th>Horas</th>
            {daysOfWeek.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody className="table_new">
          {hours.map((hour) => (
            <tr key={hour}>
              <td>{hour}</td>
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
      {isModalOpen && <ItemOptions selectedBooking={selectedBooking} />}
    </>
  );
};
