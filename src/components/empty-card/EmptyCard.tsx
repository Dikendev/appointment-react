import { FC } from "react";

interface EmptyCardProps {
  dayHour: {
    day: string;
    hour: string;
  };
  openModal: () => void;
}

const EmptyCard: FC<EmptyCardProps> = ({ dayHour, openModal }) => {
  return (
    <td
      key={`${dayHour.day}-${dayHour.hour}-empty`}
      className="bg-white border border-gray-300 w-[30rem]"
      rowSpan={1}
      onClick={openModal}
    ></td>
  );
};

export default EmptyCard;
