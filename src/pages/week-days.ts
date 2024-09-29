const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export type DatesData = {
  week: WeekDaysList;
  firstDayOfWeek: Date;
  lastDayOfWeek: Date;
};

export type WeekDaysList = Map<Day, FormattedDate>;
type Day = string;
type FormattedDate = string;

export abstract class WeekDays {
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
    const weekDaysMap = new Map<string, string>();

    const weekDaysArray = new Array(7).fill(0);

    const simulateLastWeek = new Date(2024, 8, 21);
    console.log("simulateLastWeek", simulateLastWeek);

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
          currentDate.getDate() - 1
        );
      }

      if (index === weekDaysArray.length - 1) {
        lastDayOfWeek = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + 1
        );
      }

      console.log("currentDate", currentDate);

      const weekDays = WEEK_DAYS[currentDate.getDay()];
      const formattedDate = this.formatDate(currentDate.toDateString());
      weekDaysMap.set(weekDays, formattedDate);
    });

    return {
      week: weekDaysMap,
      firstDayOfWeek,
      lastDayOfWeek,
    };
  }

  private static formatDate(time: string): string {
    const timeArray = time.split(" ");
    const filtered = timeArray.slice(2, 3);
    return filtered.join(",").replace(",", " | ");
  }
}
