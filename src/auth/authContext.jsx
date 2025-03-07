import {createContext, useState} from 'react';

const AuthContext = createContext();

const AuthProvider = ( {children} ) => {
    const [ user, setUser ] = useState( null );
    const [ token, setToken ] = useState( null );
    const [ status, setStatus ] = useState( null );

    return (
        <AuthContext.Provider value={{user, token, setUser, setToken, status, setStatus}}>
            {children}
        </AuthContext.Provider>
    );
};
export {AuthProvider, AuthContext};