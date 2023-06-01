import Booking from '../../components/Booking';
import { BOOKING_MODE } from '../../components/Booking/constant';

function BookingList() {
  return (
    <Booking mode={BOOKING_MODE.ONGOING} />
  );
}

export default BookingList;
