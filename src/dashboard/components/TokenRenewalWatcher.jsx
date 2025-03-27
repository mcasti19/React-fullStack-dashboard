import {useEffect, useRef} from 'react';
import {useLocation} from 'react-router';
import {useAuthStore} from '../../hooks/useAuthStore';


export const TokenRenewalWatcher = () => {
    const {revalidateToken} = useAuthStore();
    const location = useLocation();
    const intervalRef = useRef( null );

    useEffect( () => {
        // Llama a revalidateToken inmediatamente al cambiar de pathname
        revalidateToken();
        // Configura un intervalo para renovar el token cada 5 minutos
        if ( !intervalRef.current ) {
            intervalRef.current = setInterval( () => {
                revalidateToken();
            }, 5 * 60 * 1000 ); // 5 minutos
        }
        // Limpiar el intervalo al desmontar
        return () => {
            clearInterval( intervalRef.current );
            intervalRef.current = null; // Resetear el ref
        };
    }, [ location.pathname, revalidateToken ] ); // Dependencia en pathname
    return null; // No renderiza nada
};