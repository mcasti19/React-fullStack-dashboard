import {useState} from 'react';
import {Box, Typography, TextField, Select, MenuItem, Button, useTheme, FormControl, InputLabel, Grid2} from '@mui/material';
import {tokens} from '../../../../theme';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import useAxios from '../../../../hooks/useAxios';
import {useForm} from '../../../../hooks/useForm';

const formData = {
    img_profile: '',
    name: '',
    last_name: '',
    age: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    position: '',
    department: '',
    hireDate: new Date(),
}

export default function EmployeeForm( {employeesError, employeesLoading, } ) {
    const theme = useTheme();
    const colors = tokens( theme.palette.mode );

    const axiosInstance = useAxios();
    // const [ formSubmitted, setFormSubmitted ] = useState( false );
    const [ selectedImage, setSelectedImage ] = useState( null );

    const {
        formState,
        // img_profile,
        name,
        last_name,
        age,
        email,
        phone,
        country,
        city,
        position,
        department,
        onInputChange,
        // onResetForm
    } = useForm( formData );

    const handleImageChange = ( event ) => {
        setSelectedImage( event.target.files[ 0 ] );
    };

    const handleSubmit = ( event ) => {
        event.preventDefault();
        // setFormSubmitted( true );

        try {
            axiosInstance.post( `${ import.meta.env.VITE_API_URL }/employees`, formState )
                .then( ( respuesta ) => {
                    console.log( 'Employee creado con éxito:', respuesta );
                } )
                .catch( ( error ) => {
                    console.error( 'Error al crear el Employee:', error );
                } );
            // onResetForm();

        } catch ( error ) {
            console.error( 'Error al guardar el Employee:', error );
        }
    };


    if ( employeesLoading ) {
        return <Typography variant="h6" component="div">Cargando...</Typography>;
    }

    if ( employeesError ) {
        return <Typography variant="h6" component="div">Error al cargar datos</Typography>;
    }

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
                                    <Typography className='w-20'>Name:</Typography>
                                    <TextField
                                        type="text"
                                        label="Name"
                                        name='name'
                                        value={name}
                                        onChange={onInputChange}
                                        className='grow sm:w-1/2'
                                        required
                                    />
                                </Box>
                            </Grid2>
                            <Grid2 size={{xs: 12}}>
                                <Box className='flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0'>
                                    <Typography className='w-20'>Last Name:</Typography>
                                    <TextField
                                        type="text"
                                        label="Last Name"
                                        name='last_name'
                                        value={last_name}
                                        onChange={onInputChange}
                                        className='grow sm:w-1/2'
                                        required
                                    />
                                </Box>
                            </Grid2>
                            <Grid2 size={{xs: 12}}>
                                <Box className='flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0'>
                                    <Typography className='w-20'>Email:</Typography>
                                    <TextField
                                        type="text"
                                        label="Email"
                                        name='email'
                                        value={email || ''}
                                        onChange={onInputChange}
                                        className='grow sm:w-1/2'
                                        required
                                    />
                                </Box>
                            </Grid2>
                            <Grid2 size={{xs: 12}}>
                                <Box className='flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0'>
                                    <Typography className='w-20'>Age:</Typography>
                                    <TextField
                                        label="Age"
                                        name='age'
                                        value={age || ''}
                                        onChange={onInputChange}
                                        // className='grow sm:w-1/2'
                                        required
                                        type='number'
                                    />
                                </Box>
                            </Grid2>
                            <Grid2 size={{xs: 12}}>
                                <Box className='flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0'>
                                    <Typography className='w-20'>Phone:</Typography>
                                    <TextField
                                        label="Phone"
                                        name='phone'
                                        value={phone || ''}
                                        onChange={onInputChange}
                                        className='grow sm:w-1/2'
                                        required
                                    />
                                </Box>
                            </Grid2>
                            <Grid2 size={{xs: 12}}>
                                <Box className='flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0'>
                                    <Typography className='w-20'>Country:</Typography>
                                    <TextField
                                        type="text"
                                        label="Country"
                                        name='country'
                                        value={country || ''}
                                        onChange={onInputChange}
                                        className='grow sm:w-1/2'
                                        required
                                    />
                                </Box>
                            </Grid2>
                            <Grid2 size={{xs: 12}}>
                                <Box className='flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0'>
                                    <Typography className='w-20'>City:</Typography>
                                    <TextField
                                        type="text"
                                        label="City"
                                        name='city'
                                        value={city || ''}
                                        onChange={onInputChange}
                                        className='grow sm:w-1/2'
                                        required
                                    />
                                </Box>
                            </Grid2>
                            <Grid2 size={{xs: 12}}>
                                <Box className='flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0'>
                                    <Typography className='w-20'>Position:</Typography>
                                    <TextField
                                        type="text"
                                        label="Position"
                                        name='position'
                                        value={position || ''}
                                        onChange={onInputChange}
                                        className='grow sm:w-1/2'
                                        required
                                    />
                                </Box>
                            </Grid2>
                            <Grid2 size={{xs: 12}}>
                                <Box className='flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0'>
                                    <Typography className='w-20'>Department:</Typography>
                                    <TextField
                                        type="text"
                                        label="Department"
                                        name='department'
                                        value={department || ''}
                                        onChange={onInputChange}
                                        className='grow sm:w-1/2'
                                        required
                                    />
                                </Box>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </Grid2>

                <Box className='' marginTop={'auto'} marginInline={'auto'}>
                    <Button type="submit" variant="contained" >
                        Create Employee
                    </Button>
                </Box>
            </form>
        </Box >
    );
}