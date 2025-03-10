import {jwtDecode} from 'jwt-decode';
import {Routes, Route, Navigate} from 'react-router';
import {DashboardRouter} from '../dashboard/routes/DashboardRouter';
import {AuthRoutes} from '../auth/routes/AuthRoutes';
import {useAuth} from '../store/auth/authContext';

export const AppRouter = () => {
    let {isAuthenticated} = useAuth();
    // console.log( 'isAuthenticated:>>>', isAuthenticated );

    const token = localStorage.getItem( 'token' );
    const decodedToken = token ? jwtDecode( token ) : null;
    const expirationDate = decodedToken ? new Date( decodedToken.exp * 1000 ) : null;
    const currentDate = new Date();

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

// import {Routes, Route, Navigate} from 'react-router';
// import {jwtDecode} from 'jwt-decode';
// import {DashboardRouter} from '../dashboard/routes/DashboardRouter';
// import {AuthRoutes} from '../auth/routes/AuthRoutes';

// export const AppRouter = () => {
//     const token = localStorage.getItem( 'token' );
//     const decodedToken = token ? jwtDecode( token ) : null;
//     const expirationDate = decodedToken ? new Date( decodedToken.exp * 1000 ) : null;
//     const currentDate = new Date();

//     const isAuthenticated = token && expirationDate > currentDate;

//     if ( !isAuthenticated ) {
//         localStorage.removeItem( 'token' );
//         return (
//             <Routes>
//                 <Route path="/auth/*" element={<AuthRoutes />} />
//                 <Route path="*" element={<Navigate to="/auth/login" />} />
//             </Routes>
//         );
//     }
//     console.log( 'isAuthenticated:>>>', isAuthenticated );

//     return (
//         <Routes>
//             <Route path="/*" element={<DashboardRouter />} />
//             <Route path="/" element={<Navigate to="/dashboard" />} />
//             <Route path="*" element={<Navigate to="/dashboard" />} />
//         </Routes>
//     );
// };