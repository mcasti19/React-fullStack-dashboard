import {useEffect, useState} from 'react';
import {useParams} from "react-router";
import useApi from "../../../hooks/useApi";

import {
    Container,
    TextField,
    Button,
    Grid2,
    Typography,
    CircularProgress,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    useTheme
} from '@mui/material';
import {tokens} from '../../../theme';


export const EditEmployeePage = () => {
    const theme = useTheme();
    const colors = tokens( theme.palette.mode );
    const {_id} = useParams();
    const {data: employee, error, loading} = useApi( `employees/${ _id }` );

    const {
        name,
        last_name,
        email,
        // age,
        // country,
        // city,
        // phone,
        // position,
        // status,
        // img_profile,
        hireDate
    } = employee;

    const [ formValues, setFormValues ] = useState( employee );

    // Actualizar el estado cuando los datos de la API lleguen
    useEffect( () => {
        if ( employee ) {
            console.log( employee );
            // setFormValues( {
            //     name: employee.name,
            //     last_name: employee.last_name,
            //     email: employee.email,
            //     createdAt: employee.createdAt
            // } );
        }
    }, [ employee ] );



    const handleSubmit = async ( e ) => {
        e.preventDefault();
        console.log( formValues );
    };


    // Manejar cambios en los inputs correctamente

    const handleChange = ( e ) => {
        const {name, value} = e.target;
        setFormValues( prev => ( {
            ...prev,
            [ name ]: value
        } ) );
    };

    if ( loading ) return <CircularProgress className="mx-auto mt-8" />;
    if ( error ) return <Typography color="error">{error}</Typography>;

    return (
        <Container sx={{
            background: colors.blueAccent[ 900 ], color: colors.grey[ 100 ]
        }}
            maxWidth="md" className="flex flex-col gap-8 justify-center items-center rounded-lg shadow-md p-6 mt-8">
            <Typography variant="h4" className="mb-6 text-center font-bold text-gray-700">
                Editar Usuario
            </Typography>

            <form onSubmit={handleSubmit}>
                <Grid2 container spacing={3} className='flex justify-center items-center border-2 p-10'>
                    <Grid2 >
                        <TextField
                            fullWidth
                            label="ID"
                            name="id"
                            value={_id || ''}
                            disabled
                            variant="outlined"
                        />
                    </Grid2>

                    <Grid2>
                        <TextField
                            fullWidth
                            label="Nombre"
                            name="name"
                            value={name || ''}
                            onChange={handleChange}
                            variant="outlined"
                            required

                        />
                    </Grid2>

                    <Grid2>
                        <TextField
                            fullWidth
                            label="LastName"
                            name="last_name"
                            value={last_name || ''}
                            onChange={handleChange}
                            variant="outlined"
                            placeholder={`${ formValues.username }`}
                            required
                        />
                    </Grid2>

                    <Grid2 >
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={email || ''}
                            onChange={handleChange}
                            variant="outlined"
                            disabled
                        />
                    </Grid2>
                    <Grid2 >
                        <TextField
                            fullWidth
                            label="Fecha de creación"
                            name="createdAt"
                            value={hireDate || ''}
                            disabled
                            variant="outlined"

                        />
                    </Grid2>

                    <Grid2 className="flex justify-end space-x-4 mt-4">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg"
                        >
                            Guardar Cambios
                        </Button>

                        <Button
                            variant="outlined"
                            color="error"
                            href="/usuarios"
                            className="border-red-500 text-red-500 hover:border-red-700 hover:text-red-700"
                        >
                            Cancelar
                        </Button>
                    </Grid2>

                </Grid2>

            </form>

        </Container>
    );
};

// export default EditUserPage;