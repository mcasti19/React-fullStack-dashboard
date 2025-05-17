import {useEffect, useMemo, useState} from 'react';
import {useNavigate} from 'react-router';
import {Box, Button, IconButton, Tooltip, Typography, useTheme} from '@mui/material';
import {GroupAddOutlined, Edit, Delete} from '@mui/icons-material';

import {TableDataGrid, TableActionButton} from '../../components/TableDataGrid';
import {tokens} from '../../../theme';
import useApi from '../../../hooks/useApi';
import {useSelector} from 'react-redux';

export const EmployeesPage = () => {
  const theme = useTheme();
  const colors = tokens( theme.palette.mode );
  const navigate = useNavigate();
  const {user} = useSelector( state => state.auth );
  const [ role, setRole ] = useState( 'user' )
  const [ paginationModel, setPaginationModel ] = useState( {
    page: 0,
    pageSize: 10,
  } );

  const {data, error, isLoading, deleteData} = useApi( 'employees', paginationModel.page + 1, paginationModel.pageSize );

  const handleClickOpen = ( employee ) => {
    // setUserSelected( user )
    // setOpen( true );
    console.log( 'EDITING', employee );

  };

  const newEmployee = () => {
    navigate( '/employees/create' );
  };

  const columns = useMemo( () => {
    const baseColumns = [
      {
        field: "id",
        headerName: "#",
        maxWidth: 50,
        renderCell: ( params ) => {
          const rowIndex = ( paginationModel.page * paginationModel.pageSize ) + data.employees.findIndex( row => row._id === params.row._id ) + 1;
          return <span>{rowIndex}</span>;
        }
      },
      {field: "name", headerName: "Name", flex: 1, minWidth: 150},
      {field: "last_name", headerName: "Last Name", flex: 1, minWidth: 150},
      {field: "age", headerName: "Age", type: "number", headerAlign: "left", align: "left", maxWidth: 50},
      {
        field: 'userId', headerName: "User Name", headerAlign: "left", align: "left", maxWidth: 100,
        renderCell: ( params ) => params.value?.username || '-'
      },
      {field: "phone", headerName: "Phone Number", minWidth: 150, flex: 1},
      {field: "email", headerName: "Email", minWidth: 240, flex: 1},
      {field: "position", headerName: "Position", minWidth: 150, flex: 1},
      {field: "department", headerName: "Department"},
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
    return baseColumns
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ colors, navigate, paginationModel, data ] );

  useEffect( () => {
    if ( user ) {
      // console.log( user );
      const userRole = user.roles[ 0 ].name;
      setRole( userRole )
    }
    console.log( data );
  }, [ user, role, data ] )

  const createButton = (
    <Button
      variant='contained'
      startIcon={<GroupAddOutlined />}
      onClick={newEmployee}
    >
      Nuevo Empleado
    </Button>
  );

  return (
    <TableDataGrid
      title='Empleados'
      subtitle='Gestión de los empleados'
      rows={data?.employees || []}
      columns={columns}
      rowCount={data?.metadata?.totalItems || 0}
      loading={isLoading}
      error={error}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      createButton={createButton}
      entityName='empleados'
      getRowIndex={( row ) => ( paginationModel.page * paginationModel.pageSize ) + data.employees.findIndex( employee => employee._id === row._id ) + 1}
    />
  );
};