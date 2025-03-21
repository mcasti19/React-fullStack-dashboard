import {useNavigate} from 'react-router';
import axios from 'axios';
import {useAuth} from '../store/auth/authContext'; // Ajusta la ruta según tu estructura de carpetas
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

            console.log( "RESPONSEEEEE>>>> ", data.user );
            // Verificar estructura de la respuesta
            if ( !data.user?.token ) {
                throw new Error( 'Respuesta inválida del servidor' );
            }
            setAuthenticatedUser(data.user)
            const token = data.user.token;
            // console.log( "DATOS DEL USUARIO: >>>", user );
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
        // console.log( "ENTRANDO A CHEQUEAR" );
        const token = localStorage.getItem( 'token' );
        // console.log( "EL TOKEN DE CHECK AUTH TOKEN: ", token );
        if ( !token ) return logout();

        try {
            console.log( "EL TRY AND CATCH ", authenticatedUser );
            // const data = await axiosInstance.get( `${ import.meta.env.VITE_API_URL }/auth/renew`);

            const {data} = await axiosInstance.get( `${ import.meta.env.VITE_API_URL }/auth/renew`, {
                params: {
                    id: authenticatedUser.id,
                    name: authenticatedUser.name,
                    email: authenticatedUser.email,
                },
            } );

            console.log( "DATAAAAAAAAA ", data );
            localStorage.setItem( 'token', data.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );
            login( data.token );

        } catch ( error ) {
            console.log( error );
            localStorage.clear();
            logout();
        }
    }

    const handleLogout = () => {
        logout();
        navigate( '/auth/login' )
    };
    return {handleLogin, checkAuthToken, handleLogout};
};