import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Heading from '../../../../components/Heading';
import { getDateString, getKey } from '../../helpers';
import TimeDetail from './components/TimeDetail';
import ModalAddSchedule from '../ModalAddSchedule';

function Details(props) {
  const { selectedDate, data } = props;
  const [showModal, setShowModal] = useState(false);

  const dataKey = getKey(selectedDate);
  const schedules = data[dataKey];

  return (
    <>
      <Heading title="Details" />
      <div className="d-flex justify-content-between">
        <h4 className="my-3">{getDateString(selectedDate)}</h4>
        <Button variant="second" className="btn-circle" style={{ color: '#55097D' }} onClick={() => setShowModal(true)}>
          <FontAwesomeIcon icon={faPlus} style={{ marginRight: '10px' }} />
          Create
        </Button>
      </div>
      {schedules?.length ? (
        <>
          {schedules.map((item, idx) => {
            const key = `Detail-${item.time}-${idx}`;
            return <TimeDetail key={key} time={item.time} doctors={item.doctors} />;
          })}
        </>
      ) : (
        <div className="my-3">No Schedule Found</div>
      )}
      <ModalAddSchedule
        selectedDate={selectedDate}
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </>
  );
}

export default Details;
