import {
  Col, Form, Modal, Row,
} from 'react-bootstrap';
import { getDateString } from '../../helpers';
import useFormData from '../../../../hooks/useFormData';
import useActionModal from '../../../../hooks/useActionModal';
import ActionModal from '../../../../hooks/useActionModal/ActionModal';

import imageDoctor from '../../../../assets/doctor.png';
import validateSchedule from './helpers/validate';
import useAxios from '../../../../hooks/useAxios';
import { API_ADD_SCHEDULE } from '../../../../constants/api';
import ButtonWithLoad from '../../../../components/ButtonWithLoad';

const INITIAL_VALUE = {
  doctor: '',
  time: '',
};

function ModalAddSchedule(props) {
  const { show, onHide, selectedDate } = props;
  const {
    formValue, formError, setValue, setFormError,
  } = useFormData({ initialValue: INITIAL_VALUE });

  const { error: errorResponse, isLoading, request } = useAxios({
    url: API_ADD_SCHEDULE,
    method: 'POST',
    isLazy: true,
  });

  const sendToBackend = async () => {
    const { date, month, year } = selectedDate;
    const { time, doctor } = formValue;

    const [hour, minute] = time.split(':');

    const { isSuccess } = await request({
      payload: {
        year,
        // +1 karena januari = 0
        month: month + 1,
        date,
        hour,
        minute,
        doctor_name: doctor,
      },
    });
    if (isSuccess) {
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
    return isSuccess;
  };
  const { onTriggerSubmit, modalProps } = useActionModal({
    onOk: sendToBackend,
  });

  const onClickSubmit = () => {
    const error = validateSchedule(formValue);
    if (error) setFormError(error);
    else onTriggerSubmit();
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={onHide}
        centered
      >
        <Modal.Body className="px-4 py-5">
          <h5 className="fw-bold mb-4 text-main">{getDateString(selectedDate)}</h5>
          <Form.Group className="mb-4">
            <Row>
              <Col xs="7">
                <Form.Label>Doctor on duty</Form.Label>
                <Form.Control required type="text" className="form-control-square" value={formValue.doctor} onChange={(e) => setValue('doctor', e.target.value)} />
                {formError?.doctor && <span className="text-danger">Please Fill Doctor</span>}
              </Col>
              <Col xs="5">
                <Form.Label>Time</Form.Label>
                <Form.Control required type="time" className="form-control-square" value={formValue.time} onChange={(e) => setValue('time', e.target.value)} />
                {formError?.time && <span className="text-danger">Please Select Time</span>}
              </Col>
            </Row>
          </Form.Group>
          {errorResponse && <span className="text-danger">{errorResponse}</span>}
          <div className="text-center">
            <ButtonWithLoad isLoading={isLoading} variant="main" className="px-5 btn-square" onClick={onClickSubmit}>Add Schedule</ButtonWithLoad>
          </div>
        </Modal.Body>
      </Modal>
      <ActionModal
        confirmImage={imageDoctor}
        confirmText="ARE YOU SURE YOU WANT TO SUBMIT THIS FORM?"
        failedText="FAILED TO SUBMIT DATA"
        successText="SUCCESS SUBMIT DATA"
        modalProps={modalProps}
        secondLoading={isLoading}
      />
    </div>
  );
}

export default ModalAddSchedule;
