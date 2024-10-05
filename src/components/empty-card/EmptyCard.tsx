import { FC } from "react";

interface EmptyCardProps {
  key: string;
  openModal: () => void;
}

const EmptyCard: FC<EmptyCardProps> = ({ key, openModal }) => {
  return (
    <td
      key={key}
      className="bg-white border border-gray-300 w-[30rem]"
      rowSpan={1}
      onClick={openModal}
    ></td>
  );
};

export default EmptyCard;
