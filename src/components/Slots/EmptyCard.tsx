import { CSSProperties } from "react";

interface EmptyCardProps {
  full: {
    key: string;
    style: CSSProperties;
    ref: (element: HTMLElement | null) => void;
  };
  half: {
    key: string;
    style: CSSProperties;
    ref: (element: HTMLElement | null) => void;
  };
  handleTimeClicked: (timeType: "half" | "full") => void;
}

const EmptyCard = ({
  full: { key: fullKey, style: fullStyle, ref: fullHouRef },
  half: { key: halfKey, style: styleHalf, ref: halfHourRef },
  handleTimeClicked,
}: EmptyCardProps) => {
  return (
    <>
      <div
        ref={fullHouRef}
        style={fullStyle}
        key={fullKey}
        className="w-full h-[3rem] relative border-b border-gray-200"
        onClick={() => handleTimeClicked("full")}
      >
        <div className="w-[8rem]"></div>
      </div>

      <div
        ref={halfHourRef}
        style={styleHalf}
        key={halfKey}
        className="w-full h-[3rem] relative"
        onClick={() => handleTimeClicked("half")}
      >
        <div className="w-[8rem]"></div>
      </div>
    </>
  );
};

export default EmptyCard;
