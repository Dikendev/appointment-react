import { User } from "../pages/home";

const user1: User = {
  name: "DIEGO",
  appointmentDescription: "Haircut",
  bookingLength: 4,
  startTime: "08:00",
  hours: [
    {
      startTime: "08:00",
      endTime: "09:30",
    },
  ],
};

const user2: User = {
  name: "Jane Doe",
  appointmentDescription: "Nails",
  bookingLength: 3,
  startTime: "13:00",
  hours: [
    {
      startTime: "13:00",
      endTime: "14:00",
    },
  ],
};

export { user1, user2 };
