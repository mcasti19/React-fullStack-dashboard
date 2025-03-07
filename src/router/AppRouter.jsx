import {Navigate, Route, Routes} from "react-router";
import {DashboardRouter} from "../dashboard/routes/DashboardRouter";
import {AuthRoutes} from "../auth/routes/AuthRoutes";
import {useContext} from "react";
import {AuthContext} from "../auth/authContext";

// import {useCheckAuth} from '../hooks';

export const AppRouter = () => {
    // const { status } = useCheckAuth();
    const { status } = useContext(AuthContext);
    // const status = 'uthenticated'

    // if ( status === 'checking' ) {
    //     return <CheckingAuth />
    // }
    return (
        <Routes>
            {
                ( status === 'authenticated' )
                    ? <Route path="/*" element={<DashboardRouter />} />
                    : <Route path="/auth/*" element={<AuthRoutes />} />
            }

            <Route path='/*' element={<Navigate to='/auth/login' />} />
        </Routes>
    )
}
