import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { URL_USER_LIST } from '../../constants/urls';
import UserForm from '../../components/UserForm';
import Loading from '../../components/Loading';
import useAxios from '../../hooks/useAxios';

import { API_DELETE_STAFF, API_EDIT_STAFF, API_GET_STAFF } from '../../constants/api';
import Error from '../../components/Error';

function EditUser() {
  const { id } = useParams();
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const isSubmit = useRef(true);
  isSubmit.current = true;

  const { response, isLoading: isLoadingGetUser, error: errGetUser } = useAxios({
    url: `${API_GET_STAFF}/${id}`,
    method: 'GET',
  });

  const { isLoading: isLoadingEdit, request, error: errUpdate } = useAxios({
    url: `${API_EDIT_STAFF}/${id}`,
    method: 'POST',
    isLazy: true,
  });

  const { isLoading: isLoadingDelete, request: requestDelete, error: errDelete } = useAxios({
    url: `${API_DELETE_STAFF}/${id}`,
    method: 'POST',
    isLazy: true,
  });

  useEffect(() => {
    const user = { ...response?.data };
    setUserData({
      id: user.id || 0,
      name: user.username || '',
      email: user.email || '',
      phone: user.phone_number || '',
      address: user.address || '',
    });
  }, [id, response]);

  const handleSendData = async (data) => {
    isSubmit.current = true;
    const { isSuccess } = await request({
      payload: {
        clinic_name: data.name,
        email: data.email,
        phone_number: data.phone,
        address: data.address,
      },
    });
    if (isSuccess) {
      setTimeout(() => {
        navigate(URL_USER_LIST);
      }, 1500);
    }
    return isSuccess;
  };

  const handleOnDelete = async () => {
    isSubmit.current = false;
    const { isSuccess } = await requestDelete();
    if (isSuccess) {
      setTimeout(() => {
        navigate(URL_USER_LIST);
      }, 1500);
    }
    return isSuccess;
  };

  if (isLoadingGetUser) {
    return (
      <Loading />
    );
  }

  if (errGetUser) {
    return (
      <div className="content d-flex align-items-center justify-content-center">
        <Error title="Error" subtitle={errGetUser} />
      </div>
    );
  }

  return (
    <div className="content px-4">
      <UserForm
        onSubmit={handleSendData}
        data={userData}
        onDelete={handleOnDelete}
        isEdit
        isLoadingFirst={isLoadingDelete}
        isLoadingSecond={isLoadingEdit}
        errorResponse={isSubmit.current ? errUpdate : errDelete}
      />
    </div>
  );
}

export default EditUser;
