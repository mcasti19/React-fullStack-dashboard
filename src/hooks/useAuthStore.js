import {useDispatch, useSelector} from "react-redux";
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router';

import {cleanErrorMessage, onChecking, onLogin, onLogout, } from "../store";
import dashboardApi from "../api/dashboardApi";
import {jwtDecode} from "jwt-decode";

export const useAuthStore = () => {
    const {status, user, errorMessage, } = useSelector( state => state.auth )
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleErrors = ( error ) => {
        console.log( error );
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

    // ************************************** ACTIONS 
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
            } );
            navigate( '/dashboard' );

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

    // ********************************** CHECKING TOKEN
    const checkTokenExpiration = () => {
        const token = localStorage.getItem( 'token' );
        if ( !token ) {
            dispatch( onLogout() );
            return false;
        }
        try {
            const decoded = jwtDecode( token );
            // const isExpired = decoded.exp * 1000 < Date.now(); //! usar isExpired en el if mas abajo si se activa esta linea
            const expirationTime = decoded.exp * 1000; // Convertir a milisegundos
            const currentTime = Date.now();
            const timeRemaining = expirationTime - currentTime;

            // Mostrar tiempo restante en formato minutos:segundos
            const minutes = Math.floor( timeRemaining / 60000 );
            const seconds = Math.floor( ( timeRemaining % 60000 ) / 1000 );

            console.log( `%cTiempo restante: ${ minutes }m ${ seconds }s`, 'color: #2ecc71; font-weight: bold;' );

            if ( timeRemaining <= 0 ) {
                console.log( 'Token expirado!' );
                localStorage.removeItem( 'token' );
                dispatch( onLogout( 'Sesión expirada' ) );
                return false;
            }
            return true;

        } catch ( error ) {
            localStorage.removeItem( 'token' );
            dispatch( onLogout( 'Token inválido' ) );
            return false;
        }
    };

    const revalidateToken = async () => {
        const Storedtoken = localStorage.getItem( 'token' )
        if ( !Storedtoken ) return dispatch( onLogout() );

        try {
            const {data} = await dashboardApi.get( `/auth/renew` );
            // console.log( 'DATAAAAA>>>>>>, ', data );

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
        dispatch( onLogout(
            Swal.fire( {
                title: 'Successful Logout',
                text: 'Come back soon',
                icon: 'success',
            } ) ) ); //TODO MANEJAR EL MENSAJE AL SALIR DE SESION

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
        revalidateToken,
        startLogout,
        checkTokenExpiration,
    }
}