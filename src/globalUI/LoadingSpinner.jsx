import React from 'react';
import {CircularProgress, Box, Typography} from '@mui/material';

const LoadingSpinner = ( {title = ''} ) => {
  return (
    <Box className='h-screen flex flex-col gap-4 justify-center items-center'>
      <Typography variant="h6" component="div">
        {title}
      </Typography>
      <CircularProgress color='primary' />
    </Box>
  );
};

export default LoadingSpinner;
