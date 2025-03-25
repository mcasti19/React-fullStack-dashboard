import {Routes, Route, Navigate} from 'react-router';
import {DashboardRouter} from '../dashboard/routes/DashboardRouter';
import {useEffect} from 'react';
import {useAuthStore} from '../hooks/useAuthStore';
import {AuthRoutes} from '../auth/routes/AuthRoutes';
import LoadingSpinner from '../globalUI/LoadingSpinner';
import {Box, CircularProgress, Typography} from '@mui/material';

export const AppRouter = () => {
    const {status, checkAuthToken} = useAuthStore();

    useEffect( () => {
        console.log( 'Chequeando', status );
        checkAuthToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ status ] );

    if ( status === 'checking' ) {
        return (
            <Box className='h-screen flex flex-col gap-4 justify-center items-center'>
                <Typography variant="h2" component="div">
                    Loading....
                </Typography>
                <CircularProgress color='info' />
            </Box>
        )
    }

    return (
        <Routes>
            {status === 'authenticated' ? (
                <>
                    <Route path="/*" element={<DashboardRouter />} />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                </>
            ) : (
                <Route path="/auth/*" element={<AuthRoutes />} />
            )}
            <Route path="*" element={<Navigate to={status === 'authenticated' ? '/dashboard' : '/auth/login'} />} />
        </Routes>
    );
};