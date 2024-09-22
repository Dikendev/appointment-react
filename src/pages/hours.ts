const generateTimes = (start: string, end: string, interval: number) => {
  const times: string[] = [];
  const startTime = new Date(`1970/01/01 ${start}`);
  const endTime = new Date(`1970/01/01 ${end}`);

  while (startTime < endTime) {
    times.push(formatTime(startTime));
    startTime.setMinutes(startTime.getMinutes() + interval);
  }

  return times;
};

function formatTime(date: Date): string {
  const hours = String(date.getHours() + 3).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export default generateTimes;
