import { useEffect } from 'react';
import { Form } from 'react-bootstrap';

import { usePlacesWidget } from 'react-google-autocomplete';
import useFormData from '../../hooks/useFormData';
import useActionModal from '../../hooks/useActionModal';
import ActionModal from '../../hooks/useActionModal/ActionModal';
import validateUser from './helpers/validateUser';
import Heading from '../Heading';
import ButtonForm from '../Form/ButtonForm';
import { MAPS_API_KEY } from '../../constants/map';

const INITIAL_VALUE = {
  name: '',
  email: '',
  phone: '',
  address: '',
};

function UserForm(props) {
  const {
    data, onSubmit, onRefresh, isEdit = false,
    onDelete, isLoadingFirst, isLoadingSecond, errorResponse,
  } = props;
  const {
    formValue, formError, setValue, setFormError, setFormValue,
  } = useFormData({ initialValue: INITIAL_VALUE });
  const { onTriggerSubmit, modalProps } = useActionModal({ onOk: () => onSubmit(formValue) });
  const {
    onTriggerSubmit: onTriggerDelete,
    modalProps: deleteModalProps,
  } = useActionModal({ onOk: onDelete });

  useEffect(() => {
    if (data) setFormValue(data);
  }, [data]);

  const handleOnClickSubmit = () => {
    const error = validateUser(formValue);
    if (error) setFormError(error);
    else onTriggerSubmit();
  };

  const { ref } = usePlacesWidget({
    apiKey: MAPS_API_KEY,
    onPlaceSelected: (place) => {
      // console.log(place.formatted_address);
      setValue('address', place.formatted_address);
      // console.log(place.formatted_address);
    },
    options: {
      types: ['address'],
      componentRestrictions: { country: 'id' },
    },
  });

  const title = isEdit ? 'Edit User' : 'Add New User';
  const titleModal = isEdit ? 'EDIT USER ACCOUNT' : 'ADD A NEW USER';
  const firstButtonText = isEdit ? 'Delete' : 'Refresh';
  const onFirstClick = () => {
    if (isEdit) {
      onTriggerDelete();
    } else {
      onRefresh();
    }
  };

  return (
    <>
      <Form className="mb-5">
        <Heading title={title} />
        <Form.Group className="mb-2">
          <Form.Label>Clinic Name</Form.Label>
          <Form.Control type="text" className="form-control-square" value={formValue.name} onChange={(e) => setValue('name', e.target.value)} />
          {formError?.name && <span className="text-danger">Please Fill Clinic Name</span>}
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" className="form-control-square" value={formValue.email} onChange={(e) => setValue('email', e.target.value)} />
          {formError?.email && <span className="text-danger">Please Fill Email</span>}
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" className="form-control-square" value={formValue.phone} onChange={(e) => setValue('phone', e.target.value)} />
          {formError?.phone && <span className="text-danger">Please Fill Phone Number</span>}
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Address</Form.Label>
          <Form.Control ref={ref} type="text" className="form-control-square" value={formValue.address} onChange={(e) => setValue('address', e.target.value)} />
          {formError?.address && <span className="text-danger">Please Fill Address</span>}
        </Form.Group>
        {errorResponse && <span className="text-danger">{errorResponse}</span>}
        <ButtonForm
          onClickFirst={onFirstClick}
          firstText={firstButtonText}
          onClickSecond={handleOnClickSubmit}
          firstLoading={isLoadingFirst}
          secondLoading={isLoadingSecond}
        />
      </Form>
      <ActionModal
        confirmText={`ARE YOU SURE YOU WANT TO ${titleModal}?`}
        failedText="FAILED TO SUBMIT DATA"
        successText="SUCCESS SUBMIT DATA"
        modalProps={modalProps}
        secondLoading={isLoadingSecond}
      />
      <ActionModal
        confirmText="ARE YOU SURE YOU WANT TO DELETE THIS USER ACCOUNT?"
        failedText="FAILED TO DELETE ACCOUNT"
        successText="SUCCESS DELETE ACCOUNT"
        modalProps={deleteModalProps}
        secondLoading={isLoadingFirst}
      />
    </>
  );
}

export default UserForm;
