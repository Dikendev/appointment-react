import { Profile } from "./profile";

export interface Client {
  id: string;
  name: string;
  profile: Profile;
  createdAt: Date;
  updatedAt: Date;
  bookings?: Booking[];
}

export interface ClientDto {
  name: string;
  email?: string;
  birthday?: string;
  phoneNumber?: string;
}

export interface Booking {
  id: string;
  userId: string;
  clientId: string;
  procedureId: string;
  total: number;
  startAt: Date;
  finishAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
