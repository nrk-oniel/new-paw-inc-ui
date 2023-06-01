import { useState } from 'react';

function useFormData(props) {
  const { initialValue } = props;
  const [formValue, setFormValue] = useState(initialValue);
  const [formError, setFormError] = useState({});

  const setValue = (key, value) => {
    setFormValue((prev) => ({
      ...prev,
      [key]: value,
    }));
    setFormError((prev) => ({
      ...prev,
      [key]: false,
    }));
  };

  return {
    setValue,
    formValue,
    formError,
    setFormValue,
    setFormError,
  };
}

export default useFormData;
