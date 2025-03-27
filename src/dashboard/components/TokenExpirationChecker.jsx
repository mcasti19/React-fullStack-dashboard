import {useEffect} from 'react';
import {useAuthStore} from '../../hooks/useAuthStore';


export const TokenExpirationChecker = () => {
    const {checkTokenExpiration} = useAuthStore();
    useEffect( () => {
        const interval = setInterval( () => {
            checkTokenExpiration();
        }, 5000 ); // 60 segundos
        return () => clearInterval( interval );
    }, [ checkTokenExpiration ] );
    return null; // No renderiza nada
};