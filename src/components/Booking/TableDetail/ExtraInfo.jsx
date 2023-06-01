import { useContext } from 'react';

import { UserContext } from '../../../contexts/UserContext';
import ROLES from '../../../constants/roles';
import { BOOKING_MODE } from '../constant';
import { BOOKING_STATUS } from '../../../helpers/normalizeBooking';
import StaffActionInfo from './StaffActionInfo';

const STAFF_DONE_WORDING = {
  [BOOKING_STATUS.EXP]: 'The ticket has been rejected!',
  [BOOKING_STATUS.PAID]: 'This ticket has been paid!',
};

const DEFAULT_CONTAINER_PROPS = {
  className: 'p-4 text-center',
  style: { backgroundColor: '#D9D9D9' },
};

function ExtraInfo(props) {
  const { mode, data, onReload } = props;
  const { userData } = useContext(UserContext);
  const { role } = userData;
  const { status } = data;

  if (role === ROLES.CUST) {
    if (mode === BOOKING_MODE.ONGOING) {
      return (
        <div {...DEFAULT_CONTAINER_PROPS}>
          <h4>Please come 30 minutes before the booking schedule !</h4>
          <p className="text-muted m-0">The Booking Ticket will get expired after 15 Minutes Late</p>
        </div>
      );
    }

    if (status === BOOKING_STATUS.EXP) {
      return (
        <div {...DEFAULT_CONTAINER_PROPS}>
          <h4>Your ticket has been canceled !</h4>
          <p className="text-muted m-0">Please do contact our helpdesk for further information</p>
        </div>
      );
    }

    if (status === BOOKING_STATUS.PAID) {
      return (
        <div {...DEFAULT_CONTAINER_PROPS}>
          <h4>Thankyou for your visit !</h4>
        </div>
      );
    }
  }

  if (role === ROLES.STAFF) {
    if (mode === BOOKING_MODE.ONGOING) {
      return <StaffActionInfo onReload={onReload} data={data} />;
    }

    return (
      <div {...DEFAULT_CONTAINER_PROPS}>
        <h4>{STAFF_DONE_WORDING[status]}</h4>
      </div>
    );
  }

  return null;
}

export default ExtraInfo;
