
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
import {Backdrop, CircularProgress} from '@mui/material';
import {useEffect} from 'react';

const loginFormFields = {
  email: 'administrator@admin.com',
  password: '123123',
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

  useEffect( () => {
    console.log( 'STATUS: ',status );
  }, [ status ] )

  const loginSubmit = ( event ) => {
    event.preventDefault();
    console.log( formState );
    setFormSubmitted( true );

    if ( !isFormValid ) return
    startLogin( formState );
  }

  return (
    <AuthLayout title='Sign In' >
      <Backdrop
        open={status === 'checking'}
        sx={{color: '#fff', zIndex: ( theme ) => theme.zIndex.drawer + 1}}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
            placeholder="administrator@admin.com"
            autoFocus
            name='email'
            value={email}
            onChange={onInputChange}
            error={formSubmitted}
            helperText={formSubmitted && emailValid}
          // disabled={ }
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <TextField
            id="password"
            error={formSubmitted}
            type="password"
            className="form-control"
            placeholder="123123"
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
          disabled={status === 'checking'}
        >
          {status === 'checking' ? (
            <CircularProgress size={24} color="inherit" />
          ) : 'Sign in'}
        </Button>
      </Box>
    </AuthLayout>
  );
}