export interface Times {
  withOriginal: Map<string, Date>;
  formatted: string[];
}

const generateTimes = (start: string, end: string, interval: number): Times => {
  const timesWithOriginal: Times = {
    withOriginal: new Map<string, Date>(),
    formatted: [],
  };

  const startTime = new Date(`1970/01/01 ${start}`);
  const endTime = new Date(`1970/01/01 ${end}`);

  while (startTime < endTime) {
    const formattedTime = formatTime(startTime);

    timesWithOriginal.formatted.push(formattedTime);
    timesWithOriginal.withOriginal.set(formattedTime, new Date(startTime));
    startTime.setMinutes(startTime.getMinutes() + interval);
  }

  return timesWithOriginal;
};

function formatTime(date: Date): string {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export default generateTimes;
