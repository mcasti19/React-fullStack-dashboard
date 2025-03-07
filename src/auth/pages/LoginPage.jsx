
import Google from '@mui/icons-material/Google';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Grid2';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// import { useForm } from "../../hooks/useForm";
import {AuthLayout} from "../layout/AuthLayout";
// import { startGitHubSignIn, startGoogleSignIn, startLoginWithEmail } from "../../store/auth";
import {NavLink} from "react-router";
import useAuth from '../useAuth';
import {useState} from 'react';



// const formData = {
//     email: '',
//     password: '',
// }

export const LoginPage = () => {
  // const dispatch = useDispatch();
  // const { status, errorMessage } = useSelector(state => state.auth); // console.log( status );
  // const isAuthenticated = useMemo(() => status === 'checking', [ status ]);
  // const { email, password, onInputChange, formState } = useForm(formData);

  const {login, error} = useAuth();
  const [ email, setEmail ] = useState( '' );
  const [ password, setPassword ] = useState( '' );

  const handleSubmit = ( event ) => {
    event.preventDefault();
    login( email, password );
  };


  // const onSubmit = ( event ) => {
  //     event.preventDefault();

  //     // console.log( 'SUBMIT', formState );
  //     // dispatch(startLoginWithEmail(formState));
  // }

  // const onGoogleSingIn = () => {
  //   console.log( 'OnGoogleSingIn' );
  //   // dispatch(startGoogleSignIn())
  // }

  return (
    <AuthLayout title="Login " >

      <form
        aria-label="submit-form"
        action="" onSubmit={handleSubmit}
        className="animate__animated animate__fadeIn"
      >
        <Grid2 container>
          <Grid2>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={( event ) => setEmail( event.target.value )}
              // onChange={onInputChange}
              required

            />
          </Grid2>

          <Grid2 >
            <TextField
              // inputProps={
              //     {'data-testid': 'password'}
              // }
              label="Contraseña"
              type="password"
              placeholder="tu contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={( event ) => setPassword( event.target.value )}
            // onChange={onInputChange}

            />
          </Grid2>

          <Grid2 container spacing={2} sx={{mt: 1}} >


            {/* <Grid2 item xs={12} sx={{ m: 'auto' }} display={!!errorMessage ? 'block' : 'none'}> */}
            <Grid2>
              <Alert severity="error">{error}</Alert>

            </Grid2>

            <Grid2 >
              {/* <Link component={ RouterLink } color='inherit' to="/"> */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
              // disabled={isAuthenticated}

              >
                Login
              </Button>
              {error && <p style={{color: 'red'}}>{error}</p>}
              {/* </Link> */}
            </Grid2>

            {/* <Grid2>
                            <Button
                                aria-label="google-btn"
                                onClick={onGoogleSingIn}
                                variant="contained"
                                fullWidth
                            // disabled={isAuthenticated}
                            >
                                <Google />
                                <Typography sx={{ml: 1}}>Google</Typography>
                            </Button>
                        </Grid2> */}


            {/* <Grid2 item xs={ 12 } >
                            <Button
                                // onClick={ onGitHubSingIn }
                                variant="contained"
                                fullWidth
                                disabled={ isAuthenticated }
                                sx={ { backgroundColor: 'black' } }
                            >
                                <GitHub />
                                <Typography sx={ { ml: 1 } }>Github</Typography>
                            </Button>
                        </Grid2>

                        <Grid2 item xs={ 12 } >
                            <Button
                                // onClick={ onTwitterSingIn }
                                variant="contained"
                                fullWidth
                                disabled={ isAuthenticated }
                                sx={ { backgroundColor: 'black' } }
                            >
                                <X />
                            </Button>
                        </Grid2>

                        <Grid2 item xs={ 12 } >
                            <Button
                                // onClick={ onMetaSingIn }
                                variant="contained"
                                fullWidth
                                disabled={ isAuthenticated }
                            >
                                <Facebook />
                                <Typography sx={ { ml: 1 } }>FaceBook</Typography>
                            </Button>
                        </Grid2> */}

          </Grid2>

          <Grid2 container direction='row' justifyContent='end' sx={{mt: 1}}>
            <NavLink color='inherit' to="/auth/register">
              Crear una cuenta
            </NavLink>
          </Grid2>

        </Grid2>
      </form>

    </AuthLayout >
  )
};