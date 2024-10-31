import { FC, PropsWithChildren, useState } from "react";
import { ProcedureModal } from "../../@types/booking";
import BookingContext from "./booking-context";

const BookingContextProvider: FC<PropsWithChildren<object>> = ({
  children,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedHour, setSelectedHour] = useState<string>("");
  const [eventModal, setEventModal] = useState<boolean>(false);

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
    // ...procedureMock,
  ]);

  const closeEventModal = () => {
    setEventModal(false);
  };

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

  const openNewBookingModal = (date?: Date, hour?: string) => {
    if (date) setSelectedDate(date);
    if (hour) setSelectedHour(hour);
    setEventModal(true);
  };

  return (
    <BookingContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        selectedHour,
        setSelectedHour,
        eventModal,
        openNewBookingModal,
        procedures,
        setProcedures,
        availableHours,
        setAvailableHours,
        closeEventModal,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContextProvider;
