import {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
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
// import RolePermissionManager from '../roles/components/RolePermissionManager';

export const EditUserPage = () => {
    const theme = useTheme();
    const colors = tokens( theme.palette.mode );
    const {userId} = useParams();
    const {data, error, loading} = useApi( `users/${ userId }` );
    const navigate = useNavigate();

    const [ formValues, setFormValues ] = useState( {
        name: '',
        username: '',
        email: '',
        roles: [],
        permissions: [],
        createdDate: ''
    } );

    console.log( data );

    // Actualizar el estado cuando los datos de la API lleguen
    useEffect( () => {
        if ( data ) {
            setFormValues( {
                name: data.name,
                username: data.username,
                email: data.email,
                roles: data.roles,
                permissions: data.permissions,
                createdAt: data.createdAt
            } );
        }
    }, [ data ] );


    const goBack = () => {
        navigate( -1 )
    }

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
                <Grid2 container spacing={3} className='flex justify-center items-center border-2 border-amber-300 p-10'>
                    <Grid2 >
                        <TextField
                            fullWidth
                            label="ID"
                            name="id"
                            value={userId || ''}
                            disabled
                            variant="outlined"
                        />
                    </Grid2>

                    <Grid2>
                        <TextField
                            fullWidth
                            label="Nombre"
                            name="name"
                            value={formValues.name || ''}
                            onChange={handleChange}
                            variant="outlined"
                            required

                        />
                    </Grid2>

                    <Grid2>
                        <TextField
                            fullWidth
                            label="UserName"
                            name="username"
                            value={formValues.username || ''}
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
                            value={formValues.email || ''}
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
                            value={new Date( formValues.createdAt ).toLocaleDateString()}
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
                            onClick={goBack}
                            variant="outlined"
                            color="error"
                            // href="/users"
                            className="border-red-500 text-red-500 hover:border-red-700 hover:text-red-700"
                        >
                            Cancelar
                        </Button>
                    </Grid2>

                </Grid2>




            </form>
            {/* <RolePermissionManager /> */}
            {/* <PermisosComponent
                    selectedPermissions={selectedPermissions}
                    setSelectedPermissions={setSelectedPermissions}
                /> */}
        </Container>
    );
};

// export default EditUserPage;