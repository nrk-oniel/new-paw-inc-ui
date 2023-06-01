import { Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import CalendarDate from './components/CalendarDate';

import { DAYS, MONTHS } from '../../constants';

import './styles.css';
import { getKey } from '../../helpers';

function Calendar(props) {
  const {
    selectedDate, onChangeDate, onChangeMonth, onChangeYear, data,
  } = props;
  const { year, month, date } = selectedDate;

  const handleRetractYear = () => {
    const newYear = year - 1;
    if (newYear) {
      onChangeYear(newYear);
    }
  };

  const handleAddYear = () => {
    const newYear = year + 1;
    if (newYear) {
      onChangeYear(newYear);
    }
  };

  return (
    <div className="d-flex">
      <div>
        <div className="py-1 text-center cal-year d-flex justify-content-around align-items-center">
          <FontAwesomeIcon className="cursor-pointer" icon={faArrowLeft} onClick={handleRetractYear} />
          <span>{year}</span>
          <FontAwesomeIcon className="cursor-pointer" icon={faArrowRight} onClick={handleAddYear} />
        </div>
        {MONTHS.map((item, idx) => {
          const selected = month === idx;
          const selectedClass = selected ? ' cal-month-active' : '';
          return (
            <div key={item}>
              <Button
                variant="main"
                className={`w-100 btn-square cal-month${selectedClass}`}
                onClick={() => onChangeMonth(idx)}
              >
                {item}
              </Button>
            </div>
          );
        })}
      </div>
      <Col className="text-center">
        <div className="cal-header py-1">{`${MONTHS[month]} ${year}`}</div>
        <div className="cal-date-container">
          {DAYS.map((day) => <div className="py-1" key={day}>{day}</div>)}
          {[...Array(35)].map((_, idx) => {
            const possibleDate = idx + 1;
            const dataKey = getKey({ date: idx + 1, month, year });
            return (
              <CalendarDate
                key={possibleDate}
                month={month}
                year={year}
                date={possibleDate}
                isSelected={date === possibleDate}
                onChangeDate={onChangeDate}
                list={data[dataKey]}
              />
            );
          })}
        </div>
      </Col>
    </div>
  );
}

export default Calendar;
