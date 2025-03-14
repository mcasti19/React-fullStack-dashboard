import {useNavigate} from 'react-router';
import axios from 'axios';
import {useAuth} from '../store/auth/authContext'; // Ajusta la ruta según tu estructura de carpetas

export const useAuthActions = () => {
    const {login, logout, setError} = useAuth();
    const navigate = useNavigate();

    const handleLogin = async ( email, password ) => {
        try {
            const response = await axios.post( `${ import.meta.env.VITE_API_URL }/auth/login`, {email, password} );
            const user = response.data;
            console.log( "TOKEN RECIBIDO: >>>", user.token );
            login( user );
            navigate( '/dashboard' );

        } catch ( error ) {
            if ( error instanceof Error ) {
                setError( error.message );
            } else {
                setError( 'Unknown Error' );
            }
        }
    };

    const handleLogout = () => {
        logout();
        navigate( '/auth/login' )
    };
    return {handleLogin, handleLogout};
};

