import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import {
  URL_BOOKING,
  URL_BOOKING_HISTORY,
  URL_BOOKING_LIST,
  URL_NOT_FOUND,
  URL_HOME,
  URL_LOGIN,
  URL_MANAGE_ACCOUNT,
  URL_USER_LIST,
  URL_EDIT_USER_ROUTE,
  URL_ADD_USER,
  URL_SCHEDULE,
} from './constants/urls';

import { UserProvider } from './contexts/UserContext';

import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import Home from './routes/Home';
import Booking from './routes/Booking';
import BookingHistory from './routes/BookingHistory';
import BookingList from './routes/BookingList';
import Schedule from './routes/Schedule';
import Login from './routes/Login';
import ManageAccount from './routes/ManageAccount';
import UserList from './routes/UserList';
import AddUser from './routes/AddUser';
import EditUser from './routes/EditUser';
import NotFound from './routes/NotFound';
import { AxiosInstanceProvider } from './contexts/AxiosContext';
import { BACKEND_URL } from './constants';

import { getAccessToken } from './helpers/storage';

// untuk define routes yang available
export const URL_ROUTES = [
  {
    key: 'Home Page', path: URL_HOME, element: <Home />,
  },
  {
    key: 'Boooking Page', path: URL_BOOKING, element: <Booking />,
  },
  {
    key: 'Booking List Page', path: URL_BOOKING_LIST, element: <BookingList />,
  },
  {
    key: 'Booking History Page', path: URL_BOOKING_HISTORY, element: <BookingHistory />,
  },
  {
    key: 'Schedule Page', path: URL_SCHEDULE, element: <Schedule />,
  },
  {
    key: 'Login Page', path: URL_LOGIN, element: <Login />,
  },
  {
    key: 'Manage Account Page', path: URL_MANAGE_ACCOUNT, element: <ManageAccount />,
  },
  {
    key: 'User List Page', path: URL_USER_LIST, element: <UserList />,
  },
  {
    key: 'Add User Page', path: URL_ADD_USER, element: <AddUser />,
  },
  {
    key: 'Edit User Page', path: URL_EDIT_USER_ROUTE, element: <EditUser />,
  },
  {
    key: 'Not Found Page', path: URL_NOT_FOUND, element: <NotFound />,
  },
];

// Request Interceptor untuk masukin token ke dalam header di tiap request
const requestInterceptors = [
  (config) => {
    const token = getAccessToken();
    const authToken = token ? `Bearer ${token}` : '';
    return { ...config, headers: { Authorization: authToken } };
  },
];

const axiosConfig = {
  config: { baseURL: BACKEND_URL },
  requestInterceptors,
};

function Routing() {
  return (
    <AxiosInstanceProvider {...axiosConfig}>
      <Router>
        <ScrollToTop />
        <UserProvider>
          <Header />
          <Routes>
            {URL_ROUTES.map((routeData) => <Route exact {...routeData} />)}
            <Route
              path="*"
              element={<Navigate to={URL_NOT_FOUND} replace />}
            />
          </Routes>
          <Footer />
        </UserProvider>
      </Router>
    </AxiosInstanceProvider>
  );
}

export default Routing;
