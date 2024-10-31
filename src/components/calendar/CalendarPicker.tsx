import { useState } from "react";
import "react-day-picker/style.css";
import { DayPicker } from "react-day-picker";

const CalendarPicker = () => {
  const [selected, setSelected] = useState<Date>();

  return (
    <DayPicker
      className="border border-gray-200"
      mode="single"
      selected={selected}
      onSelect={setSelected}
      footer={
        selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
      }
    />
  );
};

export default CalendarPicker;
