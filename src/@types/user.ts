export interface User {
  name: string;
  appointmentDescription: string;
  bookingLength?: number;
  startTime?: string;
  hours: {
    startTime: string;
    endTime: string;
  }[];
}
