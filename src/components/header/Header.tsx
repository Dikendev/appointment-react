import { useContext, useState } from "react";
import GlobalContext from "../../context/global-context";

const MONTH = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

const Header = () => {
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [fullYear, setFullYear] = useState<number>(new Date().getFullYear());
  const { nextWeek, previousWeek } = useContext(GlobalContext);
  const [monthMessage, setMonthMessage] = useState<string>(MONTH[month]);

  // TODO: Está causando bug nessa lógica.
  const handleOnIncrementMonth = () => {
    const { lastDayOfWeek, firstDayOfWeek } = nextWeek();
    const monthInitial = firstDayOfWeek.getMonth();
    const monthFinal = lastDayOfWeek.getMonth();

    if (month === 12) {
      setMonth(0);
      setFullYear((prev) => prev + 1);
      setMonthMessage(MONTH[monthInitial]);
    } else {
      if (monthInitial !== monthFinal) {
        setMonth((prev) => prev + 1);
        setMonthMessage(`${MONTH[monthInitial]} - ${MONTH[monthFinal]}`);
      } else {
        setMonthMessage(MONTH[monthInitial]);
      }
    }
  };

  const handleOnDecrementMonth = () => {
    const { lastDayOfWeek, firstDayOfWeek } = previousWeek();
    const monthInitial = firstDayOfWeek.getMonth();
    const monthFinal = lastDayOfWeek.getMonth();

    if (month !== 0) {
      if (monthInitial !== monthFinal) {
        setMonthMessage(`${MONTH[monthInitial]} - ${MONTH[monthFinal]}`);
        setMonth((prev) => prev - 1);
      } else {
        setMonthMessage(MONTH[monthInitial]);
      }
    } else {
      setMonth(11);
      setFullYear(fullYear - 1);
      setMonthMessage(MONTH[monthInitial]);
    }
  };

  return (
    <header className="flex flex-row gap-2">
      <div className="flex flex-row">
        <button
          className="bg-white hover:bg-gray-100 border-none rounded-full py-3 px-3 flex focus:bg-gray-200 focus:outline-0"
          onClick={() => handleOnDecrementMonth()}
        >
          <span className="material-symbols-outlined text-gray-500">
            chevron_left
          </span>
        </button>
        <button
          className="bg-white hover:bg-gray-100 border-none rounded-full py-3 px-3 flex text-gray-500 target:border-none focus:bg-gray-200 focus:outline-0"
          onClick={() => handleOnIncrementMonth()}
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
      <div className="w-56 content-center">
        {monthMessage} - {fullYear}
      </div>
    </header>
  );
};

export default Header;
