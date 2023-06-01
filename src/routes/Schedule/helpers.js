import { MONTHS } from './constants';

export function getKey(dateProps) {
  const { date, month, year } = dateProps;
  return `${date}-${month}-${year}`;
}

export function getDateString(dateProps) {
  const { date, month, year } = dateProps;
  return `${date} ${MONTHS[month]} ${year}`;
}

export function normalizeSchedule(response, selectedDate) {
  const { month, year } = selectedDate;
  const schedule = response?.data?.schedules || {};
  const data = {};
  // ambil key dari object schedule
  Object.keys(schedule).forEach((dateKey) => {
    // ambil data timenya
    const objTime = schedule[dateKey];
    const newKey = getKey({ month, year, date: dateKey });
    // loop ke semua data time yang ada
    const practiceSchedule = Object.keys(objTime).map((timeKey) => ({
      time: `${timeKey} WIB`,
      doctors: objTime[timeKey],
    }));
    data[newKey] = practiceSchedule;
  });

  return data;
}
