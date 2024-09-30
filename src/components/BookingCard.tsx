import { FC } from "react";
import { DateUtils } from "../pages/week-days";

export const BookingCard: FC<{
  client: { name: string };
  procedure: { name: string; price: number };
  startAt: Date;
  finishAt: Date;
}> = (props) => {
  const { client, startAt, finishAt } = props;
  return (
    <div>
      {client.name} <br />
      {props.procedure.name} <br />
      {props.procedure.price} reais
      <br />
      {`${DateUtils.dateAndHour(startAt)} - ${DateUtils.dateAndHour(finishAt)}`}
    </div>
  );
};
