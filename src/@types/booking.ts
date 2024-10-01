export type Bookings = Booking[];

export interface Booking {
  id: string;
  client: Client;
  procedure: Procedure;
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
