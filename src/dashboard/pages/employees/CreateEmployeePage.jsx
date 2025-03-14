import React from 'react';
import {Box, Button, Chip, CircularProgress, IconButton, Tooltip, Typography} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BreadcrumbsComponent from '../../../globalUI/Breadcrumbs';
import EmployeeForm from './components/EmployeeForm';





const breadcrumbs = [
  {
    label: 'Dashboard',
    to: '/',
  },
  {
    label: 'Employees',
    to: -1,
  },
  {
    label: 'Create new Employee',
  },
];

export const CreateEmployeePage = () => {
  // const theme = useTheme();
  // const colors = tokens( theme.palette.mode );
  // const goBack = useGoBack( '/team' );

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
          <EmployeeForm />
        </Box>
        {/* <PermisosComponent/> */}
      </Box>

    </>
  )
}
