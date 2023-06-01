const validatePassword = (data) => {
  const error = {};
  if (!data.old) error.old = true;
  if (!data.new) error.new = true;

  if (Object.keys(error).length) return error;
  return undefined;
};

export default validatePassword;
