
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {AuthLayout} from '../layout/AuthLayout';
import {useAuthStore} from '../../hooks/useAuthStore';
import {useForm} from '../../hooks/useForm';
import {useState} from 'react';

const loginFormFields = {
  email: '',
  password: '',
}

const formValidations = {
  email: [ ( value ) => value.includes( '@' ), 'Email is required and must have an @' ],
  password: [ ( value ) => value.length >= 6, 'The password is required and must have at least 6 characters.' ],
}

export default function LoginPage() {
  const {startLogin, status} = useAuthStore();
  const {
    formState,
    email,
    emailValid,
    password,
    passwordValid,
    onInputChange,
    isFormValid,
    formSubmitted,
    setFormSubmitted
  } = useForm( loginFormFields, formValidations );

  const [ emailError, setEmailError ] = useState( false );
  const [ emailErrorMessage, setEmailErrorMessage ] = useState( '' );
  const [ passwordError, setPasswordError ] = useState( false );
  const [ passwordErrorMessage, setPasswordErrorMessage ] = useState( '' );



  console.log( status );


  const loginSubmit = ( event ) => {
    event.preventDefault();
    console.log( emailValid, passwordValid );
    setFormSubmitted( true );

    if ( !isFormValid ) return
    startLogin( formState );
  }

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
    <AuthLayout title='Sign In' >
      <Box
        component="form"
        onSubmit={loginSubmit}
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2,
        }}
        className='animate__animated animate__fadeIn'
      >
        <FormControl >
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            id="email"
            required
            type="email"
            className="form-control"
            placeholder="Email"
            autoFocus
            name='email'
            value={email}
            onChange={onInputChange}
            error={formSubmitted}
            helperText={formSubmitted && emailValid}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <TextField
            id="password"
            error={formSubmitted}
            type="password"
            className="form-control"
            placeholder="Password"
            name='password'
            value={password}
            onChange={onInputChange}
            required
            helperText={formSubmitted && passwordValid} />

        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={validateInputs}
        >
          Sign in
        </Button>
      </Box>
    </AuthLayout>
  );
}