import React, {useState} from 'react';
import {Box, Button, Checkbox, FormControlLabel, Grid2, Typography} from '@mui/material';

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

const PermisosComponent = () => {
    const [ permisosSeleccionados, setPermisosSeleccionados ] = useState( [] );

    const handleCheckboxChange = ( categoria, permiso ) => {
        const nuevoPermiso = `${ categoria.toLowerCase() }${ permiso.valor }`;
        const indice = permisosSeleccionados.indexOf( nuevoPermiso );
        if ( indice === -1 ) {
            setPermisosSeleccionados( [ ...permisosSeleccionados, nuevoPermiso ] );
        } else {
            setPermisosSeleccionados( permisosSeleccionados.filter( ( p ) => p !== nuevoPermiso ) );
        }
    };

    return (
        <Box>
            <Grid2 container spacing={2} className="flex flex-col items-center justify-center bg-slate-600">
                {/* <Grid2 className="flex flex-col items-center bg-slate-600">
                    {categorias.map( ( categoria ) => (
                    ) )}
                </Grid2> */}
                <Grid2 className="flex flex-col">
                    {categorias.map( ( categoria ) => (
                        <Box key={categoria.id} className="flex items-center gap-3">
                            <Typography className='w-20'>{categoria.nombre}</Typography>
                            <Box>
                                {permisos.map( ( permiso ) => (
                                    <FormControlLabel
                                        key={permiso.id}
                                        control={
                                            <Checkbox
                                                checked={permisosSeleccionados.includes( `${ categoria.nombre.toLowerCase() }${ permiso.valor }` )}
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
            <Box>
                <Button onClick={() => console.log( permisosSeleccionados )}>
                    Obtener permisos seleccionados
                </Button>
            </Box>
        </Box>
    );
};

export default PermisosComponent;