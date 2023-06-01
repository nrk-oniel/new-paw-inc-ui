const validateSchedule = (data) => {
  const error = {};
  if (!data.doctor) error.doctor = true;
  if (!data.time) error.time = true;

  if (Object.keys(error).length) return error;
  return undefined;
};

export default validateSchedule;
