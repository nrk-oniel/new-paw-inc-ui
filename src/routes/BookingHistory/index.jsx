import Booking from '../../components/Booking';
import { BOOKING_MODE } from '../../components/Booking/constant';

function BookingHistory() {
  return (
    <Booking mode={BOOKING_MODE.HIST} />
  );
}

export default BookingHistory;
