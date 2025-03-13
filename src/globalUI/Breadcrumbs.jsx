import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import {Box} from '@mui/material';
import {NavLink} from 'react-router';

// function handleClick( event ) {
//     event.preventDefault();
//     console.info( 'You clicked a breadcrumb.' );
// }

export default function BreadcrumbsComponent( {breadcrumbs} ) {
    return (
        <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
                {breadcrumbs.map( ( breadcrumb, index ) => (
                    <Box key={index}>
                        {breadcrumb.to !== undefined ? (
                            <NavLink underline="hover" color="inherit" to={breadcrumb.to}>
                                {breadcrumb.label}
                            </NavLink>
                        ) : (
                            <Typography sx={{color: 'text.primary'}}>
                                {breadcrumb.label}
                            </Typography>
                        )}
                    </Box>
                ) )}
            </Breadcrumbs>
        </div>
    );
}