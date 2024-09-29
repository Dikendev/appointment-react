import { FC, PropsWithChildren, useContext, useState } from "react";
import EventContext from "./event-context";
import GlobalContext from "../../context/global-context";

const EventContextProvider: FC<PropsWithChildren<object>> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedHour, setSelectedHour] = useState<string>("");
  const { setEventModal } = useContext(GlobalContext);

  const openNewEventModal = (date: Date, hour: string) => {
    setSelectedDate(date);
    setSelectedHour(hour);
    setEventModal(true);
  };

  return (
    <EventContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
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
