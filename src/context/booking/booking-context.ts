import { createContext, Dispatch, SetStateAction } from "react";
import { ProcedureModal } from "../../@types/booking";

interface BookingContextType {
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  selectedHour: string;
  setSelectedHour: Dispatch<SetStateAction<string>>;
  procedures: ProcedureModal[];
  setProcedures: Dispatch<SetStateAction<ProcedureModal[]>>;
  availableHours: string[];
  setAvailableHours: Dispatch<SetStateAction<string[]>>;
  eventModal: boolean;
  openNewBookingModal: (day?: Date, hour?: string) => void;
  closeEventModal: () => void;
}

const BookingContext = createContext<BookingContextType>({
  selectedDate: new Date(),
  setSelectedDate: () => {},
  selectedHour: "",
  setSelectedHour: () => {},
  eventModal: false,
  openNewBookingModal: () => {},
  procedures: [],
  setProcedures: () => {},
  availableHours: [],
  setAvailableHours: () => {},
  closeEventModal: () => {},
});

export default BookingContext;
