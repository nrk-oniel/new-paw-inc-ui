import { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import PasswordInput from '../../components/Form/PasswordInput';
import { UserContext } from '../../contexts/UserContext';
import useFormData from '../../hooks/useFormData';
import useAxios from '../../hooks/useAxios';
import { API_LOGIN } from '../../constants/api';
import ButtonWithLoad from '../../components/ButtonWithLoad';
import { setAccessToken } from '../../helpers/storage';
import { URL_HOME } from '../../constants/urls';

const INITIAL_VALUE = {
  username: '',
  password: '',
};

function Login() {
  const navigate = useNavigate();
  const { isLoading, request, error: errorResponse } = useAxios({
    url: API_LOGIN,
    method: 'POST',
    isLazy: true,
  });
  const { storeUserFromBE } = useContext(UserContext);
  const {
    formValue, formError, setValue,
  } = useFormData({ initialValue: INITIAL_VALUE });

  const doLogin = async () => {
    const { data, error: err } = await request({
      payload: {
        username: formValue.username,
        password: formValue.password,
      },
    });
    if (!err) {
      const { access_token: accessToken, user } = data;
      setAccessToken(accessToken);
      storeUserFromBE(user);
      navigate(URL_HOME);
    }
  };

  return (
    <div className="content d-flex justify-content-center">
      <div className="mt-5 w-50 d-flex justify-content-center">
        <Form className="w-100">
          <Form.Group className="mb-2">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" className="form-control-square" value={formValue.username} onChange={(e) => setValue('username', e.target.value)} />
            {formError?.username && <span className="text-danger">Please Fill Username</span>}
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Password</Form.Label>
            <PasswordInput value={formValue.password} onChange={(e) => setValue('password', e.target.value)} />
            {formError?.password && <span className="text-danger">Please Fill Password</span>}
          </Form.Group>
          {errorResponse && <span className="text-danger">{errorResponse}</span>}
          <div className="text-end mt-3">
            <ButtonWithLoad isLoading={isLoading} variant="main" className="px-5" onClick={doLogin}>Login</ButtonWithLoad>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
