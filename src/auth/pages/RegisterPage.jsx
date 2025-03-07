// import {useMemo, useState} from "react";
// import {useDispatch, useSelector} from "react-redux";
import {Link as RouterLink} from "react-router";
import {Button, TextField, Typography, Link, Alert, Grid2} from "@mui/material";
import {AuthLayout} from "../layout/AuthLayout";
// import {useForm} from "../../hooks";
// import {startCreatingUserWithEmailPassword} from "../../store/auth";

// const formData = {
//     email: "",
//     password: '',
//     displayName: ""
// }

const formValidations = {
    email: [ ( value ) => value.includes( '@' ), 'El correo debe tener un @' ],
    password: [ ( value ) => value.length >= 6, 'La contraseña debe tener minimo 7 caracteres' ],
    displayName: [ ( value ) => value.length > 1, 'El nombre es obligatorio' ],
}

export const RegisterPage = () => {
    // const dispatch = useDispatch()

    // const {status, errorMessage} = useSelector( state => state.auth ); //  console.log( status, errorMessage );
    // const isCheckingAuthentication = useMemo( () => status === 'checking', [ status ] );

    // const [formSubmitted, setFormSubmitted] = useState( false )

    // const {
    //     formState,
    //     displayName,
    //     displayNameValid,
    //     email,
    //     emailValid,
    //     password,
    //     passwordValid,
    //     onInputChange,
    //     isFormValid,
    // } = useForm( formData, formValidations );

    let prueba = null;

    // console.log( isFormValid );

    // const onSubmit = ( event ) => {
    //     event.preventDefault();
    //     setFormSubmitted( true );
    //     if ( !isFormValid ) return
    //     // console.log( 'Form State', formState );
    //     dispatch( startCreatingUserWithEmailPassword( formState ) )
    // }

    return (
        <AuthLayout title="Crear Cuenta">

            {/* <h1>FormValid: { isFormValid ? 'Valido' : 'Incorrecto' }</h1> */}

            {/* <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn"> */}
            <form className="animate__animated animate__fadeIn">
                <Grid2 container>

                    <Grid2 sx={{mt: 2}}>
                        <TextField
                            label="Nombre Completo"
                            type="text"
                            placeholder="Ingresa tu nombre"
                            fullWidth
                            name="displayName"
                        // value={ displayName }
                        // onChange={ onInputChange }
                        // error={ !!displayNameValid && formSubmitted }
                        // helperText={ displayNameValid }
                        />
                    </Grid2>

                    <Grid2 sx={{mt: 2}}>
                        <TextField
                            label="Correo"
                            type="email"
                            placeholder="correo@google.com"
                            fullWidth
                            name="email"
                        // value={ email }
                        // onChange={ onInputChange }
                        // error={ !!emailValid && formSubmitted }
                        // helperText={ emailValid }
                        />
                    </Grid2>
                    <Grid2 sx={{mt: 2}} >
                        <TextField
                            label="Contraseña"
                            type="password"
                            placeholder="tu contraseña"
                            fullWidth
                            name="password"
                        // value={ password }
                        // onChange={ onInputChange }
                        // error={ !!passwordValid && formSubmitted }
                        // helperText={ passwordValid }
                        />
                    </Grid2>

                    <Grid2 container spacing={2} sx={{mt: 1, mb: 2}} >

                        {/* <Grid2  sx={ { m: 'auto' } }>
                            {
                                errorMessage && <Alert severity="error">{ errorMessage }</Alert> //TODO esta forma yo la hice y es valida tambien
                            }
                        </Grid2> */}

                        {/* <Grid2  sx={ { m: 'auto' } } display={ !!errorMessage ? 'block' : 'none' }> */}
                        <Grid2 sx={{m: 'auto'}}>
                            {/* <Alert severity="error">{errorMessage}</Alert> */}
                        </Grid2>

                        <Grid2 sx={{m: 'auto'}}>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                // disabled={isCheckingAuthentication}
                            >
                                Crear cuenta
                            </Button>
                        </Grid2>


                    </Grid2>

                    <Grid2 container direction='row' justifyContent='end'>

                        <Typography sx={{mr: 1}} >¿Ya tienes cuenta?</Typography>

                        <Link component={RouterLink} color='inherit' to="/auth/login">
                            Ingresar
                        </Link>
                    </Grid2>

                </Grid2>
            </form>
        </AuthLayout>
    )
};