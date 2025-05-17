import {useEffect, useMemo, useState} from 'react';
import {useNavigate} from 'react-router';
import {Box, Button, Chip, Tooltip, Typography, useTheme} from '@mui/material';
import {GroupAddOutlined, Edit, Delete} from '@mui/icons-material';


import {getRoleColor, getRoleIcon} from './helper/helpers';
import {TableActionButton, TableDataGrid} from '../../components/TableDataGrid';
import useApi from '../../../hooks/useApi';
import {tokens} from '../../../theme';
import {ModalEditUser} from './components/ModalEditUser';
import {useSelector} from 'react-redux';
import SkeletonTable from '../../../globalUI/SkeletonTable';


export const UsersPage = () => {
  const theme = useTheme();
  const colors = tokens( theme.palette.mode );
  const navigate = useNavigate();
  const {user} = useSelector( state => state.auth );
  const [ role, setRole ] = useState( 'user' )

  const [ paginationModel, setPaginationModel ] = useState( {
    page: 0,
    pageSize: 5
  } );

  const {data, error, isLoading, deleteData, fetchError} = useApi(
    'users',
    paginationModel.page + 1,
    paginationModel.pageSize
  );

  const [ open, setOpen ] = useState( false );
  const [ userSelected, setUserSelected ] = useState( {} );


  const handleClickOpen = ( user ) => {
    setUserSelected( user )
    setOpen( true );
  };


  const columns = useMemo( () => {
    const baseColumns = [
      {
        field: 'name', headerName: 'Name', flex: 1, minWidth: 200,
        renderCell: ( {row: {name, email}} ) => (
          <Tooltip key={user.id} title={[ name, '  ', email ]} placement="top-start" >
            <Box className='flex-col'>
              <Typography variant='h5'>
                {name}
              </Typography>
              <Typography>
                {email}
              </Typography>
            </Box>
          </Tooltip>
        )
      },
      {field: 'username', headerName: 'User ', flex: 1, minWidth: 120},
      {field: 'status', headerName: 'Status', flex: 1, minWidth: 100},
      {
        field: 'roles',
        headerName: 'Roles',
        flex: 1,
        minWidth: 120,
        headerAlign: 'center',
        align: 'center',
        renderCell: ( {row: {roles}} ) =>
          roles.map( ( role ) => (
            <Chip
              key={role._id}
              label={role.name}
              icon={getRoleIcon( role.name )}
              size='medium'
              sx={{backgroundColor: getRoleColor( role.name, colors )}}
              className='m-2 w-24 flex justify-center items-center'
            />
          ) )
      }
    ];
    if ( role !== 'user' ) {
      baseColumns.push( {
        field: 'actions',
        headerName: 'Actions',
        headerAlign: 'center',
        align: 'center',
        renderCell: ( {row} ) => (
          <>
            <TableActionButton
              icon={<Edit />}
              tooltip='Editar usuario'
              color={colors.blueAccent[ 400 ]}
              onClick={() => handleClickOpen( row )}
            />
            <TableActionButton
              icon={<Delete />}
              tooltip='Eliminar usuario'
              color={colors.redAccent[ 500 ]}
              onClick={() => {
                if ( window.confirm( '¿Eliminar este usuario?' ) ) {
                  deleteData.mutate( row._id );
                }
              }}
            />
          </>
        )
      } );
    }

    return baseColumns;
  }, [ deleteData, colors, role, user.id ] );

  useEffect( () => {
    if ( user ) {
      // console.log( user );
      const userRole = user.roles[ 0 ].name;
      setRole( userRole )
    }
    console.log( data, isLoading );
  }, [ user, role, data, isLoading ] )

  if ( fetchError ) {
    return (
      <div>
        <h1 className=''>Error:{fetchError.response.data}</h1>
      </div>
    )
  }

  const createButton = (
    <Button
      variant='contained'
      startIcon={<GroupAddOutlined />}
      onClick={() => navigate( '/users/create' )}
    >
      New
    </Button>
  );

  return (
    <>
      <ModalEditUser open={open} setOpen={setOpen} userSelected={userSelected} />
      <TableDataGrid
        title='Users'
        subtitle='Gestión de miembros del equipo'
        rows={data?.users?.filter( user => user.username !== 'administrator' ) || []}
        columns={columns}
        rowCount={data?.metadata?.totalItems || 0}
        loading={isLoading}
        error={error}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        createButton={role !== 'user' && createButton}
        entityName='usuarios'
        showToolbar
      />
    </>
  );
};