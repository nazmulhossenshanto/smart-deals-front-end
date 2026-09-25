 import axios from 'axios'
import useAuth from './useAuth'
import { useEffect } from 'react';
import { useNavigate } from "react-router";

const axiosInstance = axios.create({
  baseURL: "https://smart-deals-server-wine.vercel.app",
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    // request interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await user.getIdToken();

          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
    );

    //  response interceptor
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        const status = err.status;
        if (status === 401 || status === 403) {
          signOutUser().then(() => {
            // navigate user into the login page
            navigate("/login");
          });
        }
      },
    );
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, signOutUser, navigate]);
  return axiosInstance;
};

 export default useAxiosSecure;