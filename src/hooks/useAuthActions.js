import {useAuth} from '../store/auth/authContext'; // Ajusta la ruta según tu estructura de carpetas
import {useNavigate} from 'react-router';

const useAuthActions = () => {
    const {login, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogin = async ( token ) => {
        login( token ); // Llama a la función de login del contexto
        navigate( '/dashboard' ); // Redirige a la página de dashboard
    };

    const handleLogout = () => {
        logout(); // Llama a la función de logout del contexto
        navigate( '/auth/login' ); // Redirige a la página de login
    };

    return {handleLogin, handleLogout};
};

export default useAuthActions;