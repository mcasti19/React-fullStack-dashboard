import {useNavigate} from 'react-router';
import axios from 'axios';
import {useAuth} from '../store/auth/authContext'; // Ajusta la ruta según tu estructura de carpetas

export const useAuthActions = () => {
    const {login, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogin = async ( email, password ) => {
        try {
            const response = await axios.post( `${ import.meta.env.VITE_API_URL }/auth/login`, {email, password} );
            const token = response.data.token; // Asegúrate de que el token esté en la respuesta
            console.log( "TOKEN RECIBIDO: >>>", token );
            login( token ); // Llama a la función de login del contexto
            navigate( '/dashboard' ); // Redirige a la página de dashboard
        } catch ( error ) {
            throw new Error( 'Error al iniciar sesión. Verifica tus credenciales.', error ); // Lanza un error para manejarlo en el componente
        }
    };

    const handleLogout = () => {
        logout(); // Llama a la función de logout del contexto
        navigate( '/auth/login' ); // Redirige a la página de login
    };


    // const logout = () => {
    //     setUser( null );
    //     setToken( null );
    //     // Eliminar la sesión del localStorage
    //     localStorage.removeItem( 'session' );
    // };

    return {handleLogin, handleLogout};
};

