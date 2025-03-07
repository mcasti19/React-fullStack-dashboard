import {useState, useContext} from 'react';
import axios from 'axios';
import {AuthContext} from './authContext';

const useAuth = () => {
  const {user, token, setUser, setToken, status, setStatus} = useContext( AuthContext );
  // console.log( import.meta.env.VITE_API_URL );


  const [ error, setError ] = useState( null );

  const login = async ( email, password ) => {
    try {
      const response = await axios.post( `${ import.meta.env.VITE_API_URL }/auth/login`, {email, password}, );
      // .post( `${ import.meta.env.VITE_API_URL }/login`, {email, password},);

      const userData = response.data;

      if ( userData ) {
        setStatus( 'authenticated' );
      }

      console.log( "USER >>> ", userData );

      setUser( userData );
      setToken( userData.token );
    } catch ( error ) {
      setError( error.message );
    }
  };

  const logout = () => {
    setUser( null );
    setToken( null );
  };

  return {user, token, login, logout, status, error};
};

export default useAuth;