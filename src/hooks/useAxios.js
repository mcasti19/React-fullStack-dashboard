import axios from 'axios';
import {useEffect, useRef} from 'react';
import {useAuth} from '../store/auth/APAGADO-authContext';

const useAxios = () => {
    const {token} = useAuth();
    const axiosInstance = useRef( axios.create() );

    useEffect( () => {
        // Capturamos la instancia actual en una variable local
        const instance = axiosInstance.current;
        // Configurar el interceptor de solicitud
        const requestInterceptor = axiosInstance.current.interceptors.request.use(
            ( config ) => {
                if ( token ) {
                    config.headers.Authorization = `Bearer ${ token }`;
                }
                return config;
            },
            ( error ) => Promise.reject( error )
        );

        // Limpiar el interceptor al desmontar
        return () => {
            instance.interceptors.request.eject( requestInterceptor );
        };
    }, [ token ] ); // Vuelve a configurar cuando el token cambie
    return axiosInstance.current;
};
export default useAxios;