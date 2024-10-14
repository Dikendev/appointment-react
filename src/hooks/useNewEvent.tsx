import { useContext } from "react";
import NewEventContext, {
  NewEventContextProps,
} from "../context/new-event/new-event-context";

const useNewEvent = (): NewEventContextProps => {
  const { form, setFormData } = useContext(NewEventContext);
  return { form, setFormData };
};

export default useNewEvent;
