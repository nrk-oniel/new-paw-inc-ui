import { MONTHS } from '../../../Schedule/constants';

export function normalizeSchedule(response) {
  const scheduleList = response?.data || [];
  const res = scheduleList.map((item) => {
    const schedule = { ...item };
    // console.log(schedule);

    const { date, month, year } = schedule;
    const dateString = `${date} ${MONTHS[Number(month) - 1]} ${year}`;
    const time = `${schedule.hour}`.padStart(2, '0');
    const minute = `${schedule.minute}`.padStart(2, '0');

    return {
      id: schedule.id || 0,
      date: dateString,
      time: `${time}:${minute} WIB`,
      doctor: schedule.doctor_name || '',
    };
  });
  return res;
}
