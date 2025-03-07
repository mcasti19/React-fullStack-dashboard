
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Grid2';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {AuthLayout} from "../layout/AuthLayout";
import {NavLink} from "react-router";
import {useState} from 'react';
import {useAuthActions} from '../../hooks/useAuthActions';


export const LoginPage = () => {
  const {handleLogin} = useAuthActions();
  const [ credentials, setCredentials ] = useState( {email: '', password: ''} );
  const [ errorMessage, setErrorMessage ] = useState( '' );


  const handleSubmit = async ( e ) => {
    e.preventDefault();
    setErrorMessage( '' );

    try {
      await handleLogin( credentials.email, credentials.password ); // Llama al hook para manejar el login
    } catch ( error ) {
      setErrorMessage( error.message ); // Maneja el error aquí
    }
  };

  const handleChange = ( e ) => {
    const {name, value} = e.target;
    setCredentials( prev => ( {...prev, [ name ]: value} ) );
  };

  return (
    <AuthLayout title="Login">
      <form aria-label="submit-form" onSubmit={handleSubmit} className="animate__animated animate__fadeIn">
        <Grid2 container spacing={2}>
          <Grid2 >
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </Grid2>

          <Grid2 >
            <TextField
              label="Contraseña"
              type="password"
              placeholder="tu contraseña"
              fullWidth
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </Grid2>

          {errorMessage && (
            <Grid2 >
              <Alert severity="error">{errorMessage}</Alert>
            </Grid2>
          )}

          <Grid2 >
            <Button type="submit" variant="contained" fullWidth>
              Login
            </Button>
          </Grid2>

          <Grid2 container direction='row' justifyContent='end' sx={{mt: 1}}>
            <NavLink color='inherit' to="/auth/register">
              Crear una cuenta
            </NavLink>
          </Grid2>
        </Grid2>
      </form>
    </AuthLayout>
  );
};