// AUTH
export const API_LOGIN = '/auth/login';
export const API_GET_PROFILE = '/auth/user-profile';
export const API_UPDATE_PROFILE = '/auth/update';
export const API_UPDATE_PASSWORD = '/auth/password/update';

// ADMIN
export const API_GET_STAFFS = '/staff-list';
export const API_ADD_STAFF = '/staff-register';
export const API_EDIT_STAFF = '/staff-update';
export const API_GET_STAFF = '/staff-show';
export const API_DELETE_STAFF = '/staff-delete';

// STAFF
export const API_APPROVE_TICKET = '/staff/ticket/approve';
export const API_REJECT_TICKET = '/staff/ticket/reject';
export const API_GET_SCHEDULE = '/staff/schedule';
export const API_ADD_SCHEDULE = '/staff/schedule-create';

// CUSTOMER
export const API_CREATE_BOOKING = '/ticket-create';
export const API_FILTER_SCHEDULE = '/schedule/clinic';
export const API_FILTER_CLINIC = '/clinics';

// STAFF AND CUSTOMER
export const API_GET_TICKETS = '/tickets';
