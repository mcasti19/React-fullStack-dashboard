import {useDispatch, useSelector} from "react-redux";
import dashboardApi from "../api/dashboardApi";
import {cleanErrorMessage, onChecking, onLogin, onLogout, } from "../store";
import Swal from 'sweetalert2'

export const useAuthStore = () => {
    const {status, user, errorMessage, } = useSelector( state => state.auth )
    const dispatch = useDispatch();

    const handleErrors = ( error ) => {
        const {response} = error;
        console.log( response.data );

        Swal.fire( {
            title: 'Invalid credentials!',
            text: 'Please verify your credentials and try again.',
            icon: 'error',
            confirmButtonText: 'Try again'
        } )


        dispatch( onLogout( 'Credenciales Incorrectas' ) );
        setTimeout( () => {
            dispatch( cleanErrorMessage() );
        }, 1000 );
    };

    const storeToken = ( token, userData ) => {
        localStorage.setItem( 'token', token );
        localStorage.setItem( 'token-init-date', new Date().getTime() );
        dispatch( onLogin( userData ) );
    };

    const startLogin = async ( {email, password} ) => {
        dispatch( onChecking() );
        try {
            const {data} = await dashboardApi.post( `/auth/login`, {email, password} );
            const {token, ...userData} = data.user; // Extraer el token y el resto de los datos
            storeToken( token, userData );

            Swal.fire( {
                title: 'Successful Login',
                text: 'Wellcome to Application',
                icon: 'success',
            } )

        } catch ( error ) {
            handleErrors( error );
        }
    };

    const startRegister = async ( {email, password, name} ) => {
        dispatch( onChecking() );
        try {
            const {data} = await dashboardApi.post( '/auth/new', {email, password, name} );
            const {token, ...userData} = data.user;
            storeToken( token, userData );

        } catch ( error ) {
            dispatch( onLogout( error.response.data?.msg || '--' ) );
            setTimeout( () => {
                dispatch( cleanErrorMessage() );
            }, 10 );
        }
    };

    const checkAuthToken = async () => {
        const Storedtoken = localStorage.getItem( 'token' )
        if ( !Storedtoken ) return dispatch( onLogout() );

        try {
            const {data} = await dashboardApi.get( `/auth/renew` );
            console.log( 'DATAAAAA>>>>>>, ', data );

            if ( data.token ) {
                const {token, user} = data;
                storeToken( token, user );
            } else {
                localStorage.clear();
                dispatch( onLogout( 'Sesion expirada' ) );
            }

        } catch ( error ) {

            localStorage.clear();
            dispatch( onLogout( 'Sesion expirada' ) );
        }
    };

    const startLogout = () => {
        localStorage.clear();
        Swal.fire( {
            title: 'Successful Logout',
            text: 'Come back soon',
            icon: 'success',
        } )
        // dispatch( onLogout( 'Ha salido exitosamente' ) ); //TODO MANEJAR EL MENSAJE AL SALIR DE SESION
        dispatch( onLogout() );
    }

    return {
        //* Propiedades
        errorMessage,
        status,
        user,

        //*Métodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
    }
}