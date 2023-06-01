import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import reserveImage from '../../assets/reserve.png';
import { URL_BOOKING } from '../../../../constants/urls';

function SectionBook() {
  const navigate = useNavigate();
  const handleBook = () => navigate(URL_BOOKING);

  return (
    <div className="d-flex justify-content-between align-items-center py-5 px-4">
      <img src={reserveImage} alt="reserve" height={450} className="my-5" />
      <div className="text-center w-75">
        <h2>Click Here to book</h2>
        <Button variant="main" size="lg" className="btn-circle mt-2" onClick={handleBook}>Book Now</Button>
      </div>
    </div>
  );
}

export default SectionBook;
