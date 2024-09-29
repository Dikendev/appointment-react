import { FC, PropsWithChildren, useContext, useState } from "react";
import EventContext from "./event-context";
import GlobalContext from "../../context/global-context";

const EventContextProvider: FC<PropsWithChildren<object>> = ({ children }) => {
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedHour, setSelectedHour] = useState<string>("");
  const { setEventModal } = useContext(GlobalContext);

  const openNewEventModal = (day: string, hour: string) => {
    setSelectedDay(day);
    setSelectedHour(hour);
    setEventModal(true);
  };

  return (
    <EventContext.Provider
      value={{
        selectedDay,
        setSelectedDay,
        selectedHour,
        setSelectedHour,
        openNewEventModal,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventContextProvider;
