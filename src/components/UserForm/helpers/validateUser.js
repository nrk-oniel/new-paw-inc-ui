const validateUser = (data) => {
  const error = {};
  if (!data.name) error.name = true;
  if (!data.email) error.email = true;
  if (!data.phone) error.phone = true;
  if (!data.address) error.address = true;

  if (Object.keys(error).length) return error;
  return undefined;
};

export default validateUser;
