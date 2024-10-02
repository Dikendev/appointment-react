import { FC } from "react";
import { DateUtils, WeekDaysList } from "../../pages/date-utils";

const DaysWeek: FC<{ daysOfWeek: WeekDaysList }> = (props) => {
  const handleClickDay = (day: Date) => {
    console.log("clicking day", day);
  };

  const ifIsToday = (day: Date): boolean => {
    return new Date(day).toDateString() === new Date().toDateString();
  };

  const trs: JSX.Element[] = [];

  props.daysOfWeek.forEach((day, dayOfWeek) =>
    trs.push(
      <th key={dayOfWeek} className="py-2 px-4">
        <div className="flex flex-col gap-[3px] text-gray-500">
          <span>{dayOfWeek}</span>
          <div className="w-full">
            <span
              className={`${
                ifIsToday(day)
                  ? "hover:cursor-pointer bg-purple-500 text-white rounded-full p-2"
                  : "hover:cursor-pointer hover:bg-gray-100 hover:border hover:border-gray-300 p-2 border-none rounded-full"
              }`}
              onClick={() => handleClickDay(day)}
            >
              {DateUtils.formatDate(day.toDateString())}
            </span>
          </div>
        </div>
      </th>
    )
  );

  return <>{trs}</>;
};

export default DaysWeek;
