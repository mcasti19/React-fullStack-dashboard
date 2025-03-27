
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


const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
}

export default function LoginPage() {
  const {startLogin} = useAuthStore();
  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange
  } = useForm( loginFormFields );

  const loginSubmit = ( event ) => {
    event.preventDefault();
    console.log(loginEmail, loginPassword);
    
    startLogin( {email: loginEmail, password: loginPassword} );
  }

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
            type="text"
            className="form-control"
            placeholder="Correo"
            name='loginEmail'
            value={loginEmail}
            onChange={onLoginInputChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <TextField
            type="password"
            className="form-control"
            placeholder="Contraseña"
            name='loginPassword'
            value={loginPassword}
            onChange={onLoginInputChange}
          />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
        >
          Sign in
        </Button>

      </Box>
      <Divider>or</Divider>
      <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
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