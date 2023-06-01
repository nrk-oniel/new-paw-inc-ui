import {
  Button, Card, Col, Row,
} from 'react-bootstrap';

import BookingDetail from '../BookingDetail';

function CardList(props) {
  const { data, onClickDetail, mode } = props;

  return (
    <Card className="mb-4 pt-3 pb-4">
      <Card.Body>
        <div className="pb-2">
          <h4>CONSULTATION</h4>
        </div>
        <Row>
          <Col xs={10}>
            <BookingDetail data={data} mode={mode} />
          </Col>
          <Col>
            <Button variant="main" className="btn-square" onClick={onClickDetail}>
              Details
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default CardList;
