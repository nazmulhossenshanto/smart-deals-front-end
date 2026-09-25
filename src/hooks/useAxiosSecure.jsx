 import axios from 'axios'
import useAuth from './useAuth'
import { useEffect } from 'react';

 const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
 })

 const useAxiosSecure = ()=>{
    const {user} = useAuth(); 
    useEffect(()=>{
      const requestInterceptor = axiosInstance.interceptors.request.use((config)=>{
        config.headers.Authorization = `Bearer ${user.accessToken}`
        console.log('from axios secure', config)
        return config;
    })
    return ()=>{
      axiosInstance.interceptors.request.eject(requestInterceptor)
    }
    }, [user])
    return axiosInstance;

 }

 export default useAxiosSecure;