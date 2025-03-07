import axios from 'axios';
import {useAuth} from '../store/auth/authContext';

const useAxios = () => {
    const {token} = useAuth();
    console.log('TOKEN AXIOS>>> ', token);
    
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use( ( config ) => {
        if ( token ) {
            config.headers.Authorization = `Bearer ${ token }`;
        }
        return config;
    } );
    
    return axiosInstance;
};

export default useAxios;