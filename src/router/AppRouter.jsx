import {Routes, Route, Navigate} from 'react-router';
import {DashboardRouter} from '../dashboard/routes/DashboardRouter';
import {useEffect} from 'react';
import {useAuthStore} from '../hooks/useAuthStore';
import {AuthRoutes} from '../auth/routes/AuthRoutes';
import LoadingSpinner from '../globalUI/LoadingSpinner';
import {Box, CircularProgress, Typography} from '@mui/material';
import Variants from '../dashboard/components/Skeleton';
import {useLocation} from 'react-router';

export const AppRouter = () => {
    const {
        // user, 
        status,
        revalidateToken
    } = useAuthStore();
    const location = useLocation();

    useEffect( () => {
        // console.log( 'AppRouter Chequeando', {status, user} );
        revalidateToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ location.pathname ] );

    if ( status === 'checking' ) {
        return (
            <Box className='h-screen flex flex-col justify-center items-center'>
                <Typography variant="h2" component="div">
                    Loading....
                </Typography>
                <CircularProgress color='info' />
            </Box>
        )
    }

    // console.log( "USER: ", user );

    return (
        <Routes>
            {status === 'authenticated' ? (
                <>
                    <Route path="/*" element={<DashboardRouter />} />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                </>
            ) : (
                <>
                    <Route path="/auth/*" element={<AuthRoutes />} />
                    <Route path="/*" element={<Navigate to={'/auth/login'} />} />
                </>
            )}
            {/* <Route path="*" element={<Navigate to={status === 'authenticated' ? '/dashboard' : '/auth/login'} />} /> */}
        </Routes>
    );
};