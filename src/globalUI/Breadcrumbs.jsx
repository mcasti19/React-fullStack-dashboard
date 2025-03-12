import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import {Box} from '@mui/material';

function handleClick( event ) {
    event.preventDefault();
    console.info( 'You clicked a breadcrumb.' );
}

export default function BreadcrumbsComponent( {breadcrumbs} ) {
    return (
        <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
                {breadcrumbs.map( ( breadcrumb, index ) => (
                    <Box key={index}>
                        {breadcrumb.href ? (
                            <Link underline="hover" color="inherit" href={breadcrumb.href}>
                                {breadcrumb.label}
                            </Link>
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