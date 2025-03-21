import {jwtDecode} from 'jwt-decode';
import {Routes, Route, Navigate, useLocation} from 'react-router';
import {DashboardRouter} from '../dashboard/routes/DashboardRouter';
import {AuthRoutes} from '../auth/routes/AuthRoutes';
import {useAuth} from '../store/auth/authContext';
import {useEffect} from 'react';

export const AppRouter = () => {
    let {isAuthenticated, checkTokenExpiration} = useAuth();

    // console.log( 'isAuthenticated:>>>', isAuthenticated );

    const token = localStorage.getItem( 'token' );
    const decodedToken = token ? jwtDecode( token ) : null;
    const expirationDate = decodedToken ? new Date( decodedToken.exp * 1000 ) : null;
    const currentDate = new Date();

    const location = useLocation();
    // console.log( location.pathname );


    // Chequear en cada cambio de ruta
    useEffect( () => {
        checkTokenExpiration();
        // console.log( checkTokenExpiration() );
    }, [ checkTokenExpiration, location.pathname ] ); // Necesitarás usar useLocation de react-router

    isAuthenticated = token && expirationDate > currentDate
    // console.log( 'isAuthenticated:>>>', isAuthenticated );
    if ( !isAuthenticated ) {
        localStorage.removeItem( 'token' );
    }


    // console.log( 'isAuthenticated:>>>', isAuthenticated );
    return (
        <Routes>
            {isAuthenticated ? (
                <>
                    <Route path="/*" element={<DashboardRouter />} />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                </>
            ) : (
                <Route path="/auth/*" element={<AuthRoutes />} />
            )}
            <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/auth/login'} />} />
        </Routes>
    );
};