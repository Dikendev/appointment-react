import { useState } from "react";
import { user1, user2 } from "./mock-data";
import GlobalContext from "./global-context";
import { Event } from "../pages/home";

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
  {
    day: "Thu : 26",
    startHour: "15:30",
    endHour: "16:00",
    color: "red",
    user: user2,
  },
];

const ContextProvider: React.FC<React.PropsWithChildren<object>> = (props) => {
  const [events, setEvents] = useState(initialEvents);

  return (
    <GlobalContext.Provider
      value={{
        events,
        setEvents: setEvents,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
