import { Form } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
import useActionModal from '../../hooks/useActionModal';
import ActionModal from '../../hooks/useActionModal/ActionModal';

import imageDoctor from '../../assets/doctor.png';
import PetDetails from './components/PetDetails';
import PetClinic from './components/PetClinic';
import BookingSchedule from './components/BookingSchedule';
import ButtonForm from '../../components/Form/ButtonForm';
import validateBooking from './helpers/validate';
import useFormData from '../../hooks/useFormData';
import useAxios from '../../hooks/useAxios';
import { API_CREATE_BOOKING } from '../../constants/api';
import { URL_BOOKING_LIST } from '../../constants/urls';

const INITIAL_VALUE = {
  type: '',
  symptoms: '',
  clinic: null,
  schedule: null,
};

function Booking() {
  const navigate = useNavigate();
  const {
    formValue, formError, setValue, setFormError,
  } = useFormData({ initialValue: INITIAL_VALUE });
  const { isLoading, request, error: errorResponse } = useAxios({
    url: API_CREATE_BOOKING,
    method: 'POST',
    isLazy: true,
  });

  const handleSendData = async () => {
    const { isSuccess } = await request({
      payload: {
        clinic_id: formValue.clinic?.id || 0,
        schedule_id: formValue.schedule?.id || 0,
        pet_type: formValue.type,
        symptoms: formValue.symptoms,
      },
    });
    if (isSuccess) {
      setTimeout(() => {
        navigate(URL_BOOKING_LIST);
      }, 1500);
    }
    return isSuccess;
  };

  const { onTriggerSubmit, modalProps } = useActionModal({
    onOk: handleSendData,
  });

  const onClickSubmit = () => {
    const errValidation = validateBooking(formValue);
    if (errValidation) setFormError(errValidation);
    else onTriggerSubmit();
  };

  return (
    <div className="content px-4">
      <Form>
        <PetDetails setValue={setValue} value={formValue} error={formError} />
        <PetClinic setValue={setValue} value={formValue} error={formError} />
        <BookingSchedule setValue={setValue} value={formValue} error={formError} />
        <ButtonForm onClickSecond={onClickSubmit} secondLoading={isLoading} />
        {errorResponse && <span className="text-danger">{errorResponse}</span>}
        <ActionModal
          confirmImage={imageDoctor}
          confirmText="ARE YOU SURE YOU WANT TO SUBMIT THIS FORM?"
          failedText="FAILED TO SUBMIT DATA"
          successText="SUCCESS SUBMIT DATA"
          modalProps={modalProps}
          secondLoading={isLoading}
        />
      </Form>
    </div>
  );
}

export default Booking;
