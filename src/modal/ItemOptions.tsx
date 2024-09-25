import { FC } from "react";

export const ItemOptions: FC<{ selectedBooking: string }> = ({
  selectedBooking,
}) => {
  return (
    <div>
      {" "}
      <span>Usuário:{selectedBooking} </span>
      <br />
      <span> X - delete {} O - Edit</span>
    </div>
  );
};
