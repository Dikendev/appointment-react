import {
  EventHandler,
  ReactEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createSwapy } from "swapy";
import generateTimes from "./hours";
import { ItemOptions } from "../modal/ItemOptions";
import { WeekDays } from "./week-days";

const startTime = "08:00";
const endTime = "24:00";
const interval = 30;

const user1 = {
  name: "DIEGO",
  appointmentDescription: "Haircut",
  bookingLength: 4,
  hours: [
    {
      startTime: "08:00",
      endTime: "09:30",
    },
  ],
};

const user2 = {
  name: "Jane Doe",
  appointmentDescription: "Nails",
  hours: [
    {
      startTime: "13:00",
      endTime: "14:00",
    },
  ],
};

const bookingsByHours = [
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
];

export const HomePage = () => {
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
    console.log("useEffect");
    const container = document.querySelector(".container");
    const swapy = createSwapy(container, {
      animation: "dynamic",
    });
    swapy.onSwap(({ data }) => {
      console.log("onSwap", data);
    });
    return () => {
      swapy.destroy();
    };
  }, []);

  const generateDayHours = generateTimes(startTime, endTime, interval);

  const weekDays = useMemo(() => WeekDays.generateWeekDays(), []);

  const functionTest = (hour: string, weekDays: string[]) => {
    const trs = [];

    for (let i = 0; i <= weekDays.length - 1; i++) {
      const actualDay = weekDays[i];
      const sunday = i == 0;

      const day = bookingsByHours.find((day) => day.day === actualDay);
      console.log("day", day);

      if (day) {
        console.log("day FOUND", day);
        const rowSpanLength = day.bookings[0].
        const randomNumber = Math.floor(Math.random() * 100000);

        if (hour === day.bookings[0].hour) {
          trs.push(
            <td
              rowSpan={4}
              onClick={(event) => getTheTr(event)}
              onMouseDown={(event) => handleMouseDown(event)}
              onMouseUp={(event) => handleMouseUp(event)}
              className={`slot ${randomNumber}`}
              data-swapy-slot={randomNumber}
            >
              <div
                className={`item ${randomNumber}`}
                data-swapy-item={randomNumber}
              >
                <div className="handle" data-swapy-handle>
                  {day.bookings[0].user ? day.bookings[0].user.name : "empty"}
                </div>
              </div>
            </td>
          );
        } else {
          const newRandomNumber = Math.floor(Math.random() * 100000);
          console.log("newRandomNumber", newRandomNumber);
          trs.push(
            <td
              className={`slot ${newRandomNumber} empty`}
              data-swapy-slot={newRandomNumber}
            >
              <div
                className={`item ${newRandomNumber}`}
                data-swapy-item={newRandomNumber}
              >
                <div>=</div>
              </div>
            </td>
          );
        }

        console.log("hour", hour);
      }
    }
    return trs;
  };

  return (
    <>
      <table className="container">
        <thead className="table_header">
          <tr>
            <th>Hora</th>
            {weekDays.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody className="table_new">
          {generateDayHours.map((hour) => (
            <tr key={hour}>
              <td>{hour}</td>
              {functionTest(hour, weekDays)}
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && <ItemOptions selectedBooking={selectedBooking} />}
    </>
  );
};
