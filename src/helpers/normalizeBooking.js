import { MONTHS } from '../routes/Schedule/constants';

export const BOOKING_STATUS = {
  ONGOING: 'ON GOING',
  EXP: 'EXPIRED',
  PAID: 'PAID',
};

export const BE_BOOK_STATUS = {
  ONGOING: 1,
  EXP: 0,
  PAID: 2,
};

const mapBooking = (status) => {
  if (status === BE_BOOK_STATUS.ONGOING) return BOOKING_STATUS.ONGOING;
  if (status === BE_BOOK_STATUS.PAID) return BOOKING_STATUS.PAID;
  return BOOKING_STATUS.EXP;
};

export const normalizeBooking = (response) => {
  const ticketList = response?.data || [];

  const bookings = ticketList.map((item) => {
    const ticket = { ...item };
    const clinic = { ...ticket.clinic };
    const schedule = { ...ticket.schedule };

    const monthIdx = schedule.month - 1;
    const dateString = `${schedule.date} ${MONTHS[monthIdx]} ${schedule.year}`;

    // untuk pisahin data dari format 'YYYY-MM-DD'
    const [year, month, date] = ticket.status_update_date.split('-');
    const paymentDate = `${date} ${MONTHS[Number(month) - 1]} ${year}`;

    const time = `${schedule.hour}`.padStart(2, '0');
    const minute = `${schedule.hour}`.padStart(2, '0');

    return {
      id: ticket.id || 0,
      status: mapBooking(+ticket.status),
      clinic: {
        name: clinic.clinic_name || '',
        address: clinic.clinic_address || '',
      },
      details: {
        type: ticket.pet_type || '',
        symtoms: ticket.symptoms || '',
        date: dateString,
        time: `${time}:${minute} WIB`,
        doctor: schedule.doctor_name || '',
      },
      payment: {
        date: paymentDate,
      },
    };
  });
  return bookings;
};
