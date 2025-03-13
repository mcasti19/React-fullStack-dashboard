import React from 'react';
import {Box, Button, Chip, CircularProgress, IconButton, Tooltip, Typography} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import {tokens} from "../../../theme";
// import {useGoBack} from "../../../hooks/useGoBack";
import BreadcrumbsComponent from '../../../globalUI/Breadcrumbs';
import SelecteUsers from './components/SelecteUsers';
import useFetchData from '../../../hooks/useApi';
import PermisosComponent from './components/PermisosComponent';


const breadcrumbs = [
  {
    label: 'Dashboard',
    to: '/',
  },
  {
    label: 'Team',
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

  const {data: employees, error: employeesError, loading: employeesLoading} = useFetchData( 'employees' );
  const {data: roles, error: rolesError, loading: rolesLoading} = useFetchData( 'roles' );


  return (
    <>
      <Box m="20px"
        width={`calc(100% - 60px)`}
        // border={2}
        // borderColor={'yellow'}
        height={"90%"}
        display={'flex'}
        flexDirection={'column'}
        gap={5}
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
        <PermisosComponent/>
      </Box>

    </>
  )
}
