import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import {Box, Grid2} from '@mui/material';

export default function Variants() {
    return (
        <Stack spacing={1}>
            {/* For variant="text", adjust the height via font-size */}
            {/* <Skeleton variant="text" sx={{ fontSize: '1rem', height:'100vh' }} /> */}
            {/* For other variants, adjust the size with `width` and `height` */}
            {/* <Skeleton variant="circular" width={40} height={40} /> */}
            {/* <Skeleton variant="rounded" width={210} height={60} /> */}


            <Grid2 container spacing={0} >
                <Grid2 size={{xs: 12, lg: 2}} border={1}>
                    <Skeleton variant="rectangular"  height='100vh' />
                </Grid2>
                <Grid2 size={{xs: 12, lg: 10}} className='p-5'>
                    <Box className='flex flex-col justify-end items-end'>
                        <Box className='flex gap-2'>
                            <Skeleton variant="circular" width={50} height={50} />
                            <Skeleton variant="circular" width={50} height={50} />
                            <Skeleton variant="circular" width={50} height={50} />
                            <Skeleton variant="circular" width={50} height={50} />
                            <Skeleton variant="circular" width={50} height={50} />
                        </Box>

                        <Box className='w-full flex-grow-2 border-0 gap-2.5 '>
                            <Grid2 container spacing={2} className='w-full border-2'>
                                <Grid2 size={{xs: 12, md: 6, lg: 3}}>
                                    <Skeleton variant='rectangular' className='w-full' />
                                </Grid2>
                                <Grid2 size={{xs: 12, md: 6, lg: 3}}>
                                    <Skeleton variant='rectangular' className='w-full' />
                                </Grid2>
                                <Grid2 size={{xs: 12, md: 6, lg: 3}}>
                                    <Skeleton variant='rectangular' className='w-full' />
                                </Grid2>
                                <Grid2 size={{xs: 12, md: 6, lg: 3}}>
                                    <Skeleton variant='rectangular' className='w-full' />
                                </Grid2>
                            </Grid2>

                            <Grid2 container>
                                <Grid2 size={{xs: 12, sm: 12, md: 12, lg: 8}} border={1}>
                                    <Box className='flex flex-col p-4 gap-3 w-full'>
                                    </Box>
                                </Grid2>

                                <Grid2 size={{xs: 12, sm: 12, md: 12, lg: 4}} border={1}>
                                    <Box className='h-[300px] overflow-auto grow'>
                                        <Box className='flex justify-between items-center p-3.5'>
                                            <Skeleton variant="text" sx={{fontSize: '1rem'}} />
                                        </Box>
                                    </Box>
                                </Grid2>
                            </Grid2>





                            <Grid2 container>

                            </Grid2>

                        </Box>
                    </Box>
                </Grid2>
            </Grid2>
        </Stack>
    );
}
