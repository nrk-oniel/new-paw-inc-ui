import axios from 'axios';
import { createContext, useEffect, useRef } from 'react';

const AxiosContext = createContext();

// Reference: https://blog.openreplay.com/integrating-axios-with-react-hooks/
function AxiosInstanceProvider(props) {
  const {
    config = {},
    requestInterceptors = [],
    responseInterceptors = [],
    children,
  } = props;
  const instanceRef = useRef(axios.create(config));

  useEffect(() => {
    requestInterceptors.forEach((interceptor) => {
      instanceRef.current.interceptors.request.use(
        interceptor,
      );
    });
    responseInterceptors.forEach((interceptor) => {
      instanceRef.current.interceptors.response.use(
        interceptor,
      );
    });
  }, []);

  return (
    <AxiosContext.Provider value={instanceRef.current}>
      {children}
    </AxiosContext.Provider>
  );
}

export { AxiosInstanceProvider, AxiosContext };
