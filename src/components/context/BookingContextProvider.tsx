import { FC, PropsWithChildren, useContext, useState } from "react";
import EventContext from "./booking-context";
import { ProcedureModal } from "../../@types/booking";
import GlobalContext from "./global/global-context";

const EventContextProvider: FC<PropsWithChildren<object>> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedHour, setSelectedHour] = useState<string>("");
  const { setBookingModal } = useContext(GlobalContext);

  //essas horas vai vir do backend para o dia que o usuario selecionar, vou buscar os horários disponiveis para aquele dia
  const procedureDefault = [
    {
      id: "0",
      name: "Selecione um procedimento",
      price: 0,
      color: "#000",
    },
  ];

  const [procedures, setProcedures] = useState<ProcedureModal[]>([
    ...procedureDefault,
    { id: "1", name: "Corte", price: 30, color: "#000" },
    { id: "2", name: "Coloração", price: 50, color: "#f00" },
    { id: "3", name: "Escova", price: 20, color: "#0f0" },
    { id: "4", name: "Sobrancelha", price: 30, color: "#00f" },
  ]);

  //essas horas vai vir do backend para o dia que o usuario selecionar, vou buscar os horários disponiveis para aquele dia
  const [availableHours, setAvailableHours] = useState<string[]>([
    "select",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ]);

  const openNewBookingModal = (date: Date, hour: string) => {
    setSelectedDate(date);
    setSelectedHour(hour);
    setBookingModal(true);
  };

  return (
    <EventContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        selectedHour,
        setSelectedHour,
        openNewBookingModal,
        procedures,
        setProcedures,
        availableHours,
        setAvailableHours,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventContextProvider;
