import ROLES from './roles';

export const URL_HOME = '/home';
export const URL_LOGIN = '/login';
export const URL_BOOKING = '/book-schedule';
export const URL_BOOKING_LIST = '/booking-list';
export const URL_BOOKING_HISTORY = '/booking-history';
export const URL_SCHEDULE = '/schedule';
export const URL_USER_LIST = '/user';
export const URL_ADD_USER = '/user/add';
export const URL_EDIT_USER_ROUTE = '/user/edit/:id';
export const URL_EDIT_USER_ACCECSS = '/user/edit/';
export const URL_EDIT_USER = (id) => `/user/edit/${id}`;
export const URL_MANAGE_ACCOUNT = '/manage-account';
export const URL_NOT_FOUND = '/not-found';

// mapping Accessible Pages berdasarkan user role
const PUBLIC_URL = [URL_HOME, URL_NOT_FOUND];
export const ACCESSIBLE_PAGES = {
  [ROLES.DEFAULT]: [...PUBLIC_URL, URL_LOGIN],
  [ROLES.ADM]: [...PUBLIC_URL, URL_USER_LIST, URL_ADD_USER, URL_EDIT_USER_ACCECSS],
  [ROLES.CUST]: [
    ...PUBLIC_URL,
    URL_BOOKING,
    URL_BOOKING_LIST,
    URL_BOOKING_HISTORY,
    URL_MANAGE_ACCOUNT,
  ],
  [ROLES.STAFF]: [
    ...PUBLIC_URL,
    URL_SCHEDULE,
    URL_BOOKING_LIST,
    URL_BOOKING_HISTORY,
    URL_MANAGE_ACCOUNT,
  ],
};

// mapping Navigation menu berdasarkan user role
const HOME_NAV = { label: 'Home', url: URL_HOME };
const BOOK_LIST_NAV = { label: 'Book List', url: URL_BOOKING_LIST };
const BOOK_HISTORY_NAV = { label: 'Book History', url: URL_BOOKING_HISTORY };
export const NAVIGATION = {
  [ROLES.DEFAULT]: [HOME_NAV],
  [ROLES.ADM]: [HOME_NAV, { label: 'User', url: URL_USER_LIST }],
  [ROLES.CUST]: [HOME_NAV, { label: 'Book', url: URL_BOOKING }, BOOK_LIST_NAV, BOOK_HISTORY_NAV],
  [ROLES.STAFF]: [HOME_NAV, { label: 'Schedule', url: URL_SCHEDULE }, BOOK_LIST_NAV, BOOK_HISTORY_NAV],
};
