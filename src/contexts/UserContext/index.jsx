import {
  createContext, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ROLES from '../../constants/roles';
import { ACCESSIBLE_PAGES, URL_HOME, URL_NOT_FOUND } from '../../constants/urls';
import useAxios from '../../hooks/useAxios';
import { API_GET_PROFILE } from '../../constants/api';
import Loading from '../../components/Loading';
import { removeAccessToken } from '../../helpers/storage';
import mapRole from '../../helpers/mapRole';

const UserContext = createContext();

const DEFAULT_USER = {
  id: 0,
  name: '',
  email: '',
  phone: '',
  address: '',
  role: ROLES.DEFAULT,
  clinicId: 0,
};

// untuk simpen data user di global dan check access
function UserProvider({ children }) {
  const { request: getProfile } = useAxios({
    url: API_GET_PROFILE,
    method: 'GET',
    isLazy: true,
  });
  const [userData, setUserData] = useState(DEFAULT_USER);
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const storeUserFromBE = useCallback(
    (data) => {
      // simpan data reponse dari backend ke dalam variable global
      const user = { ...data };
      setUserData({
        id: user.id || 0,
        name: user.username || '',
        email: user.email || '',
        phone: user.phone_number || '',
        address: user.address || '',
        role: mapRole(user.role_id),
        clinicId: user.clinic_id || 0,
      });
    },
    [],
  );

  const logout = useCallback(
    () => {
      setUserData(DEFAULT_USER);
      removeAccessToken();
      navigate(URL_HOME);
    },
    [],
  );

  const checkPath = (roleId) => {
    // roleId kalau dipass pakai yang dipassing, kalau engga ambil dari data yang di store
    const role = roleId || userData.role;
    if (pathname === '/') {
      navigate(URL_HOME);
    } else {
      const accessiblePage = ACCESSIBLE_PAGES[role];

      const isAccessible = accessiblePage.some((page) => {
        if (pathname.startsWith(page)) return true;
        return false;
      });
      if (!isAccessible) navigate(URL_NOT_FOUND);
    }
  };

  useEffect(() => {
    // setiap re-render check path bisa diakses atau engga

    if (userData.id) {
      // kalau userId masih di store langsung cek pagenya
      checkPath();
      setIsLoading(false);
    }

    // kalau ga ada (user reload atau tembak url) kita delay 1 detik untuk axios set token
    // lalu hit get profile
    setTimeout(async () => {
      const { data: response } = await getProfile();
      const dataUser = response?.data;
      storeUserFromBE(dataUser);
      checkPath(mapRole(dataUser?.role_id));
      setIsLoading(false);
    }, 1);
  }, [pathname]);

  const value = useMemo(() => ({
    userData,
    storeUserFromBE,
    isLogin: Boolean(userData.id),
    logout,
  }), [userData, storeUserFromBE]);

  return (
    <UserContext.Provider value={value}>
      {isLoading ? <Loading /> : children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
