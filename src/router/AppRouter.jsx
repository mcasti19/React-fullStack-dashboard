import {Routes, Route, Navigate} from 'react-router';
import {DashboardRouter} from '../dashboard/routes/DashboardRouter';
import {AuthRoutes} from '../auth/routes/AuthRoutes';
import {useAuth} from '../store/auth/authContext';

export const AppRouter = () => {
    const {isAuthenticated} = useAuth();
    console.log( 'isAuthenticated:>>>', isAuthenticated );

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