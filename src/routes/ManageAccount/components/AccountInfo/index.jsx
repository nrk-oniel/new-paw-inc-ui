import { useContext, useEffect } from 'react';
import { Form } from 'react-bootstrap';

import { usePlacesWidget } from 'react-google-autocomplete';
import { UserContext } from '../../../../contexts/UserContext';

import Heading from '../../../../components/Heading';
import ROLES from '../../../../constants/roles';
import useActionModal from '../../../../hooks/useActionModal';
import ActionModal from '../../../../hooks/useActionModal/ActionModal';
import ButtonForm from '../../../../components/Form/ButtonForm';
import useFormData from '../../../../hooks/useFormData';
import validateAccountInfo from '../../helpers/validateAccountInfo';
import useAxios from '../../../../hooks/useAxios';
import { API_UPDATE_PROFILE } from '../../../../constants/api';
import { MAPS_API_KEY } from '../../../../constants/map';

const INITIAL_VALUE = {
  name: '',
  email: '',
  phone: '',
  address: '',
};

function AccountInfo() {
  const {
    formValue, formError, setValue, setFormError, setFormValue,
  } = useFormData({ initialValue: INITIAL_VALUE });
  const { userData } = useContext(UserContext);
  const { error: errorResponse, isLoading, request } = useAxios({
    url: API_UPDATE_PROFILE,
    method: 'POST',
    isLazy: true,
  });

  const sendToBackend = async () => {
    const commonData = {
      email: formValue.email,
      phone_number: formValue.phone,
      address: formValue.address,
    };

    // kalau role cust masukin username
    // kalau role staff masukin clinic name
    const { isSuccess } = await request({
      payload: {
        ...commonData,
        ...(userData.role === ROLES.CUST && { username: formValue.name }),
        ...(userData.role === ROLES.STAFF && { clinic_name: formValue.name }),
      },
    });
    return isSuccess;
  };
  const { onTriggerSubmit, modalProps } = useActionModal({
    onOk: sendToBackend,
  });

  useEffect(() => {
    setFormValue({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
    });
  }, [userData]);

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

  const handleOnClickRefresh = () => {
    window.location.reload(true);
  };

  const handleOnClickSubmit = () => {
    const error = validateAccountInfo(formValue);
    if (error) setFormError(error);
    else onTriggerSubmit();
  };

  const accountInfoField = userData.role === ROLES.STAFF ? 'Clinic Name' : 'Username';

  return (
    <>
      <Form className="mb-5">
        <Heading title="Account Information" />
        <Form.Group className="mb-2">
          <Form.Label>{accountInfoField}</Form.Label>
          <Form.Control type="text" className="form-control-square" value={formValue.name} onChange={(e) => setValue('name', e.target.value)} />
          {formError?.name && <span className="text-danger">{`Please Fill ${accountInfoField}`}</span>}
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
        <ButtonForm secondLoading={isLoading} onClickFirst={handleOnClickRefresh} firstText="Refresh" onClickSecond={handleOnClickSubmit} />
      </Form>
      <ActionModal
        confirmText="ARE YOU SURE YOU WANT TO UPDATE YOUR ACCOUNT INFORMATION ?"
        failedText="FAILED TO UPDATE DATA"
        successText="SUCCESS UPDATE DATA"
        modalProps={modalProps}
        secondLoading={isLoading}
      />
    </>
  );
}

export default AccountInfo;
