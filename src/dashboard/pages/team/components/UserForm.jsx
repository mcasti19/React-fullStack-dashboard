import {useEffect, useState} from 'react';
import {Box, Typography, TextField, Select, MenuItem, Button, useTheme, FormControl, InputLabel, Grid2} from '@mui/material';
import {tokens} from '../../../../theme';

export default function UserForm(
    {
        employee,
        roles,
        rolesError,
        employeesError,
        employeesLoading,
        rolesLoading
    }
) {
    const theme = useTheme();
    const colors = tokens( theme.palette.mode );

    //   const { data: permissions, error: permissionsError, loading: permissionsLoading } = useFetchData('permissions');

    const [ selectedEmployee, setSelectedEmployee ] = useState( employee );
    const [ username, setUsername ] = useState( '' );
    const [ selectedRole, setSelectedRole ] = useState( null );
    //   const [selectedPermissions, setSelectedPermissions] = useState([]);

    useEffect( () => {
        // console.log( 'EmployeeSelected>>: ', selectedEmployee );
        setSelectedEmployee( employee )

    }, [ employee ] )



    const handleUsernameChange = ( event ) => {
        setUsername( event.target.value );
    };

    const handleRoleChange = ( event ) => {
        const selectedRole = roles.find( ( role ) => role._id === event.target.value );
        setSelectedRole( selectedRole );
    };

    //   const handlePermissionsChange = (event) => {
    //     const selectedPermissions = event.target.value;
    //     setSelectedPermissions(selectedPermissions);
    //   };

    const handleSubmit = ( event ) => {
        event.preventDefault();
        // Aquí debes agregar la logica para crear el usuario en la base de datos
        console.log( 'Crear usuario:', {
            email: selectedEmployee.email,
            name: selectedEmployee.name,
            username,
            role: [ {
                name: selectedRole.name,
                _id: selectedRole._id
            } ],
            // permissions: selectedPermissions,
        } );
    };

    if ( employeesLoading || rolesLoading ) {
        return <Typography variant="h6" component="div">Cargando...</Typography>;
    }

    if ( employeesError || rolesError ) {
        return <Typography variant="h6" component="div">Error al cargar datos</Typography>;
    }

    return (
        <Box
            sx={{width: "100%", mx: 'auto', p: 2}}
            bgcolor={`${ colors.primary[ 400 ] }`}
            display={'flex'}
            flexDirection={'column'}
            gap={5}
            height={500}
        >
            <Typography variant="h6" component="div">Crear usuario</Typography>
            <form onSubmit={handleSubmit} className='flex flex-col h-full'>
                <Grid2 container spacing={2} className=''>
                    <Grid2 size={{xs: 12, md: 6}} className='flex items-center justify-center gap-8'>
                        <Typography className='w-24'>Email</Typography>
                        <TextField
                            label="email"
                            value={selectedEmployee ? selectedEmployee.email : ''}
                            disabled
                            className='w-2/3'
                        />
                    </Grid2>
                    <Grid2 size={{xs: 12, md: 6}} className='flex items-center justify-center gap-8'>
                        <Typography className='w-24'>Name</Typography>
                        <TextField
                            label="Nombre"
                            value={selectedEmployee ? selectedEmployee.name : ''}
                            disabled
                            className='w-2/3'
                        />
                    </Grid2>
                    <Grid2 size={{xs: 12, md: 6}} className='flex items-center justify-center gap-8'>
                        <Typography className='w-24'>UserName</Typography>
                        <TextField
                            label="Username"
                            value={username || ''}
                            onChange={handleUsernameChange}
                            className='w-2/3'
                        />
                    </Grid2>
                    <Grid2 size={{xs: 12, md: 6}} className='flex items-center justify-center gap-8'>
                        <Typography className='w-24'>Roles</Typography>
                        <FormControl className='w-2/3'>
                            <InputLabel id="demo-simple-select-label">Roles</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                label="Role"
                                value={selectedRole ? selectedRole._id : ''}
                                onChange={handleRoleChange}
                            >
                                {roles.map( ( role ) => (
                                    <MenuItem key={role._id} value={role._id}>
                                        {role.name}
                                    </MenuItem>
                                ) )}
                            </Select>
                        </FormControl>
                    </Grid2>
                </Grid2>
                <Box className='' marginTop={'auto'} marginInline={'auto'}>
                    <Button type="submit" variant="contained" >
                        Crear usuarios
                    </Button>
                </Box>
            </form>
        </Box >
    );
}