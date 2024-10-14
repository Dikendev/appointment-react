import { Client } from "./client";

export interface Profile {
  id: string;
  email: string;
  phoneNumber: string;
  birthday?: string;
  profilePicture?: string;
  // user?: User;
  client?: Client;
}
