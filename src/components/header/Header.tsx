import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import GlobalContext from "../context/global/global-context";
import MONTH from "../../constants/month";
import { DateUtils } from "../../pages/week-days";
import BOOKING_VIEW_TYPE from "../../constants/booking-view";

export type ActionType = "next" | "previous";

const Header = () => {
  const {
    todayWeek,
    nextWeek,
    previousWeek,
    bookingType,
    setBookingType,
    setTodayDay,
    handleDayChange,
  } = useContext(GlobalContext);

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

  const handleWeekChange = (actionType: ActionType) => {
    switch (bookingType) {
      case BOOKING_VIEW_TYPE[0]: {
        if (actionType === "next") {
          const day = handleDayChange("next");

          if (day) {
            const dayOfWeek = DateUtils.getDayFromList(day);
            if (dayOfWeek) updateDateInfo(dayOfWeek);
          }
          break;
        }

        const day = handleDayChange("previous");

        if (day) {
          const dayOfWeek = DateUtils.getDayFromList(day);
          if (dayOfWeek) updateDateInfo(dayOfWeek);
        }

        break;
      }
      case BOOKING_VIEW_TYPE[1]: {
        let lastDayOfWeek: Date;
        let firstDayOfWeek: Date;

        if (actionType === "next") {
          const result = nextWeek();
          lastDayOfWeek = result.lastDayOfWeek;
          firstDayOfWeek = result.firstDayOfWeek;
          manageDateAndViewMessages(firstDayOfWeek, lastDayOfWeek);
          return;
        }

        const result = previousWeek();
        lastDayOfWeek = result.lastDayOfWeek;
        firstDayOfWeek = result.firstDayOfWeek;

        manageDateAndViewMessages(firstDayOfWeek, lastDayOfWeek);
        break;
      }
    }
  };

  const handleViewTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case BOOKING_VIEW_TYPE[0]: {
        setBookingType(BOOKING_VIEW_TYPE[0]);

        const dateMap = setTodayDay(new Date(), 0);
        const key = dateMap.keys().next().value;

        if (!key) return;

        const date = dateMap.get(key);

        if (!date) return;

        updateDateInfo(date);
        break;
      }
      case BOOKING_VIEW_TYPE[1]: {
        setBookingType(BOOKING_VIEW_TYPE[1]);

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
        break;
      }
    }
  };

  const todayDay = () => {
    if (bookingType === BOOKING_VIEW_TYPE[0]) {
      const dateMap = setTodayDay(new Date(), 0);

      const key = dateMap.keys().next().value;
      if (!key) return;

      const date = dateMap.get(key);

      if (!date) return;

      updateDateInfo(date);
    } else {
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
    }
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
    <header className="flex flex-row gap-2 justify-between w-full">
      <div>LOGO</div>
      <div className="flex flex-row">
        <div className="flex flex-row gap-2">
          <button
            className="bg-white hover:bg-gray-100 border-[1px] border-gray-500 border-solid py-2 self-center px-3 flex hover:border-gray-500 focus:outline-0 active:bg-gray-300"
            onClick={todayDay}
          >
            <span className="text-black">Today</span>
          </button>
          <button
            className="bg-white hover:bg-gray-100 border-none rounded-full py-3 px-3 flex focus:bg-gray-200 focus:outline-0"
            onClick={() => handleWeekChange("previous")}
          >
            <span className="material-symbols-outlined text-gray-500">
              chevron_left
            </span>
          </button>
          <button
            className="bg-white hover:bg-gray-100 border-none rounded-full py-3 px-3 flex text-gray-500 target:border-none focus:bg-gray-200 focus:outline-0"
            onClick={() => handleWeekChange("next")}
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
        <div className="w-40 content-center">
          <span className=" text-gray-800 font-bold">
            {dateInfo.monthMessage} {dateInfo.fullYear}
          </span>
        </div>
      </div>
      <select
        value={bookingType}
        onChange={(event) => handleViewTypeChange(event)}
      >
        {BOOKING_VIEW_TYPE.map((type) => (
          <option value={type} key={type}>
            {type}
          </option>
        ))}
      </select>
    </header>
  );
};

export default Header;
