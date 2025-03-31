import React, {useState} from 'react';
import {Box, CircularProgress, FormControl, InputLabel, MenuItem, Select, Typography, useTheme} from "@mui/material";

// import {tokens} from "../../../theme";
// import {useGoBack} from "../../../hooks/useGoBack";
import BreadcrumbsComponent from '../../../globalUI/Breadcrumbs';
import useApi from '../../../hooks/useApi';
import {tokens} from '../../../theme';
import UserForm from './components/UserForm';

const breadcrumbs = [
  {label: 'Dashboard', to: '/'},
  {label: 'Users', to: -1},
  {label: 'Create new User'},
];

export const CreateUserPage = () => {
  const theme = useTheme();
  const colors = tokens( theme.palette.mode );
  const [ selectedEmployee, setSelectedEmployee ] = useState( null );
  const [ paginationModel, setPaginationModel ] = useState( {
    page: 0,
    pageSize: 100,
  } );
  // Cargar empleados

  const {data: employeeData, error: employeeError, isLoading: employeeLoading} = useApi( 'employees', paginationModel.page, paginationModel.pageSize );
  const employees = employeeData?.employees || [];
  console.log( employees );

  // Cargar roles
  const {data: roleData, error: roleError, isLoading: roleLoading} = useApi( 'roles' );
  const roles = roleData || [];
  console.log( roles );



  // Manejo de errores
  if ( employeeLoading || roleLoading ) {
    return <CircularProgress />;
  }

  if ( employeeError ) {
    return <Typography color="error">Error al cargar empleados: {employeeError.message}</Typography>;
  }

  if ( roleError ) {
    return <Typography color="error">Error al cargar roles: {roleError.message}</Typography>;
  }






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
      overflow={'auto'}
    >
      <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
      <Box className='w-full flex flex-col gap-5'>
        <EmployeeSelector
          employees={employees}
          onSelect={setSelectedEmployee}
        />
      </Box>

      <UserForm employee={selectedEmployee} roles={roles} />
    </Box>
  )
}
