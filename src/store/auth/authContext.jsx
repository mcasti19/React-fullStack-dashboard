import React, {createContext, useState, useEffect, useContext} from 'react';

const AuthContext = createContext();

const AuthProvider = ( {children} ) => {
    const [ isAuthenticated, setIsAuthenticated ] = useState( false );
    const [ loading, setLoading ] = useState( true ); // Estado de carga
    const [ token, setToken ] = useState( null ); // Agrega un estado para el token

    useEffect( () => {
        const storedToken = localStorage.getItem( 'token' )
        if ( storedToken ) {
            setToken( storedToken ); // Establece el token desde localStorage
            setIsAuthenticated( true );
        }
        setLoading( false ); // Cambia a false después de verificar
    }, [token] );

    const login = ( token ) => {
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
        <AuthContext.Provider value={{isAuthenticated, login, logout, token}}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext( AuthContext );

};

// eslint-disable-next-line react-refresh/only-export-components
export {AuthProvider, useAuth};