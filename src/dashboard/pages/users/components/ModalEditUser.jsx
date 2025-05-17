import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Box, Grid2, Typography, useTheme} from '@mui/material';

import {tokens} from '../../../../theme';
import {RolePermissionManager} from '../../roles/components/RolePermissionManager';

export const ModalEditUser = ( {open, setOpen, userSelected} ) => {
    const theme = useTheme();
    const colors = tokens( theme.palette.mode );

    const [ formValues, setFormValues ] = useState( {
        name: '',
        username: '',
        email: '',
        roles: [],
        permissions: [],
    } );

    const handleChange = ( e ) => {
        const {name, value} = e.target;
        setFormValues( prev => ( {
            ...prev,
            [ name ]: value
        } ) );
    };

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        console.log( formValues );
        handleClose();
    };
    const handleClose = () => {
        setOpen( false );
    };


    useEffect( () => {
        if ( userSelected ) {
            setFormValues( {
                name: userSelected.name,
                username: userSelected.username,
                email: userSelected.email,
                roles: userSelected.roles,
                permissions: userSelected.permissions,
            } );
        }
    }, [ userSelected ] );

    return (
        <>
            <Dialog
                maxWidth={'md'}
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: ( event ) => {
                            event.preventDefault();
                            const formData = new FormData( event.currentTarget );
                            const formJson = Object.fromEntries( formData.entries() );
                            const email = formJson.email;
                            console.log( email );
                            handleClose();
                        },
                    },
                }}
            >
                <DialogTitle sx={{fontSize: '20px'}}>
                    Change Roles & Permissions to : {userSelected.name}
                </DialogTitle>
                <DialogContent className='justify-center items-center sm:flex'>
                    <Grid2 container spacing={3} className='w-full md:w-1/2 flex justify-center items-center border-1 p-10'>
                        <Grid2 >
                            <TextField
                                fullWidth
                                label="ID"
                                name="id"
                                value={userSelected._id || ''}
                                disabled
                                variant="outlined"
                            />
                        </Grid2>

                        <Grid2>
                            <TextField
                                fullWidth
                                label="Nombre"
                                name="name"
                                value={userSelected.name || ''}
                                onChange={handleChange}
                                disabled
                                variant="outlined"
                                required

                            />
                        </Grid2>

                        <Grid2 >
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={userSelected.email || ''}
                                onChange={handleChange}
                                variant="outlined"
                                disabled
                            />
                        </Grid2>

                        <Grid2>
                            <TextField
                                fullWidth
                                label="UserName"
                                name="username"
                                value={userSelected.username || ''}
                                onChange={handleChange}
                                variant="outlined"
                                placeholder={`${ userSelected.username }`}
                                required
                            />
                        </Grid2>

                    </Grid2>
                    <RolePermissionManager />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{color: colors.redAccent[ 400 ]}}>Cancel</Button>
                    <Button onClick={handleSubmit} type="submit" sx={{color: colors.blueAccent[ 400 ]}}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
