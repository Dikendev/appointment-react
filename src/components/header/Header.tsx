import { useCallback, useContext, useEffect, useState } from "react";
import GlobalContext from "../context/global/global-context";
import MONTH from "../../constants/month";
import { DateUtils } from "../../pages/week-days";

const Header = () => {
  const { todayWeek, nextWeek, previousWeek } = useContext(GlobalContext);

  const [dateInfo, setDateInfo] = useState({
    month: new Date().getMonth(),
    fullYear: new Date().getFullYear(),
    monthMessage: "",
  });

  const updateDateInfo = useCallback(
    (targetDate: Date) => {
      setDateInfo((prev) => ({
        ...prev,
        month: targetDate.getMonth(),
        fullYear: targetDate.getFullYear(),
        monthMessage: MONTH[targetDate.getMonth()],
      }));
    },
    [setDateInfo]
  );

  const updateMonthMessages = useCallback(
    (...targetDate: Date[]) => {
      setDateInfo((prev) => ({
        ...prev,
        monthMessage: DateUtils.shortMonthDescription(
          targetDate[0],
          targetDate[1]
        ),
      }));
    },
    [setDateInfo]
  );

  const manageDateAndViewMessages = useCallback(
    (firstDayOfWeek: Date, lastDayOfWeek: Date) => {
      const monthInitial = firstDayOfWeek.getMonth();
      const monthFinal = lastDayOfWeek.getMonth();

      updateDateInfo(lastDayOfWeek);

      if (monthInitial !== monthFinal) {
        return updateMonthMessages(firstDayOfWeek, lastDayOfWeek);
      }
    },
    [updateDateInfo, updateMonthMessages]
  );

  const handleWeekChange = (
    weekChangeFunction: () => { lastDayOfWeek: Date; firstDayOfWeek: Date }
  ) => {
    const { lastDayOfWeek, firstDayOfWeek } = weekChangeFunction();
    manageDateAndViewMessages(firstDayOfWeek, lastDayOfWeek);
  };

  useEffect(() => {
    const { lastDayOfWeek, firstDayOfWeek } = todayWeek();
    const firstDayOfWeekMonth = firstDayOfWeek.getMonth();
    const initialMessage =
      firstDayOfWeekMonth !== lastDayOfWeek.getMonth()
        ? DateUtils.shortMonthDescription(firstDayOfWeek, lastDayOfWeek)
        : MONTH[firstDayOfWeekMonth];

    setDateInfo((prev) => ({
      ...prev,
      monthMessage: initialMessage,
    }));
  }, []);

  return (
    <header className="flex flex-row gap-2">
      <div className="flex flex-row">
        <button
          className="bg-white hover:bg-gray-100 border-[1px] border-gray-500 border-solid py-2 self-center px-3 flex hover:border-gray-500 focus:outline-0 active:bg-gray-300"
          onClick={() => handleWeekChange(todayWeek)}
        >
          <span className="text-black">Today</span>
        </button>
        <button
          className="bg-white hover:bg-gray-100 border-none rounded-full py-3 px-3 flex focus:bg-gray-200 focus:outline-0"
          onClick={() => handleWeekChange(previousWeek)}
        >
          <span className="material-symbols-outlined text-gray-500">
            chevron_left
          </span>
        </button>
        <button
          className="bg-white hover:bg-gray-100 border-none rounded-full py-3 px-3 flex text-gray-500 target:border-none focus:bg-gray-200 focus:outline-0"
          onClick={() => handleWeekChange(nextWeek)}
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
      <div className="w-40 content-center">
        <span className=" text-gray-800 font-bold">
          {dateInfo.monthMessage} {dateInfo.fullYear}
        </span>
      </div>
    </header>
  );
};

export default Header;
