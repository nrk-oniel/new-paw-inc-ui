/* eslint-disable max-len */
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import reserveImage from '../../assets/reserve.png';
import { URL_BOOKING } from '../../../../constants/urls';

function SectionBook() {
  const navigate = useNavigate();
  const handleBook = () => navigate(URL_BOOKING);

  return (
    <div className="row">
      <div className="col">
        <img src={reserveImage} alt="reserve" className="my-5 img-fluid" />
      </div>
      <div className="col text-center my-auto">
        <div className="w-100 h-100 ">
          <h2>Click Here to Book</h2>
          <Button
            variant="main"
            size="lg"
            className="btn-circle mt-2"
            onClick={handleBook}
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SectionBook;
