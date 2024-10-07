export type Bookings = Booking[];

export type Payment = {
  type: "credit card" | "debit" | "pix";
  status: PaymentStatus;
};

export type PaymentStatus = "pending" | "paid" | "unpaid";

export interface Booking {
  id: string;
  client: Client;
  procedure: Procedure;
  observation: string;
  payment: Payment;
  total: number;
  startAt: Date;
  finishAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Client {
  id: string;
  name: string;
}

export interface Procedure {
  id: string;
  color: string;
  name: string;
  price: number;
  requiredTimeMin: number;
  procedureImage?: string;
}

export type ProcedureModal = Omit<
  Procedure,
  "requiredTimeMin" | "procedureImage"
>;
