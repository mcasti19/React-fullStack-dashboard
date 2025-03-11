import React, {createContext, useState, useEffect, useContext} from 'react';
import {jwtDecode} from 'jwt-decode';
const AuthContext = createContext();

const AuthProvider = ( {children} ) => {
    const [ isAuthenticated, setIsAuthenticated ] = useState( false );
    const [ loading, setLoading ] = useState( true );
    const [ token, setToken ] = useState( null );
    const [ error, setError ] = useState( null );

    const checkTokenExpiration = () => {
        const token = localStorage.getItem( 'token' );
        if ( !token ) {
            setIsAuthenticated( false );
            return false;
        }

        try {
            const decoded = jwtDecode( token );
            const isExpired = decoded.exp * 1000 < Date.now();

            if ( isExpired ) {
                localStorage.removeItem( 'token' );
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
        }, 60000 ); // 60 segundos
        return () => clearInterval( interval );
    }, [] );


    useEffect( () => {
        const storedToken = localStorage.getItem( 'token' )
        if ( storedToken ) {
            setToken( storedToken );
            setIsAuthenticated( true );
        }
        setLoading( false );
        // console.log( 'authContext >>> ', storedToken );
    }, [] );

    // Si está cargando, no renderices nada o muestra un componente de carga
    if ( loading ) {
        return <div>Loading...</div>; // O un componente de carga
    }

    const login = ( token ) => {
        if ( typeof token !== 'string' || token.trim() === '' ) {
            setError( 'Token inválido' );
            return;
        }
        localStorage.setItem( 'token', token );
        setToken( token );
        console.log( 'Token actualizado:', token );
        setIsAuthenticated( true );
    };

    const logout = () => {
        localStorage.removeItem( 'token' );
        setToken( null );
        setIsAuthenticated( false );
    };
    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, login, logout, token, error, setError, checkTokenExpiration}}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext( AuthContext );
};

// eslint-disable-next-line react-refresh/only-export-components
export {AuthProvider, useAuth};