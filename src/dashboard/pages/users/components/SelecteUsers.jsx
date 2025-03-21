import {useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {CircularProgress, Typography, useTheme} from '@mui/material';
import UserForm from './UserForm';
import {tokens} from '../../../../theme';

export default function SelecteUsers( {
    employees,
    roles,
    rolesError,
    employeesError,
    employeesLoading,
    rolesLoading
} ) {
    const theme = useTheme();
    const colors = tokens( theme.palette.mode );
    const [ employee, setEmployee ] = useState( null );

    const handleChange = ( event ) => {
        const selectedEmployee = employees.find( ( employee ) => employee.email === event.target.value );
        setEmployee( selectedEmployee );
    };

    if ( employeesLoading ) {
        return (
            <Box className='h-screen flex flex-col gap-4 justify-center items-center'>
                <Typography variant="h6" component="div">
                    Loading Users...
                </Typography>
                <CircularProgress color='info' />
            </Box>
        );
    }

    if ( employeesError ) {
        return (
            <Box className='h-screen flex justify-center items-center'>
                <Typography variant="h6" component="div">
                    Error al cargar usuarios: {employeesError.message}
                </Typography>
            </Box>
        );
    }

    return (
        <>
            <Box sx={{minWidth: 120}} bgcolor={`${ colors.primary[ 400 ] }`}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Employee</InputLabel>
                    <Select
                        labelId="select-employee"
                        id="demo-simple-select"
                        value={employee ? employee.email : ''}
                        label="Please choose one employee"
                        onChange={handleChange}
                    >
                        {employees.map( ( employee, index ) => (
                            ( employee.userId ) ? null : ( <MenuItem key={index} value={employee.email}>
                                {employee.name}   /   {employee.email}
                            </MenuItem> )
                        ) )}
                    </Select>
                </FormControl>
            </Box>

            <UserForm
                employee={employee}
                roles={roles}
                employeesError={employeesError}
                employeesLoading={employeesLoading}
                rolesError={rolesError}
                rolesLoading={rolesLoading}
            />
        </>
    );
}