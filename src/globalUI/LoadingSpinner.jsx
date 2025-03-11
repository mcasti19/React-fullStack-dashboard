import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const LoadingSpinner = ({ size = 40, className = '' }) => {
  return (
    <Box 
      className={`flex justify-center items-center ${className}`}
      role="status"
    >
      <CircularProgress size={size} />
    </Box>
  );
};

export default LoadingSpinner;
