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


    useEffect( () => {
        console.log( 'Estado authenticatedUser  actualizaxxxdo:', authenticatedUser );
    }, [ authenticatedUser ] );



    const login = ( user ) => {
        if ( typeof user.token !== 'string' || user.token.trim() === '' ) {
            setError( 'Token inválido' );
            return;
        }
        localStorage.setItem( 'token', user.token );
        setToken( user.token );
        console.log( 'Token actualizado:', user.token );
        setIsAuthenticated( true );
        setAuthenticatedUser( user )
        console.log( 'Estado authenticatedUser actualizado:', authenticatedUser );
    };

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