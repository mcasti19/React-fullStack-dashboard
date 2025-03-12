import React from 'react';
import {Box, Button, Chip, CircularProgress, IconButton, Tooltip, Typography, useTheme} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {tokens} from "../../../theme";
import {useGoBack} from "../../../hooks/useGoBack";
import BreadcrumbsComponent from '../../../globalUI/Breadcrumbs';

const breadcrumbs = [
  {
    label: 'Dashboard',
    href: '/',
  },
  {
    label: 'Team',
    href: '/team',
  },
  {
    label: 'Create new User',
  },
];

export const CreateUserPage = () => {
  const theme = useTheme();
  const colors = tokens( theme.palette.mode );
  const goBack = useGoBack( '/team' );

  return (
    <>
      <Box m="20px" width={`calc(100% - 60px)`}>
      <BreadcrumbsComponent breadcrumbs={breadcrumbs} />

        <Button className="text-sm font-bold flex justify-between items-center"
          sx={{backgroundColor: colors.blueAccent[ 700 ], color: colors.grey[ 100 ], }}
          onClick={goBack}>
          <ArrowBackIcon className='mr-1.5' />
          Go Back
        </Button>
      </Box>

    </>
  )
}
