import {useNavigate} from 'react-router';
import axios from 'axios';
import {useAuth} from '../store/auth/authContext';
import useAxios from './useAxios';

export const useAuthActions = () => {
    const {login, logout, setError, authenticatedUser, setAuthenticatedUser} = useAuth();
    const navigate = useNavigate();
    const axiosInstance = useAxios();

    const handleLogin = async ( email, password ) => {
        try {
            setError( null ); // Limpiar errores anteriores
            const {data} = await axios.post(
                `${ import.meta.env.VITE_API_URL }/auth/login`,
                {email, password}
            );

            if ( !data.user?.token ) {
                throw new Error( 'Respuesta inválida del servidor' );
            }
            setAuthenticatedUser( data.user )
            const token = data.user.token;
            login( token );
            navigate( '/dashboard' );

        } catch ( error ) {
            if ( error instanceof Error ) {
                setError( error.message );
            } else {
                setError( 'Unknown Error' );
            }
        }
    };

    const checkAuthToken = async () => {
        const token = localStorage.getItem( 'token' );
        if ( !token ) return logout();

        try {
            const {data} = await axiosInstance.get( `${ import.meta.env.VITE_API_URL }/auth/renew`, {
                params: {
                    id: authenticatedUser.id,
                    name: authenticatedUser.name,
                    email: authenticatedUser.email,
                },
            } );

            localStorage.setItem( 'token', data.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );
            login( data.token );

        } catch ( error ) {
            localStorage.clear();
            logout();
            throw new Error( error );
        }
    }

    const handleLogout = () => {
        logout();
        navigate( '/auth/login' )
    };
    return {handleLogin, checkAuthToken, handleLogout};
};