/* eslint-disable no-alert */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { usePlacesWidget } from 'react-google-autocomplete';

import PasswordInput from '../../components/Form/PasswordInput';
import useFormData from '../../hooks/useFormData';
import useAxios from '../../hooks/useAxios';
import { API_REGISTER } from '../../constants/api';
import ButtonWithLoad from '../../components/ButtonWithLoad';
import { URL_LOGIN } from '../../constants/urls';
import { MAPS_API_KEY } from '../../constants/map';

const INITIAL_VALUE = {
  username: '',
  email: '',
  address: '',
  password: '',
  password_confirmation: '',
};

function Register() {
  const navigate = useNavigate();
  const { isLoading, request, error: errorResponse } = useAxios({
    url: API_REGISTER,
    method: 'POST',
    isLazy: true,
  });
  const { formValue, formError, setValue } = useFormData({ initialValue: INITIAL_VALUE });

  const doRegister = async () => {
    const { error: err } = await request({
      payload: {
        username: formValue.username,
        email: formValue.email,
        address: formValue.address,
        password: formValue.password,
        password_confirmation: formValue.password_confirmation,
      },
    });
    if (!err) {
      alert('Register Success !');
      navigate(URL_LOGIN);
    }
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

  return (
    <div className="content d-flex justify-content-center">
      <div className="mt-5 w-50 d-flex justify-content-center">
        <Form className="w-100">
          {/* Username */}
          <Form.Group className="mb-2">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              className="form-control-square"
              value={formValue.username}
              onChange={(e) => setValue('username', e.target.value)}
            />
            {formError?.username && (
              <span className="text-danger">Please Fill Username</span>
            )}
          </Form.Group>
          {/* Address */}
          <Form.Group className="mb-2">
            <Form.Label>Address</Form.Label>
            <Form.Control
              ref={ref}
              type="text"
              className="form-control-square"
              value={formValue.address}
              onChange={(e) => setValue('address', e.target.value)}
            />
            {formError?.username && (
              <span className="text-danger">Please Fill Address</span>
            )}
          </Form.Group>
          {/* Email */}
          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              className="form-control-square"
              value={formValue.email}
              onChange={(e) => setValue('email', e.target.value)}
            />
            {formError?.email && (
              <span className="text-danger">Please Fill Email</span>
            )}
          </Form.Group>
          {/* Password */}
          <Form.Group className="mb-2">
            <Form.Label>Password</Form.Label>
            <PasswordInput
              value={formValue.password}
              onChange={(e) => setValue('password', e.target.value)}
            />
            {formError?.password && (
              <span className="text-danger">Please Fill Password</span>
            )}
          </Form.Group>
          {/* Password Confirmation */}
          <Form.Group className="mb-2">
            <Form.Label>Reenter your password</Form.Label>
            <PasswordInput
              value={formValue.password_confirmation}
              onChange={(e) => setValue('password_confirmation', e.target.value)}
            />
            {formError?.password_confirmation && (
              <span className="text-danger">
                Please Reenter the right password !
              </span>
            )}
          </Form.Group>
          {errorResponse && (
            <span className="text-danger">{errorResponse}</span>
          )}
          <div className="text-end mt-3">
            <ButtonWithLoad
              isLoading={isLoading}
              variant="main"
              className="px-5"
              onClick={doRegister}
            >
              Register
            </ButtonWithLoad>
          </div>
          <h4 className="text-center">
            {' '}
            Already have an account ?
            {' '}
            <Link to={URL_LOGIN}>
              Login Here
            </Link>
            {' '}
          </h4>
        </Form>
      </div>
    </div>
  );
}

export default Register;
