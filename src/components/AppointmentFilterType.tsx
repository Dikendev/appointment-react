import { CheckedState } from "@radix-ui/react-checkbox";
import { Checkbox } from "./ui/Checkbox";
import { useContext } from "react";
import GlobalContext from "../context/global/global-context";

const mockServices = [
  { id: "1", description: "Corte", price: 30, color: "#000" },
  { id: "2", description: "Coloração", price: 50, color: "#f00" },
  { id: "3", description: "Escova", price: 20, color: "#0f0" },
  { id: "4", description: "Sobrancelha", price: 30, color: "#00f" },
];

const AppointmentFilterType = () => {
  const { bookings, firstDayOfWeekRef, lastDayOfWeekRef } =
    useContext(GlobalContext);

  const onChangeFilter = (checked: CheckedState) => {
    console.log("Filter Type", bookings);
    console.log("Filter Type", checked);
  };

  const onCheck = (service: string): boolean | undefined => {
    let checked = false;

    console.log("FIRST DAY", firstDayOfWeekRef.current);
    console.log("LAST DAY", lastDayOfWeekRef.current);

    const today = new Date();
    const getTodayDate = today.getDate();
    const getMonth = today.getMonth();

    bookings.forEach((booking) => {
      if (
        booking.startAt.getDate() === getTodayDate &&
        booking.startAt.getMonth() === getMonth
      ) {
        if (booking.procedure.name === service && booking) {
          checked = true;
        }
      }
    });

    return checked;
  };

  return (
    <div key="filterServices">
      {mockServices.map((service) => (
        <div className="flex items-center space-x-2" key={service.id}>
          <Checkbox
            value={service.description}
            checked={onCheck(service.description)}
            onCheckedChange={onChangeFilter}
          />
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {service.description}
          </label>
        </div>
      ))}
    </div>
  );
};

export default AppointmentFilterType;
