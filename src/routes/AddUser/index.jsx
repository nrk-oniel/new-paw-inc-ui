import { useNavigate } from 'react-router-dom';
import { URL_USER_LIST } from '../../constants/urls';
import UserForm from '../../components/UserForm';
import useAxios from '../../hooks/useAxios';
import { API_ADD_STAFF } from '../../constants/api';

function AddUser() {
  const navigate = useNavigate();

  const { isLoading, request, error: errAdd } = useAxios({
    url: API_ADD_STAFF,
    method: 'POST',
    isLazy: true,
  });

  const handleSendData = async (data) => {
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

  const handleOnClickRefresh = () => {
    window.location.reload(true);
  };

  return (
    <div className="content px-4">
      <UserForm
        onSubmit={handleSendData}
        onRefresh={handleOnClickRefresh}
        isLoadingFirst={false}
        isLoadingSecond={isLoading}
        errorResponse={errAdd}
      />
    </div>
  );
}

export default AddUser;
