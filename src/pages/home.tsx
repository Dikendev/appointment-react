import CalendarPicker from "../components/calendar/CalendarPicker";
import ViewTypes from "../components/ViewTypes";

export const HomePage = () => {
  return (
    <div className="flex flex-row justify-center items-center">
      <div>
        <CalendarPicker />
      </div>
      <div className="flex flex-col items-center p-4 relative bg-red-400 w-full">
        <ViewTypes />
      </div>
    </div>
  );
};
