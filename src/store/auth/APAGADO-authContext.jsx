import React, {createContext, useState, useEffect, useContext} from 'react';
import {jwtDecode} from 'jwt-decode';
const AuthContext = createContext();

const AuthProvider = ( {children} ) => {
    const [ isAuthenticated, setIsAuthenticated ] = useState( false );
    const [ loading, setLoading ] = useState( true );
    const [ token, setToken ] = useState( null );
    const [ error, setError ] = useState( null );
    const [ authenticatedUser, setAuthenticatedUser ] = useState( null );

    const checkTokenExpiration = () => {
        const token = localStorage.getItem( 'token' );
        if ( !token ) {
            setError( 'Token not available' )
            setIsAuthenticated( false );
            return false;
        }
        try {
            const decoded = jwtDecode( token );
            const isExpired = decoded.exp * 1000 < Date.now();

            if ( isExpired ) {
                localStorage.removeItem( 'token' );
                setError( 'Expired Token' )
                setIsAuthenticated( false );
            }
            return !isExpired;
        } catch ( error ) {
            console.log( "Error AuthProvider, ", error );
            localStorage.removeItem( 'token' );
            setIsAuthenticated( false );
            return false;
        }
    };
    // Chequeo periódico cada minuto
    useEffect( () => {
        const interval = setInterval( () => {
            console.log( 'checkTokenExpiration' );
            checkTokenExpiration();
        }, 60000 );
        return () => clearInterval( interval );
    }, [] );

    useEffect( () => {
        const storedToken = localStorage.getItem( 'token' )
        if ( storedToken ) {
            setToken( storedToken );
            setIsAuthenticated( true );
        }
        setLoading( false );
    }, [] );

    // useEffect( () => {
    //     console.log( 'Estado authenticatedUser  actualizaxxxdo:', authenticatedUser );
    // }, [ authenticatedUser ] );

    const login = ( token ) => {
        if ( typeof token !== 'string' || token.trim() === '' ) {
            setError( 'Token inválido' );
            return;
        }
        localStorage.setItem( 'token', token );
        console.log( 'USUARIO DESPUES DE LOGUEAR>>> ', token );

        setToken( token );
        setIsAuthenticated( true );
    };

    //******************************************** */ CHECKING TOKEN

    const logout = () => {
        localStorage.removeItem( 'token' );
        setToken( null );
        setIsAuthenticated( false );
    };

    if ( loading ) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, login, logout, token, error, setError, checkTokenExpiration, authenticatedUser, setAuthenticatedUser}}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext( AuthContext );
};
// eslint-disable-next-line react-refresh/only-export-components
export {AuthProvider, useAuth};