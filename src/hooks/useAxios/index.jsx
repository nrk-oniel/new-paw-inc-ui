import axios from 'axios';
import {
  useCallback,
  useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { AxiosContext } from '../../contexts/AxiosContext';

const getErrorMsg = (response) => {
  let objErrorMsg = '';
  const responseErrorMsg = response?.data?.error;
  if (typeof responseErrorMsg === 'object') {
    // kalau response dari backend object kita ambil error pertama
    objErrorMsg = responseErrorMsg[Object.keys(responseErrorMsg)[0]];
  }
  return objErrorMsg || responseErrorMsg;
};

// Reference: https://blog.openreplay.com/integrating-axios-with-react-hooks/
const useAxios = (props) => {
  const {
    url, method, payload, isLazy,
  } = props;
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const contextInstance = useContext(AxiosContext);
  const instance = useMemo(() => contextInstance || axios, [contextInstance]);
  const controllerRef = useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };

  const request = useCallback(
    async (args) => {
      const { payload: newPayload, url: newUrl } = { ...args };
      let tmpData = null;
      let tmpError = null;
      setIsLoading(true);
      try {
        const response = await instance.request({
          signal: controllerRef.current.signal,
          data: newPayload || payload,
          method,
          url: newUrl || url,
        });

        tmpData = response.data;
        setData(tmpData);
        tmpError = getErrorMsg(response);
        setError(tmpError);
      } catch (_err) {
        const response = _err?.response;
        const axiosErrorMsg = _err.message;
        tmpError = getErrorMsg(response) || axiosErrorMsg;
        setError(tmpError);
      } finally {
        setIsLoading(false);
      }

      const isSuccess = Boolean(tmpError) === false;
      return { data: tmpData, error: tmpError, isSuccess };
    },
    [setData, setError, setIsLoading],
  );
  useEffect(() => {
    // skip untuk request pertama kali render kalau dia lazy request
    if (!isLazy) request();
  }, []);

  return {
    cancel, response: data, error, isLoading, request,
  };
};

export default useAxios;
