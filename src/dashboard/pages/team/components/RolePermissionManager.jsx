import React, {useState, useEffect} from 'react';
import {
    Box,
    Paper,
    Typography,
    Checkbox,
    FormControlLabel,
    Button,
    CircularProgress,
    Snackbar,
    Alert,
    List,
    ListItem,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material';
import {Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon} from '@mui/icons-material';
import roleService from '../../../../helpers/roleServices';
import {useFetchData} from '../../../../hooks/useApi';

const RolePermissionManager = () => {
    // State management
  // State management
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
    const {data} = useFetchData( `roles` );

    // Sample permissions - replace with your actual permissions
    const availablePermissions = [
        {id: 'create_user', name: 'Create User'},
        {id: 'edit_user', name: 'Edit User'},
        {id: 'delete_user', name: 'Delete User'},
        {id: 'view_reports', name: 'View Reports'},
        {id: 'manage_settings', name: 'Manage Settings'},
        {id: 'approve_content', name: 'Approve Content'},
    ];

    // Fetch roles on component mount
    useEffect( () => {
        setRoles( data );
    }, [ data ] );

    const handleRoleSelect = ( role ) => {
        setSelectedRole( role );
    };

    const handlePermissionToggle = ( permissionId ) => {
        if ( !selectedRole ) return;

        setSelectedRole( prev => ( {
            ...prev,
            permissions: prev.permissions.includes( permissionId )
                ? prev.permissions.filter( p => p !== permissionId )
                : [ ...prev.permissions, permissionId ]
        } ) );
    };

    const handleSave = async () => {
        if ( !selectedRole ) return;

        setLoading( true );
        try {
            await roleService.updateRolePermissions( selectedRole._id, selectedRole.permissions );
            setSuccess( 'Role permissions updated successfully' );
            setRoles( data );
        } catch ( err ) {
            console.log( err );

            setError( 'Failed to update role permissions' );
        } finally {
            setLoading( false );
        }
    };

    const handleCreateRole = async () => {
        if ( !newRoleName.trim() ) return;

        setLoading( true );
        try {
            await roleService.createRole( {name: newRoleName, permissions: []} );
            setSuccess( 'Role created successfully' );
            setOpenDialog( false );
            setNewRoleName( '' );
            setRoles( data );
        } catch ( err ) {
            console.log( err );

            setError( 'Failed to create role' );
        } finally {
            setLoading( false );
        }
    };

    const handleDeleteRole = async ( roleId ) => {
        if ( !window.confirm( 'Are you sure you want to delete this role?' ) ) return;

        setLoading( true );
        try {
            await roleService.deleteRole( roleId );
            setSuccess( 'Role deleted successfully' );
            setSelectedRole( null );
            setRoles( data );
        } catch ( err ) {
            console.log( err );

            setError( 'Failed to delete role' );
        } finally {
            setLoading( false );
        }
    };

    return (
        <Box className="p-4">
            <Typography variant="h4" className="mb-4">
                Role & Permission Management
            </Typography>

            <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Roles List */}
                <Paper className="p-4">
                    <Box className="flex justify-between items-center mb-4">
                        <Typography variant="h6">Roles</Typography>
                        <Button
                            startIcon={<AddIcon />}
                            variant="contained"
                            onClick={() => setOpenDialog( true )}
                            size="small"
                        >
                            New Role
                        </Button>
                    </Box>

                    <List>
                        {roles.map( ( role ) => (
                            <ListItem
                                key={role._id}
                                button
                                selected={selectedRole?._id === role._id}
                                onClick={() => handleRoleSelect( role )}
                                className="hover:bg-gray-100"
                            >
                                <ListItemText primary={role.name} />
                                <DeleteIcon
                                    className="text-red-500 cursor-pointer"
                                    onClick={( e ) => {
                                        e.stopPropagation();
                                        handleDeleteRole( role._id );
                                    }}
                                />
                            </ListItem>
                        ) )}
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
                                                color="primary"
                                            />
                                        }
                                        label={permission.name}
                                        className="m-2"
                                    />
                                ) )}
                            </Box>

                            <Box className="mt-4 flex justify-end gap-2">
                                <Button
                                    variant="outlined"
                                    onClick={() => setSelectedRole( null )}
                                    disabled={loading}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={handleSave}
                                    disabled={loading}
                                >
                                    {loading ? <CircularProgress size={24} /> : 'Save Changes'}
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <Typography className="text-center text-gray-500 py-8">
                            Select a role to manage its permissions
                        </Typography>
                    )}
                </Paper>
            </Box>

            {/* Create Role Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog( false )}>
                <DialogTitle>Create New Role</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Role Name"
                        fullWidth
                        value={newRoleName}
                        onChange={( e ) => setNewRoleName( e.target.value )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog( false )}>Cancel</Button>
                    <Button onClick={handleCreateRole} variant="contained">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

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

export default RolePermissionManager;
