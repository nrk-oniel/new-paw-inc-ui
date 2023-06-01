import { Card } from 'react-bootstrap';
import BookingDetail from '../BookingDetail';
import TableDetail from '../TableDetail';

function CardDetail(props) {
  const { data, mode, onReload } = props;

  return (
    <Card className="mb-4 pt-3 pb-4">
      <Card.Body>
        <div className="pb-2">
          <h4>CONSULTATION</h4>
        </div>
        <BookingDetail data={data} mode={mode} />
        <div className="pt-5">
          <TableDetail data={data} mode={mode} onReload={onReload} />
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardDetail;
