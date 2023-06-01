import { getDate } from './helpers';

function CalendarDate(props) {
  const {
    year, month, date, isSelected = false, onChangeDate, list = [],
  } = props;

  const data = getDate({ year, month, date });
  const firstFourSchedule = list.slice(0, 4);
  const extraSchedule = list.slice(4).length;

  const handleClick = () => {
    if (data) onChangeDate(data);
  };

  if (!data) {
    return <div className="cal-date-empty" />;
  }

  return (
    <div className="cal-date" onClick={handleClick} role="presentation">
      {Boolean(extraSchedule) && <div className="extra">{extraSchedule}</div>}
      <div className="p-2 text-center">
        <div className={`date${isSelected ? ' date-active' : ''}`}>
          <span>{data}</span>
        </div>
        {firstFourSchedule.map((item, idx) => {
          const key = idx;
          return <div className="cal-time" key={key}>{item.time}</div>;
        })}
      </div>
    </div>
  );
}

export default CalendarDate;
