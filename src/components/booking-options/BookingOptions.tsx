import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/PopOver";
import { SIDE_OPTIONS } from "../../constants/side-options";
import { MessageSquareText, Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/Button";
import SelectOptions, { ButtonsProps } from "../select-options/SelectOptions";
import { Booking, PaymentStatus } from "../../@types/booking";

interface BookingOptionsProps {
  side: Side;
  booking: Booking;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export type Side = (typeof SIDE_OPTIONS)[number];

const BookingOptions: FC<BookingOptionsProps> = ({
  side,
  booking,
  onOpenChange,
}) => {
  const [sideOffSet, setSideOffSet] = useState<number>(95);
  const [alignOffSet, setAlignOffSet] = useState<number>(-150);

  const centerSide = () => {
    setSideOffSet(-100);
    setAlignOffSet(-150);
  };

  const rightSide = () => {
    setSideOffSet(90);
    setAlignOffSet(-120);
  };

  const handleRenderSide = useCallback((side: Side) => {
    switch (side) {
      case "right":
        rightSide();
        break;
      case "top":
        centerSide();
        break;
      default:
        break;
    }
  }, []);

  const buttonsOptions = (): ButtonsProps[] => {
    return [
      { text: "teste1", onClick: () => console.log("teste1") },
      { text: "teste2", onClick: () => console.log("teste2") },
    ];
  };

  const paymentColorStyleByStatus = (paymentStatus: PaymentStatus) => {
    switch (paymentStatus) {
      case "paid":
        return (
          <span className="text-green-700 font-bold">
            {booking.payment.status}
          </span>
        );
      case "pending":
        return (
          <span className="text-yellow-700 font-bold">
            {booking.payment.status}
          </span>
        );
      case "unpaid":
        return (
          <span className="text-red-700 font-bold">
            {booking.payment.status}
          </span>
        );
      default:
        return (
          <span className="text-blue-700 font-bold">
            {booking.payment.status}
          </span>
        );
    }
  };

  useEffect(() => {
    handleRenderSide(side);
  }, [handleRenderSide, side]);

  return (
    <Popover open={true} onOpenChange={onOpenChange}>
      <PopoverTrigger></PopoverTrigger>
      <PopoverContent
        updatePositionStrategy="optimized"
        className="w-[25rem]"
        side={side}
        align="start"
        sticky="always"
        sideOffset={sideOffSet}
        alignOffset={alignOffSet}
      >
        <div className="grid gap-3">
          {/* find a better way to handle this using ref */}
          <input
            type="text"
            style={{ position: "absolute", opacity: 0, height: 0, width: 0 }}
            autoFocus
          />
          <div className="flex justify-end gap-1">
            <Button variant="outline" size="icon">
              <Pencil className="h-3 w-3" />
            </Button>
            <Button variant="outline" size="icon">
              <Trash2 className="h-3 w-3" />
            </Button>
            <SelectOptions buttons={buttonsOptions()} />
          </div>
          <div className="mb-1 grid grid-cols-[25px_1fr] items-start pb-1 last:mb-0 last:pb-0">
            <div>
              <span className="flex h-4 w-4 translate-y-0 rounded-sm bg-sky-500" />
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {booking.client.name}
              </p>
              <p className="text-sm text-muted-foreground">
                Segunda, 06 outubro - 12:30 - 13:30
              </p>
              <p className="text-sm text-muted-foreground">
                {booking.procedure.name} - {booking.procedure.price} reais.
              </p>
              <p className="text-sm text-muted-foreground">
                {booking.payment.type} -{" "}
                {paymentColorStyleByStatus(booking.payment.status)}
              </p>
            </div>
          </div>
          {booking.observation.length > 1 && (
            <div className="mb-1 grid grid-cols-[25px_1fr] items-start pb-1 last:mb-0 last:pb-0">
              <div>
                <MessageSquareText />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  {booking.observation}
                </p>
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

BookingOptions.displayName = "BookingOptions";
export default BookingOptions;
