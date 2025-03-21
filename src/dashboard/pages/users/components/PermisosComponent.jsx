import {Box, Button, Checkbox, FormControlLabel, Grid2, Typography, useTheme} from '@mui/material';
import {tokens} from '../../../../theme';

const categorias = [
    {id: 1, nombre: 'Users'},
    {id: 2, nombre: 'Products'},
    {id: 3, nombre: 'Invoices'},
    {id: 4, nombre: 'Employees'},
];

const permisos = [
    {id: 1, nombre: 'Read', valor: '_read'},
    {id: 2, nombre: 'Create', valor: '_create'},
    {id: 3, nombre: 'Delete', valor: '_delete'},
    {id: 4, nombre: 'Update', valor: '_update'},
];

const PermisosComponent = ( {selectedPermissions, setSelectedPermissions} ) => {
    const theme = useTheme();
    const colors = tokens( theme.palette.mode );

    const handleCheckboxChange = ( categoria, permiso ) => {
        const nuevoPermiso = `${ categoria.toLowerCase() }${ permiso.valor }`;
        const indice = selectedPermissions.indexOf( nuevoPermiso );
        if ( indice === -1 ) {
            setSelectedPermissions( [ ...selectedPermissions, nuevoPermiso ] );
        } else {
            setSelectedPermissions( selectedPermissions.filter( ( p ) => p !== nuevoPermiso ) );
        }
    };

    return (
        <Box mt={5} className='flex flex-col gap-10'>
            <Typography variant='h2' align='center'>Permissions</Typography>
            <Grid2 container spacing={2} className="flex flex-col items-center justify-center ">
                <Grid2 className="flex flex-col gap-4">
                    {categorias.map( ( categoria ) => (
                        <Box key={categoria.id} className="flex flex-col  gap-1 sm:flex-row sm:items-center">
                            <Typography className='w-20'>{categoria.nombre}</Typography>
                            <Box className='grid grid-cols-2 sm:grid-cols-4'>
                                {permisos.map( ( permiso ) => (
                                    <FormControlLabel
                                        key={permiso.id}
                                        control={
                                            <Checkbox
                                                color={`${ colors.redAccent[ 500 ] }`}
                                                checked={selectedPermissions.includes( `${ categoria.nombre.toLowerCase() }${ permiso.valor }` )}
                                                onChange={() => handleCheckboxChange( categoria.nombre, permiso )}
                                            />
                                        }
                                        label={permiso.nombre}
                                    />
                                ) )}
                            </Box>
                        </Box>
                    ) )}
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default PermisosComponent;