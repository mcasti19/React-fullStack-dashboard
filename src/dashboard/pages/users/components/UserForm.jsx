import {useEffect, useState} from 'react';
import {Box, Typography, TextField, Select, MenuItem, Button, useTheme, FormControl, InputLabel, Grid2} from '@mui/material';
import {tokens} from '../../../../theme';
import PermisosComponent from './PermisosComponent';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import useAxios from '../../../../hooks/useAxios';

export default function UserForm( {employee, roles} ) {
    const axiosInstance = useAxios();
    const theme = useTheme();
    const colors = tokens( theme.palette.mode );

    const [ selectedEmployee, setSelectedEmployee ] = useState( employee );
    const [ username, setUsername ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const [ selectedRole, setSelectedRole ] = useState( null );
    const [ selectedPermissions, setSelectedPermissions ] = useState( [] );
    const [ selectedImage, setSelectedImage ] = useState( null );

    // console.log(employee);

    const onResetForm = () => {
        setSelectedEmployee( '' );
        setUsername( '' );
        setPassword( '' );
        setSelectedRole( null );
        setSelectedImage( [] );
        setSelectedImage( null );
        // setSelectedPermissions( null );

    }


    useEffect( () => {
        setSelectedEmployee( employee )
    }, [ employee ] )


    const handleUsernameChange = ( event ) => {
        setUsername( event.target.value );
    };
    const handlePasswordChange = ( event ) => {
        setPassword( event.target.value );
    };

    const handleImageChange = ( event ) => {
        setSelectedImage( event.target.files[ 0 ] );
    };

    const handleRoleChange = ( event ) => {
        const selectedRole = roles.find( ( role ) => role._id === event.target.value );
        setSelectedRole( selectedRole );
    };

    const handleSubmit = ( event ) => {
        event.preventDefault();
        try {
            const user = {
                email: selectedEmployee.email,
                name: selectedEmployee.name,
                username,
                password,
                roles: [ selectedRole.name ],
                permissions: selectedPermissions,
                employeeId: employee._id
            };

            console.log("PERMISOS: ", selectedPermissions );
            axiosInstance.post( `${ import.meta.env.VITE_API_URL }/users`, user )
                .then( ( respuesta ) => {
                    console.log( 'Usuario creado con éxito:', respuesta );
                } )
                .catch( ( error ) => {
                    console.error( 'Error al crear el usuario:', error );
                } );
            onResetForm();

        } catch ( error ) {
            console.error( 'Error al guardar el usuario:', error );
        }
    };

    return (
        <Box
            sx={{width: "100%", mx: 'auto'}}
            bgcolor={`${ colors.primary[ 400 ] }`}
            display={'flex'}
            flexDirection={'column'}
            gap={5}
            className='p-2 sm:p-7'
        >
            <Typography variant="h2" component="div" align=''>New User</Typography>
            <form onSubmit={handleSubmit} className='w-full flex flex-col gap-6 h-full '>
                <Grid2 container spacing={5} className=' p-4 rounded-sm'>
                    <Grid2 size={{xs: 12, md: 5}}
                        bgcolor={`${ colors.grey[ 800 ] }`}
                        className='justify-center place-content-center rounded-sm p-5'
                    >
                        <Box className='flex flex-col gap-3 items-center justify-center'>
                            <Typography >Imagen Profile</Typography>
                            <Box className='flex items-center justify-center w-28 h-28 rounded-full bg-slate-700 cursor-pointer'
                                bgcolor={`${ colors.grey[ 400 ] }`}
                                onClick={() => document.getElementById( 'image-input' ).click()}
                            >
                                {selectedImage ? (
                                    <img src={URL.createObjectURL( selectedImage )}
                                        alt="Imagen de perfil"
                                        width="100%"
                                        height="100%"
                                    />
                                ) : (
                                    <CameraAltIcon />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    id="image-input"
                                    style={{display: 'none'}}
                                />
                            </Box>
                        </Box>
                    </Grid2>
                    <Grid2 size={{xs: 12, md: 7}}>
                        <Grid2 container spacing={2}>
                            <Grid2 size={{xs: 12}}>
                                <Box className='flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0'>
                                    <Typography className='w-20'>Email:</Typography>
                                    <TextField
                                        label="Email"
                                        value={selectedEmployee ? selectedEmployee.email : ''}
                                        disabled
                                        className='grow sm:w-1/2'
                                        required
                                    />
                                </Box>
                            </Grid2>
                            <Grid2 size={{xs: 12}}>
                                <Box className='flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0'>
                                    <Typography className='w-20'>Name:</Typography>
                                    <TextField
                                        label="Nombre"
                                        value={selectedEmployee ? selectedEmployee.name : ''}
                                        disabled
                                        className='grow sm:w-1/2'
                                        required
                                    />
                                </Box>
                            </Grid2>
                            <Grid2 size={{xs: 12}}>
                                <Box className='flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0'>
                                    <Typography className='w-20'>UserName:</Typography>
                                    <TextField
                                        label="Username"
                                        value={username || ''}
                                        onChange={handleUsernameChange}
                                        className='grow sm:w-1/2'
                                        required
                                    />
                                </Box>
                            </Grid2>
                            <Grid2 size={{xs: 12}}>
                                <Box className='flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0'>
                                    <Typography className='w-20'>Password:</Typography>
                                    <TextField
                                        label="Password"
                                        // type='password'
                                        value={password || ''}
                                        onChange={handlePasswordChange}
                                        className='grow sm:w-1/2'
                                        required
                                    />
                                </Box>
                            </Grid2>
                            <Grid2 size={{xs: 12}}>
                                <Box className='flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0'>
                                    <Typography className='w-20'>Role:</Typography>
                                    <FormControl className='grow sm:w-1/2'>
                                        <InputLabel id="demo-simple-select-label">Roles</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            label="Role"
                                            value={selectedRole ? selectedRole._id : ''}
                                            onChange={handleRoleChange}
                                            required
                                        >
                                            {roles.map( ( role ) => (
                                                <MenuItem key={role._id} value={role._id}>
                                                    {role.name}
                                                </MenuItem>
                                            ) )}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </Grid2>
                <PermisosComponent
                    selectedPermissions={selectedPermissions}
                    setSelectedPermissions={setSelectedPermissions}
                />
                <Box className='' marginTop={'auto'} marginInline={'auto'}>
                    <Button type="submit" variant="contained" >
                        Create
                    </Button>
                </Box>
            </form>
        </Box >
    );
}