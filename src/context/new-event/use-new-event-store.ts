import { create } from "zustand";
import { Payment, PaymentStatus, PaymentType } from "../../@types/booking";
import { Procedure } from "../../@types/procedure";
import { initialFormState } from "./initial-form-state";

export interface NewEventFormState {
  client: { id: string; name: string };
  procedure: { id: string; name: string };
  payment: Payment;
  observation: string;
  total: number;
  startAt: string;
  finishAt: string;
}

interface NewEventFormAction {
  updateForm: (newEventForm: NewEventFormState) => void;
  updateDynamicForm: (key: string, value: string) => void;
  updateStartAt: (selectedHour: string) => void;
  updatePaymentStatus: (paymentStatus: PaymentStatus) => void;
  updatePaymentType: (paymentType: PaymentType) => void;
  updateClient: (id: string, name: string) => void;
  updateProcedure: (procedure: Procedure) => void;
}

const useNewEventFormStore = create<NewEventFormState & NewEventFormAction>(
  (set) => ({
    ...initialFormState,
    updateForm: (newEventForm) =>
      set((prevForm) => ({ ...prevForm, ...newEventForm })),

    updateDynamicForm: (key: string, value: string) =>
      set((prev) => ({
        ...prev,
        [key]: value,
      })),

    updateStartAt: (selectedHour) =>
      set((prev) => ({ ...prev, startAt: selectedHour })),

    updatePaymentStatus: (paymentStatus) =>
      set((prev) => ({
        ...prev,
        payment: {
          status: paymentStatus,
          type: prev.payment.type,
        },
      })),

    updatePaymentType: (paymentType: PaymentType) =>
      set((prev) => ({
        ...prev,
        payment: {
          status: prev.payment.status,
          type: paymentType,
        },
      })),

    updateClient: (id: string, name: string) =>
      set((prev) => ({
        ...prev,
        client: {
          id: id,
          name: name,
        },
      })),

    updateProcedure: (procedure: Procedure) =>
      set((prev) => ({
        ...prev,
        procedure: {
          id: procedure.id,
          name: procedure.name,
        },
        total: procedure.price,
      })),
  })
);

export { useNewEventFormStore };
