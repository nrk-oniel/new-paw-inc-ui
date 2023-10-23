import { Col, Row } from 'react-bootstrap';
import { BOOKING_STATUS } from '../../../helpers/normalizeBooking';
import { BOOKING_MODE } from '../constant';

const MAP_COLOR_BOOK = {
  [BOOKING_STATUS.ONGOING]: '#735AB8',
  [BOOKING_STATUS.EXP]: '#FF0000',
  [BOOKING_STATUS.PAID]: '#211E1E',
};

function BookingDetail(props) {
  const { data, mode } = props;
  // console.log(data);
  return (
    <Row>
      <Col>
        <Row>
          <Col>Ticket Number</Col>
          <Col>{`: ${data.id}`}</Col>
        </Row>
        <Row>
          <Col>Status</Col>
          <Col style={{ color: MAP_COLOR_BOOK[data.status] }}>{`: ${data.status}`}</Col>
        </Row>
      </Col>
      <Col>
        <Row>
          <Col>Booking Date</Col>
          <Col>{`: ${data.details.date}`}</Col>
        </Row>
        <Row>
          <Col>Location</Col>
          <Col>{`: ${data.clinic.name}`}</Col>
        </Row>
      </Col>
      {Boolean(mode === BOOKING_MODE.HIST && data.status !== 'EXPIRED') && (
        <Col>
          <Row>
            <Col>Payment Date</Col>
            <Col>{`: ${data.payment.date}`}</Col>
          </Row>
        </Col>
      )}
    </Row>
  );
}

export default BookingDetail;
