const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export abstract class WeekDays {
  static #newDate = new Date();
  static #weekDays = WEEK_DAYS;

  private static findIndexToStart() {
    const date = this.#newDate;
    const actualDay = this.#weekDays[date.getDay()];
    return this.findActualDayIndex(actualDay.toString());
  }

  private static findActualDayIndex(today: string): number {
    const todayIndex = this.#weekDays.indexOf(today);
    return -todayIndex;
  }

  static generateWeekDays() {
    console.log("EXECUTING generateWeekDays");
    const indexToStart = this.findIndexToStart();
    return new Array(7).fill(0).map((_, index) => {
      const today = this.#newDate;

      const diffIndex = index + indexToStart;
      const currentDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + diffIndex
      );

      const weekDays = WEEK_DAYS[currentDate.getDay()];
      const formattedDate = this.formatDate(currentDate.toDateString());
      return `${weekDays} : ${formattedDate}`;
    });
  }

  private static formatDate(time: string): string {
    const timeArray = time.split(" ");
    const filtered = timeArray.slice(2, 3);
    return filtered.join(",").replace(",", " | ");
  }
}
