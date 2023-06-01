import { useContext, useState } from 'react';

import ListLayout from '../Layout/ListLayout';
import Loading from '../Loading';
import NoBook from '../NoBook';
import { BOOKING_MODE } from './constant';
import CardDetail from './CardDetail';
import CardList from './CardList';
import useAxios from '../../hooks/useAxios';
import { API_GET_TICKETS } from '../../constants/api';
import { UserContext } from '../../contexts/UserContext';
import ROLES from '../../constants/roles';
import Error from '../Error';
import { BE_BOOK_STATUS, normalizeBooking } from '../../helpers/normalizeBooking';

const constructUrl = (role, mode) => {
  const urlParams = mode === BOOKING_MODE.ONGOING ? `?status=${BE_BOOK_STATUS.ONGOING}` : `?status=${BE_BOOK_STATUS.EXP},${BE_BOOK_STATUS.PAID}`;
  if (role === ROLES.STAFF) return `/staff${API_GET_TICKETS}${urlParams}`;
  return `${API_GET_TICKETS}${urlParams}`;
};

function Booking(props) {
  const { mode = BOOKING_MODE.ONGOING } = props;
  const { userData } = useContext(UserContext);

  const { response, isLoading, error } = useAxios({
    url: constructUrl(userData.role, mode),
    method: 'GET',
  });

  const list = normalizeBooking(response);
  const prefix = mode === BOOKING_MODE.ONGOING ? 'ON GOING LIST' : 'DONE LIST';
  const [selectedData, setSelectedData] = useState();

  const handleReloadPage = () => {
    window.location.reload();
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="content d-flex align-items-center justify-content-center">
        <Error title="Error" subtitle={error} />
      </div>
    );
  }

  if (list.length === 0) {
    return (
      <div className="content">
        <NoBook />
      </div>
    );
  }

  if (selectedData) {
    return (
      <div className="content">
        <ListLayout title={`${prefix} - DETAILS`}>
          <CardDetail data={selectedData} mode={mode} onReload={handleReloadPage} />
        </ListLayout>
      </div>
    );
  }

  return (
    <div className="content">
      <ListLayout title={prefix}>
        {list.map((item) => {
          const { id } = item;
          return (
            <CardList
              mode={mode}
              data={item}
              key={id}
              onClickDetail={() => setSelectedData(item)}
            />
          );
        })}
      </ListLayout>
    </div>
  );
}

export default Booking;
