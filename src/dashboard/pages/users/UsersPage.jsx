import {useMemo, useState} from 'react';
import {useNavigate} from 'react-router';
import {Button, Chip, useTheme} from '@mui/material';
import {GroupAddOutlined, Edit, Delete} from '@mui/icons-material';


import {getRoleColor, getRoleIcon} from './helper/helpers';
import {TableActionButton, TableDataGrid} from '../../components/TableDataGrid';
import useApi from '../../../hooks/useApi';
import {tokens} from '../../../theme';

export const UsersPage = () => {
  const theme = useTheme();
  const colors = tokens( theme.palette.mode );
  const navigate = useNavigate();
  const [ paginationModel, setPaginationModel ] = useState( {
    page: 0,
    pageSize: 5
  } );

  const {data, error, isLoading, deleteData} = useApi(
    'users',
    paginationModel.page + 1,
    paginationModel.pageSize
  );

  const columns = useMemo( () =>
    [
      {field: '_id', headerName: 'ID', flex: 0.5, minWidth: 100},
      {field: 'name', headerName: 'Name', flex: 1, minWidth: 120},
      {field: 'username', headerName: 'User', flex: 1, minWidth: 120},
      {field: 'email', headerName: 'Email', flex: 1.5, minWidth: 250},
      {field: 'phone', headerName: 'Phone', flex: 1, minWidth: 100},
      {
        field: 'roles',
        headerName: 'Roles',
        flex: 1,
        minWidth: 120,
        renderCell: ( {row: {roles}} ) =>
          roles.map( ( role ) => (
            <Chip
              key={role._id}
              label={role.name}
              icon={getRoleIcon( role.name )}
              size='medium'
              sx={{backgroundColor: getRoleColor( role.name, colors )}}
              className='m-2 w-28'
            />
          ) )
      },
      {
        field: 'actions',
        headerName: 'Actions',
        renderCell: ( {row} ) => (
          <>
            <TableActionButton
              icon={<Edit />}
              tooltip='Editar usuario'
              color={colors.blueAccent[ 400 ]}
              onClick={() => navigate( `/users/edit/${ row._id }` )}
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
      }
    ],
    [ navigate, deleteData, colors ]
  );

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
    <TableDataGrid
      title='Users'
      subtitle='Gestión de miembros del equipo'
      rows={data?.users || []}
      columns={columns}
      rowCount={data?.metadata?.totalItems || 0}
      loading={isLoading}
      error={error}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      createButton={createButton}
      entityName='usuarios'
    />
  );
};