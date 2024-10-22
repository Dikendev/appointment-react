import { NewEventFormState } from "./use-new-event-store";

export const initialFormState: NewEventFormState = {
  client: { id: "", name: "" },
  procedure: { id: "", name: "" },
  payment: {
    status: "UNPAID",
    type: "PIX",
  },
  observation: "",
  total: 0,
  startAt: "",
  finishAt: "",
};
