import React, {createContext, useState, useEffect, useContext} from 'react';

const AuthContext = createContext();

const AuthProvider = ( {children} ) => {
    const [ isAuthenticated, setIsAuthenticated ] = useState( false );
    const [ loading, setLoading ] = useState( true ); // Estado de carga

    useEffect( () => {
        const token = localStorage.getItem( 'token' );
        if ( token ) {
            // Aquí podrías validar el token si es necesario
            setIsAuthenticated( true );
        }
        setLoading( false ); // Cambia a false después de verificar
    }, [] );

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
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext( AuthContext );

};

export {AuthProvider, useAuth};