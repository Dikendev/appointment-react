import { Client } from "./client";
import { Procedure } from "./procedure";
import { User } from "./user";

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

export type Payment = {
  type: PaymentType;
  status: PaymentStatus;
};

export type PaymentType = "CREDIT CARD" | "DEBIT" | "PIX";

export const paymentType = {
  "CREDIT CARD": "credit card",
  DEBIT: "debit",
  PIX: "pix",
};

export type PaymentStatus = "PENDING" | "PAID" | "UNPAID";

export const paymentStatus = {
  PENDING: "PENDING",
  PAID: "PAID",
  UNPAID: "UNPAID",
};

export type ProcedureModal = Omit<
  Procedure,
  "requiredTimeMin" | "procedureImage"
>;

export type Bookings = Booking[];

export interface BookingResponse {
  id: string;
  userId: string;
  clientId: string;
  procedureId: string;
  user: User;
  client: Client;
  procedure: Procedure;
  payment: Payment;
  observation: string;
  total: number;
  startAt: Date;
  finishAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookingDto {
  userId: string;
  clientId: string;
  procedureId: string;
  payment: Payment;
  observation: string;
  total: number;
  startAt: Date;
  finishAt: Date;
}

export type BookingsResponse = BookingsByYear[];

export interface BookingsByYear {
  year: number;
  months: Month[];
}

export interface Month {
  month: number;
  days: Day[];
}

export interface Day {
  day: number;
  bookings: Bookings;
}
