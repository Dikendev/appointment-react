import MONTH from "../constants/month";

export const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export type DatesData = {
  week: WeekDaysList;
  firstDayOfWeek: Date;
  lastDayOfWeek: Date;
};

export type WeekDaysList = Map<Day, Date>;
type Day = string;

export abstract class DateUtils {
  static #newDate = new Date();
  static #weekDays = WEEK_DAYS;

  private static findIndexToStart(date: Date = this.#newDate): number {
    const actualDay = this.#weekDays[date.getDay()];
    return this.findActualDayIndex(actualDay.toString());
  }

  private static findActualDayIndex(today: string): number {
    const todayIndex = this.#weekDays.indexOf(today);
    return todayIndex;
  }

  static generateWeekDays(newDate?: Date): DatesData {
    const indexToStart = this.findIndexToStart(newDate);
    const weekDaysMap = new Map<string, Date>();

    const weekDaysArray = new Array(7).fill(0);

    let firstDayOfWeek = new Date();
    let lastDayOfWeek = new Date();

    weekDaysArray.forEach((_, index) => {
      const today = newDate ? newDate : this.#newDate;

      const diffIndex = index - indexToStart;
      const currentDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + diffIndex
      );

      if (index === 0) {
        firstDayOfWeek = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
        );
      }

      if (index === weekDaysArray.length - 1) {
        lastDayOfWeek = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
        );
      }

      const weekDays = WEEK_DAYS[currentDate.getDay()];
      weekDaysMap.set(weekDays, currentDate);
    });

    return {
      week: weekDaysMap,
      firstDayOfWeek,
      lastDayOfWeek,
    };
  }

  static generateDays = (date: Date, daysForwardOrBack: number) => {
    const weekDaysMap = new Map<string, Date>();

    const dateFormatted = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + daysForwardOrBack
    );

    const dayOfWeek = WEEK_DAYS[dateFormatted.getDay()];

    weekDaysMap.set(dayOfWeek, dateFormatted);
    return weekDaysMap;
  };

  static addDay(currentDate: Date, numberOfDays: number): Date {
    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + numberOfDays
    );
  }

  static formatDate(time: string): string {
    const timeArray = time.split(" ");
    const filtered = timeArray.slice(2, 3);
    return filtered.join(",").replace(",", " | ");
  }

  static dateAndHour = (date: Date) => {
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  static shortMonthDescription = (...month: Date[]): string => {
    return `${MONTH[month[0].getMonth()].slice(0, 3)} - ${MONTH[
      month[1].getMonth()
    ].slice(0, 3)}`;
  };

  static getDayFromList = (weekDayList: WeekDaysList): Date | undefined => {
    const key = weekDayList.keys().next().value;
    if (!key) return;
    return weekDayList.get(key);
  };
}
