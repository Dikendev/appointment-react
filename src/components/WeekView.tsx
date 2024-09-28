import { useContext } from "react";
import HoursView from "./HoursView";
import GlobalContext from "../context/global-context";
import FormAddNewEvent from "../pages/forms/FormAddNewEvent";

export const WeekView = () => {
  const { daysOfWeek, newEventModal, setNewEventModal } =
    useContext(GlobalContext);

  return (
    <table className="min-w-full bg-white border border-gray-300 mt-4">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="py-2 px-4">Horas</th>
          {daysOfWeek.map((day) => (
            <th key={day} className="py-2 px-4">
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <HoursView daysOfWeek={daysOfWeek} />

      {newEventModal && (
        <div className="absolute  inset-0 flex  justify-start items-start h-screen pt-4 pr-1">
          <FormAddNewEvent closeModal={() => setNewEventModal(false)} />
        </div>
      )}
    </table>
  );
};

export default WeekView;
