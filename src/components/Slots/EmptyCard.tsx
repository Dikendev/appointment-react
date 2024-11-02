import { CSSProperties, forwardRef } from "react";

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
  disabledCss: string;
  handleTimeClicked: (timeType: "half" | "full") => void;
}

const EmptyCard = forwardRef(
  ({
    full: { key: fullKey, style: fullStyle, ref: fullHouRef },
    half: { key: halfKey, style: styleHalf, ref: halfHourRef },
    disabledCss,
    handleTimeClicked,
  }: EmptyCardProps) => {
    return (
      <>
        <div
          ref={fullHouRef}
          style={fullStyle}
          key={fullKey}
          className={`w-full h-[3rem] relative border-b border-gray-200 ${disabledCss}`}
          onClick={() => handleTimeClicked("full")}
        >
          <div key={fullKey} className="w-[8rem]"></div>
        </div>

        <div
          ref={halfHourRef}
          style={styleHalf}
          key={halfKey}
          className={`w-full h-[3rem] relative ${disabledCss}`}
          onClick={() => handleTimeClicked("half")}
        >
          <div key={fullKey} className="w-[8rem]"></div>
        </div>
      </>
    );
  }
);

EmptyCard.displayName = "EmptyCard";
export default EmptyCard;
