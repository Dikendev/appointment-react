import { Bookings } from "../../@types/booking";
import { user1, user2 } from "./mock-data";

const today = new Date();

const COLORS = ["#03fcdf", "#03a5fc", "#fc036b"];

const initialEvents: Bookings = [
  {
    id: "1",
    startAt: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      8,
      0o0
    ),
    finishAt: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      9,
      30
    ),
    client: user1,
    procedure: {
      id: "1",
      color: COLORS[0],
      name: "Corte",
      price: 50,
      requiredTimeMin: 90,
    },
    payment: {
      type: "CREDIT CARD",
      status: "PAID",
    },
    observation: "",
    total: 50,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "1",
    startAt: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      11,
      30
    ),
    finishAt: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      12,
      30
    ),
    client: user1,
    procedure: {
      id: "1",
      color: COLORS[0],
      name: "Haircut",
      price: 50,
      requiredTimeMin: 90,
    },
    payment: {
      type: "CREDIT CARD",
      status: "UNPAID",
    },
    observation: "lorem lorem lorem",
    total: 50,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // {
  //   id: "1",
  //   startAt: new Date(
  //     today.getFullYear(),
  //     today.getMonth(),
  //     today.getDate(),
  //     9,
  //     30
  //   ),
  //   finishAt: new Date(
  //     today.getFullYear(),
  //     today.getMonth(),
  //     today.getDate(),
  //     10,
  //     0o0
  //   ),
  //   client: user1,
  //   procedure: {
  //     id: "1",
  //     color: COLORS[0],
  //     name: "Haircut",
  //     price: 50,
  //     requiredTimeMin: 90,
  //   },
  //   payment: {
  //     type: "CREDIT CARD",
  //     status: "UNPAID",
  //   },
  //   observation: "lorem lorem lorem",
  //   total: 50,
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // },
  {
    id: "1",
    startAt: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      11,
      0o0
    ),
    finishAt: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      12,
      30
    ),
    client: user1,
    procedure: {
      id: "1",
      color: COLORS[0],
      name: "Haircut",
      price: 50,
      requiredTimeMin: 90,
    },
    payment: {
      type: "CREDIT CARD",
      status: "UNPAID",
    },
    observation: "lorem lorem lorem",
    total: 50,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "1",
    startAt: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
      10,
      0o0
    ),
    finishAt: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
      11,
      0o0
    ),
    client: user1,
    procedure: {
      id: "1",
      color: COLORS[0],
      name: "Haircut",
      price: 50,
      requiredTimeMin: 90,
    },
    payment: {
      type: "PIX",
      status: "UNPAID",
    },
    observation: "lorem lorem lorem",
    total: 50,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    startAt: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 2,
      10,
      30
    ),
    finishAt: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 2,
      12,
      30
    ),
    client: user2,
    procedure: {
      id: "2",
      color: COLORS[1],
      name: "Haircut",
      price: 530,
      requiredTimeMin: 90,
    },
    payment: {
      type: "DEBIT",
      status: "PAID",
    },
    observation: "",
    total: 530,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    startAt: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 3,
      13,
      30
    ),
    finishAt: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 3,
      15,
      30
    ),
    client: user2,
    procedure: {
      id: "2",
      color: COLORS[2],
      name: "Sobrancelha",
      price: 530,
      requiredTimeMin: 90,
    },
    payment: {
      type: "DEBIT",
      status: "PENDING",
    },
    observation: "lorem lorem lorem",
    total: 530,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export { COLORS, initialEvents };
