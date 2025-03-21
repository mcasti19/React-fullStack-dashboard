import React, {useEffect} from 'react';
import {Box, Button, Chip, CircularProgress, IconButton, Tooltip, Typography} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import {tokens} from "../../../theme";
// import {useGoBack} from "../../../hooks/useGoBack";
import BreadcrumbsComponent from '../../../globalUI/Breadcrumbs';
import SelecteUsers from './components/SelecteUsers';
import useApi from '../../../hooks/useApi';
import PermisosComponent from './components/PermisosComponent';
import {useAuth} from '../../../store/auth/authContext';


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
  // const theme = useTheme();
  // const colors = tokens( theme.palette.mode );
  // const goBack = useGoBack( '/team' );
  const {data: employees, error: employeesError, loading: employeesLoading} = useApi( 'employees' );
  const {data: roles, error: rolesError, loading: rolesLoading} = useApi( 'roles' );

  const {authenticatedUser} = useAuth();

  console.log("EMPLOYEES ",employees);


  useEffect( () => {
    console.log( 'Estado authenticatedUser en CreateUserPage:', authenticatedUser );
  }, [ authenticatedUser ] )

  return (
    <>
      <Box
        width={`calc(100% - 4%)`}
        m="20px auto 0"
        // border={2}
        // borderColor={'yellow'}
        // height={"100vh"}
        display={'flex'}
        flexDirection={'column'}
        gap={5}
        overflow={'hidden'}
      >
        <BreadcrumbsComponent breadcrumbs={breadcrumbs} />

        <Box className='w-full flex flex-col gap-5'>
          <SelecteUsers
            employees={employees}
            roles={roles}
            employeesError={employeesError}
            employeesLoading={employeesLoading}
            rolesError={rolesError}
            rolesLoading={rolesLoading}
          // className="bg-amber-500"
          />
        </Box>
        {/* <PermisosComponent/> */}
      </Box>

    </>
  )
}
