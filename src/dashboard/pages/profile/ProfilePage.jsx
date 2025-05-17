import {Label} from '@mui/icons-material';
import {Avatar, Card, Grid2, Paper, Stack} from '@mui/material';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {SkeletonProfile} from '../../../globalUI/SkeletonProfile';

export const ProfilePage = () => {
    // const {user} = useSelector( state => state.auth );

    // const [ isLoading, setIsLoading ] = useState( true )

    // useEffect( () => {
    //     if ( !user ) {
    //         return null
    //     }
    //     setIsLoading( false );
    // }, [ user ] )




    return (


        <div className='bg-slate-200'>
            <img src="./construccion.png" alt="Section_under_contruction" />
        </div>

        // isLoading ? ( <SkeletonProfile /> )
        //     : ( <Grid2 container border={1} height='100%'>
        //         <Grid2>
        //             <Paper className='border-1'>
        //                 <Card>
        //                     <Grid2 container border={1}>
        //                         <Stack>
        //                             <Avatar variant='circular'>
        //                                 <img src="avatar.png" alt="profile-user" width={100} height={100} />
        //                             </Avatar >
        //                         </Stack >
        //                     </Grid2 >
        //                 </Card >
        //             </Paper >
        //         </Grid2 >


        //         <Grid2>
        //         </Grid2>
        //     </Grid2 > )

    );
};