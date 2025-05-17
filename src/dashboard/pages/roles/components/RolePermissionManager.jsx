import React, {useState, useEffect} from 'react';
import {
    Box,
    Paper,
    Typography,
    Checkbox,
    FormControlLabel,
    Snackbar,
    Alert,
    List,
    ListItem,
    ListItemText,

} from '@mui/material';

import {Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon} from '@mui/icons-material';
import useApi from '../../../../hooks/useApi';

export const RolePermissionManager = () => {
    const {data, isLoading, error} = useApi( `roles` );
    const [ roles, setRoles ] = useState( [] );
    const [ selectedRole, setSelectedRole ] = useState( null );
    const [ success, setSuccess ] = useState( null );

    // Sample permissions - replace with your actual permissions
    const availablePermissions = [
        {id: 'create_user', name: 'Create User'},
        {id: 'edit_user', name: 'Edit User'},
        {id: 'delete_user', name: 'Delete User'},
        {id: 'view_reports', name: 'View Reports'},
        {id: 'manage_settings', name: 'Manage Settings'},
        {id: 'approve_content', name: 'Approve Content'},
    ];

    useEffect( () => {
        // console.log( isLoading );

        if ( roles ) {
            console.log( roles );
        }
    }, [ roles, isLoading ] )


    // Fetch roles on component mount
    useEffect( () => {
        setRoles( data );
    }, [ data ] );

    const handleRoleSelect = ( role ) => {
        setSelectedRole( role );
    };

    const handlePermissionToggle = ( permissionId ) => {
        if ( !selectedRole ) return;
        console.log( selectedRole );


        setSelectedRole( prev => ( {
            ...prev,
            permissions: prev.permissions.includes( permissionId )
                ? prev.permissions.filter( p => p !== permissionId )
                : [ ...prev.permissions, permissionId ]
        } ) );
    };

    return (
        <Box className="p-4 w-full gap-3 flex flex-col">
            <Typography variant="h4" className="mb-4">
                Role & Permission Management
            </Typography>

            <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Roles List */}
                <Paper className="p-4 flex gap-3">
                    <List className='w-full flex flex-col justify-between items-center'>
                        {isLoading ? <h1>Loading</h1>
                            : (
                                roles?.map( ( role ) => (
                                    role.name !== 'admin' &&
                                    <ListItem
                                        key={role._id}
                                        selected={selectedRole?._id === role._id}
                                        onClick={() => handleRoleSelect( role )}
                                        className="flex justify-between items-center gap-2 hover:bg-slate-600"
                                    >
                                        <ListItemText primary={role.name} />
                                    </ListItem>
                                ) )
                            )
                        }
                    </List>
                </Paper>

                {/* Permissions Panel */}
                <Paper className="p-4 md:col-span-2">
                    {selectedRole ? (
                        <>
                            <Typography variant="h6" className="mb-4">
                                Permissions for {selectedRole.name}
                            </Typography>

                            <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {availablePermissions.map( ( permission ) => (
                                    <FormControlLabel
                                        key={permission.id}
                                        control={
                                            <Checkbox
                                                checked={selectedRole.permissions.includes( permission.id )}
                                                onChange={() => handlePermissionToggle( permission.id )}
                                                color="default"
                                            />
                                        }
                                        label={permission.name}
                                        className="m-2"
                                    />
                                ) )}
                            </Box>
                        </>
                    ) : (
                        <Typography className="text-center text-gray-500 py-8">
                            Select a role to manage its permissions
                        </Typography>
                    )}
                </Paper>
            </Box>

            {/* Notifications */}
            <Snackbar
                open={!!error || !!success}
                autoHideDuration={6000}
                onClose={() => {
                    setError( null );
                    setSuccess( null );
                }}
            >
                <Alert
                    severity={error ? 'error' : 'success'}
                    onClose={() => {
                        setError( null );
                        setSuccess( null );
                    }}
                >
                    {error || success}
                </Alert>
            </Snackbar>
        </Box>
    );
};