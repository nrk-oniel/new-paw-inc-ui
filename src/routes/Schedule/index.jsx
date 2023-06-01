import { useState } from 'react';

import Calendar from './components/Calendar';
import { normalizeSchedule } from './helpers';
import Details from './components/Details';
import useAxios from '../../hooks/useAxios';
import { API_GET_SCHEDULE } from '../../constants/api';
import Loading from '../../components/Loading';
import Error from '../../components/Error';

const INITIAL_VALUE = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  date: 0,
};

const constructUrl = (selectedDate) => {
  const { year, month } = selectedDate;

  // month tambah 1, karena di Date, januari itu 0
  return `${API_GET_SCHEDULE}?year=${year}&month=${month + 1}`;
};

function Schedule() {
  const [selectedDate, setSelectedDate] = useState(INITIAL_VALUE);

  const {
    response, isLoading, error, request,
  } = useAxios({
    url: constructUrl(selectedDate),
    method: 'GET',
  });

  const update = (key, value) => {
    const month = key === 'month' ? value : selectedDate.month;
    const year = key === 'year' ? value : selectedDate.year;

    if (key === 'year' || key === 'month') {
      // hit api ketika filter berubah (bulan dan tahun)
      request({
        url: constructUrl({ year, month }),
      });
      // reset biar user pilih tanggal lagi
      setSelectedDate((prev) => ({
        ...prev,
        [key]: value,
        date: 0,
      }));
    }

    setSelectedDate((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const data = normalizeSchedule(response, selectedDate);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="content d-flex align-items-center justify-content-center">
        <Error title="Error" subtitle={error} />
      </div>
    );
  }

  return (
    <div className="content px-4">
      <Calendar
        selectedDate={selectedDate}
        onChangeDate={(v) => update('date', v)}
        onChangeMonth={(v) => update('month', v)}
        onChangeYear={(v) => update('year', v)}
        data={data}
      />
      <div className="my-5">
        {Boolean(selectedDate.date) && (
          <Details selectedDate={selectedDate} data={data} />
        )}
      </div>
    </div>
  );
}

export default Schedule;
