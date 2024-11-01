import { Dispatch, FC, SetStateAction, useCallback, useContext } from "react";
import { DateUtils, WeekDaysList } from "../../utils/date-utils";
import { DateInfo } from "../ViewTypes";
import MONTH from "../../constants/month";
import BOOKING_VIEW_TYPE from "../../constants/booking-view";
import GlobalContext from "../../context/global/global-context";

interface DaysWeekProps {
  daysOfWeek: WeekDaysList;
  bookingType: "DAY" | "WEEK";
  setDateInfo: Dispatch<SetStateAction<DateInfo>>;
}

const DaysWeek: FC<DaysWeekProps> = ({
  setDateInfo,
  daysOfWeek,
  bookingType,
}) => {
  const { setTodayDay, setBookingType } = useContext(GlobalContext);

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

  const handleClickDay = (day: Date) => {
    const dateMap = setTodayDay(day, 0);
    const date = DateUtils.getDayFromList(dateMap);

    if (!date) return;

    updateDateInfo(date);
    setBookingType(BOOKING_VIEW_TYPE[0]);
  };

  const ifIsToday = (day: Date): boolean => {
    return new Date(day).toDateString() === new Date().toDateString();
  };

  const trs: JSX.Element[] = [];

  const dayStyle = bookingType === "DAY" ? "text-start" : "text-center";

  daysOfWeek.forEach((day, dayOfWeek) =>
    trs.push(
      <th key={dayOfWeek} className="py-2 px-4">
        <div className={`flex flex-col gap-[3px] text-gray-500 ${dayStyle}`}>
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
