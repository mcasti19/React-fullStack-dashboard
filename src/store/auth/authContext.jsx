import React, {createContext, useState, useEffect, useContext} from 'react';

const AuthContext = createContext();

const AuthProvider = ( {children} ) => {
    const [ isAuthenticated, setIsAuthenticated ] = useState( false );
    const [ loading, setLoading ] = useState( true );
    const [ token, setToken ] = useState( null );
    const [ error, setError ] = useState( null );

    useEffect( () => {
        const storedToken = localStorage.getItem( 'token' )
        if ( storedToken ) {
            setToken( storedToken ); // Establece el token desde localStorage
            setIsAuthenticated( true );
        }
        setLoading( false ); // Cambia a false después de verificar
    }, [ token ] );

    const login = ( token ) => {
        if ( typeof token !== 'string' || token.trim() === '' ) {
            setError( 'Token inválido' );
            return;
        }
        localStorage.setItem( 'token', token );
        setIsAuthenticated( true );
    };

    const logout = () => {
        localStorage.removeItem( 'token' );
        setIsAuthenticated( false );
    };
    // Si está cargando, no renderices nada o muestra un componente de carga
    if ( loading ) {
        return <div>Loading...</div>; // O un componente de carga
    }
    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, login, logout, token, error, setError}}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext( AuthContext );
};

// eslint-disable-next-line react-refresh/only-export-components
export {AuthProvider, useAuth};