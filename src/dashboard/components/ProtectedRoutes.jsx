// import {Route, Navigate} from 'react-router';
// import {useAuth} from '../../store/auth/authContext';

// export const ProtectedRoute = ( {component: Component, ...rest} ) => {
//     const {isAuthenticated} = useAuth();

//     return (
//         <Route
//             {...rest}
//             element={isAuthenticated ? <Component /> : <Navigate to="/login" />}
//         />
//     );
// };


import {Navigate} from 'react-router';
import {useAuth} from '../../store/auth/authContext';


export const ProtectedRoute = ( {element} ) => {
    const {isAuthenticated} = useAuth();
    console.log( 'isAuthenticated:>>>', isAuthenticated );


    // Si el usuario está autenticado, renderiza el componente; de lo contrario, redirige
    return isAuthenticated ? element : <Navigate to="/auth/login" />;
};