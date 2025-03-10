
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// import ForgotPassword from './components/ForgotPassword';
import {useAuthActions} from '../../../hooks/useAuthActions';
import {useState} from 'react';
import {AuthLayout} from '../../layout/AuthLayout';

export default function LoginPage() {
  const {handleLogin} = useAuthActions();
  const [ emailError, setEmailError ] = useState( false );
  const [ emailErrorMessage, setEmailErrorMessage ] = useState( '' );
  const [ passwordError, setPasswordError ] = useState( false );
  const [ passwordErrorMessage, setPasswordErrorMessage ] = useState( '' );


  const [ credentials, setCredentials ] = useState( {email: '', password: ''} );


  // const [ open, setOpen ] = React.useState( false );

  // const handleClickOpen = () => {
  //   setOpen( true );
  // };

  // const handleClose = () => {
  //   setOpen( false );
  // };

  const handleSubmit = async ( event ) => {
    event.preventDefault();
    if ( emailError || passwordError ) {
      event.preventDefault();
      return;
    }

    try {
      await handleLogin( credentials.email, credentials.password ); // Llama al hook para manejar el login
    } catch ( error ) {
      // setErrorMessage( error.message ); // Maneja el error aquí
      console.log( error );

    }
  };

  const handleChange = ( e ) => {
    const {name, value} = e.target;
    setCredentials( prev => ( {...prev, [ name ]: value} ) );
  };


  const validateInputs = () => {
    const email = document.getElementById( 'email' );
    const password = document.getElementById( 'password' );

    let isValid = true;

    if ( !email.value || !/\S+@\S+\.\S+/.test( email.value ) ) {
      setEmailError( true );
      setEmailErrorMessage( 'Please enter a valid email address.' );
      isValid = false;
    } else {
      setEmailError( false );
      setEmailErrorMessage( '' );
    }

    if ( !password.value || password.value.length < 6 ) {
      setPasswordError( true );
      setPasswordErrorMessage( 'Password must be at least 6 characters long.' );
      isValid = false;
    } else {
      setPasswordError( false );
      setPasswordErrorMessage( '' );
    }

    return isValid;
  };

  return (
    <AuthLayout title='Sing In' >
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2,
        }}
        className='animate__animated animate__fadeIn'
      >
        <FormControl onSubmit={handleSubmit} >
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            value={credentials.email}
            onChange={handleChange}
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={emailError ? 'error' : 'primary'}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            value={credentials.password}
            onChange={handleChange}
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? 'error' : 'primary'}
          />
        </FormControl>
        {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        /> */}
        {/* <ForgotPassword open={open} handleClose={handleClose} /> */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={validateInputs}
        >
          Sign in
        </Button>
        {/* <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{alignSelf: 'center'}}
            >
              Forgot your password?
            </Link> */}
      </Box>
      <Divider>or</Divider>
      <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
        {/* <Button
              fullWidth
              variant="outlined"
              onClick={() => alert( 'Sign in with Google' )}
              startIcon={<GoogleIcon />}
            >
              Sign in with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert( 'Sign in with Facebook' )}
              startIcon={<FacebookIcon />}
            >
              Sign in with Facebook
            </Button> */}
        <Typography sx={{textAlign: 'center'}}>
          Don&apos;t have an account?{' '}
          <Link
            href="/auth/register"
            variant="body2"
            sx={{alignSelf: 'center'}}
          >
            Sign up
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
}