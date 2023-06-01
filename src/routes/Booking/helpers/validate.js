const validateBooking = (data) => {
  const error = {};
  if (!data.type) error.type = true;
  if (!data.symptoms) error.symptoms = true;
  if (!data.clinic?.id) error.clinic = true;
  if (!data.schedule?.id) error.schedule = true;

  if (Object.keys(error).length) return error;
  return undefined;
};

export default validateBooking;
