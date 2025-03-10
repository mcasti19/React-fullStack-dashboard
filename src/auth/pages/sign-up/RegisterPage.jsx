import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {AuthLayout} from '../../layout/AuthLayout';
import {useState} from 'react';

export default function RegisterPage() {

    const [ emailError, setEmailError ] = useState( false );
    const [ emailErrorMessage, setEmailErrorMessage ] = useState( '' );
    const [ passwordError, setPasswordError ] = useState( false );
    const [ passwordErrorMessage, setPasswordErrorMessage ] = useState( '' );
    const [ nameError, setNameError ] = useState( false );
    const [ nameErrorMessage, setNameErrorMessage ] = useState( '' );

    const validateInputs = () => {
        const email = document.getElementById( 'email' );
        const password = document.getElementById( 'password' );
        const name = document.getElementById( 'name' );

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

        if ( !name.value || name.value.length < 1 ) {
            setNameError( true );
            setNameErrorMessage( 'Name is required.' );
            isValid = false;
        } else {
            setNameError( false );
            setNameErrorMessage( '' );
        }

        return isValid;
    };

    const handleSubmit = ( event ) => {
        if ( nameError || emailError || passwordError ) {
            event.preventDefault();
            return;
        }
        const data = new FormData( event.currentTarget );
        console.log( {
            name: data.get( 'name' ),
            lastName: data.get( 'lastName' ),
            email: data.get( 'email' ),
            password: data.get( 'password' ),
        } );
    };

    return (
        <AuthLayout title='Sing Up'>
            <Box
                component="form"
                onSubmit={handleSubmit}
                className='flex flex-col gap-4 animate__animated animate__fadeIn'
            >
                <FormControl className=''>
                    <FormLabel htmlFor="name">Full name</FormLabel>
                    <TextField
                        autoComplete="name"
                        name="name"
                        required
                        fullWidth
                        id="name"
                        placeholder="Jon Snow"
                        error={nameError}
                        helperText={nameErrorMessage}
                        color={nameError ? 'error' : 'primary'}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        placeholder="your@email.com"
                        name="email"
                        autoComplete="email"
                        variant="outlined"
                        error={emailError}
                        helperText={emailErrorMessage}
                        color={passwordError ? 'error' : 'primary'}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        placeholder="••••••"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        variant="outlined"
                        error={passwordError}
                        helperText={passwordErrorMessage}
                        color={passwordError ? 'error' : 'primary'}
                    />
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={validateInputs}
                >
                    Sign up
                </Button>
            </Box>
            {/* <Divider>
                <Typography sx={{color: 'text.secondary'}}>or</Typography>
            </Divider> */}
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                {/* <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => alert( 'Sign up with Google' )}
                    startIcon={<GoogleIcon />}
                >
                    Sign up with Google
                </Button>
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => alert( 'Sign up with Facebook' )}
                    startIcon={<FacebookIcon />}
                >
                    Sign up with Facebook
                </Button> */}
                <Typography sx={{textAlign: 'center'}}>
                    Already have an account?{' '}
                    <Link
                        href="/auth/login"
                        variant="body2"
                        sx={{alignSelf: 'center'}}
                    >
                        Sign in
                    </Link>
                </Typography>
            </Box>
        </AuthLayout>
    );
}
