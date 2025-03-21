import React, {useEffect, useState} from 'react';
import {Box, Button, Chip, CircularProgress, FormControl, IconButton, InputLabel, MenuItem, Select, Tooltip, Typography, useTheme} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import {tokens} from "../../../theme";
// import {useGoBack} from "../../../hooks/useGoBack";
import BreadcrumbsComponent from '../../../globalUI/Breadcrumbs';
import SelecteUsers from './components/APAGADO-SelecteUsers';
import useApi from '../../../hooks/useApi';
import PermisosComponent from './components/PermisosComponent';
import {useAuth} from '../../../store/auth/authContext';
import {tokens} from '../../../theme';
import UserForm from './components/UserForm';


const breadcrumbs = [
  {
    label: 'Dashboard',
    to: '/',
  },
  {
    label: 'Users',
    to: -1,
  },
  {
    label: 'Create new User',
  },
];

export const CreateUserPage = () => {
  const theme = useTheme();
  const colors = tokens( theme.palette.mode );
  // const goBack = useGoBack( '/team' );
  const {
    data: employees,
    // error: employeesError,
    // loading: employeesLoading
  } = useApi( 'employees' );
  const {
    data: roles,
    // error: rolesError,
    // loading: rolesLoading
  } = useApi( 'roles' );
  const [ selectedEmployee, setSelectedEmployee ] = useState( null );
  const {authenticatedUser} = useAuth();

  console.log( "EMPLOYEES ", employees );


  useEffect( () => {
    console.log( 'Estado authenticatedUser en CreateUserPage:', authenticatedUser );
  }, [ authenticatedUser ] )


  const EmployeeSelector = ( {employees, onSelect, selectedEmployee} ) => {
    const handleSelect = ( email ) => {
      const employee = employees.find( e => e.email === email );
      onSelect( employee );

    };

    return (
      <Box sx={{minWidth: 120}} bgcolor={`${ colors.primary[ 400 ] }`}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Employee</InputLabel>
          <Select
            labelId="select-employee"
            id="demo-simple-select"
            value={selectedEmployee ? setSelectedEmployee.email : ''}
            label="Please choose one employee"
            // onChange={handleChange}
            onChange={( e ) => handleSelect( e.target.value )}
          >
            {employees.map( ( employee, index ) => (
              ( employee.userId ) ? null :
                ( <MenuItem key={index} value={employee.email}>
                  {employee.name}   /   {employee.email}
                </MenuItem> )
            ) )}
          </Select>
        </FormControl>
      </Box>
    );
  };

  return (
    <Box
      width={`calc(100% - 4%)`}
      m="20px auto 0"
      display={'flex'}
      flexDirection={'column'}
      gap={5}
      overflow={'hidden'}
    >
      <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
      <Box className='w-full flex flex-col gap-5'>
        <EmployeeSelector
          employees={employees}
          onSelect={setSelectedEmployee}
        />
      </Box>

      <UserForm employee={selectedEmployee} roles={roles} />




      {/* <PermisosComponent/> */}
    </Box>
  )
}
