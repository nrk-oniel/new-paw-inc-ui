import { Col, Form, Row } from 'react-bootstrap';

import Heading from '../../../../components/Heading';
import PasswordInput from '../../../../components/Form/PasswordInput';
import ButtonForm from '../../../../components/Form/ButtonForm';

import useActionModal from '../../../../hooks/useActionModal';
import ActionModal from '../../../../hooks/useActionModal/ActionModal';
import useFormData from '../../../../hooks/useFormData';
import validatePassword from '../../helpers/validatePassword';
import useAxios from '../../../../hooks/useAxios';
import { API_UPDATE_PASSWORD } from '../../../../constants/api';

const INITIAL_VALUE = {
  old: '',
  new: '',
};

function PasswordUpdate() {
  const {
    formValue, formError, setValue, setFormError,
  } = useFormData({ initialValue: INITIAL_VALUE });
  const { error: errorResponse, isLoading, request } = useAxios({
    url: API_UPDATE_PASSWORD,
    method: 'POST',
    isLazy: true,
  });

  const sendToBackend = async () => {
    const { isSuccess } = await request({
      payload: {
        old_password: formValue.old,
        new_password: formValue.new,
      },
    });
    return isSuccess;
  };

  const { onTriggerSubmit, modalProps } = useActionModal({
    onOk: sendToBackend,
  });

  const handleOnClickRefresh = () => {
    window.location.reload(true);
  };

  const handleOnClickSubmit = () => {
    const error = validatePassword(formValue);
    if (error) setFormError(error);
    else onTriggerSubmit();
  };

  return (
    <>
      <Form className="mb-5">
        <Heading title="Update Password" />
        <Row>
          <Col>
            <Form.Group className="mb-2">
              <Form.Label>Old Password</Form.Label>
              <PasswordInput value={formValue.old} onChange={(e) => setValue('old', e.target.value)} />
              {formError?.old && <span className="text-danger">Please Fill Old Password</span>}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-2">
              <Form.Label>New Password</Form.Label>
              <PasswordInput value={formValue.new} onChange={(e) => setValue('new', e.target.value)} />
              {formError?.new && <span className="text-danger">Please Fill New Password</span>}
            </Form.Group>
          </Col>
        </Row>
        {errorResponse && <span className="text-danger">{errorResponse}</span>}
        <ButtonForm isLoading={isLoading} onClickFirst={handleOnClickRefresh} firstText="Refresh" onClickSecond={handleOnClickSubmit} />
      </Form>
      <ActionModal
        confirmText="ARE YOU SURE YOU WANT TO CHANGE PASSWORD ?"
        failedText="FAILED TO UPDATE PASSWORD"
        successText="SUCCESS UPDATE PASSWORD"
        modalProps={modalProps}
        secondLoading={isLoading}
      />
    </>
  );
}

export default PasswordUpdate;
