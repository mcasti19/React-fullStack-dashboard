import {useMemo, useState} from 'react';
import {useNavigate} from 'react-router';
import {Box, Button, IconButton, Tooltip, Typography, useTheme} from '@mui/material';
import {GroupAddOutlined, Edit, Delete} from '@mui/icons-material';

import {TableDataGrid, TableActionButton} from '../../components/TableDataGrid';
import {tokens} from '../../../theme';
import useApi from '../../../hooks/useApi';

export const EmployeesPage = () => {
  const theme = useTheme();
  const colors = tokens( theme.palette.mode );
  const navigate = useNavigate();
  const [ paginationModel, setPaginationModel ] = useState( {
    page: 0,
    pageSize: 10,
  } );

  const {data, error, isLoading, deleteData} = useApi( 'employees', paginationModel.page + 1, paginationModel.pageSize );

  const handleDelete = ( id ) => {
    if ( window.confirm( '¿Eliminar este empleado?' ) ) {
      deleteData.mutate( id );
    }
  };

  const newEmployee = () => {
    navigate( '/employees/create' );
  };

  const columns = useMemo( () => [
    {
      field: "id",
      headerName: "#",
      maxWidth: 50,
      renderCell: ( params ) => {
        const rowIndex = ( paginationModel.page * paginationModel.pageSize ) + data.employees.findIndex( row => row._id === params.row._id ) + 1;
        return <span>{rowIndex}</span>;
      }
    },
    {field: "name", headerName: "Name", flex: 1},
    {field: "last_name", headerName: "Last Name", flex: 1},
    {field: "age", headerName: "Age", type: "number", headerAlign: "left", align: "left", maxWidth: 50},
    {
      field: 'userId', headerName: "User Name", headerAlign: "left", align: "left", maxWidth: 100,
      renderCell: ( params ) => params.value?.username || '-'
    },
    {field: "phone", headerName: "Phone Number"},
    {field: "email", headerName: "Email", minWidth: 180},
    {field: "position", headerName: "Position", flex: 1},
    {field: "department", headerName: "Department"},
    {
      field: "actions",
      headerName: "Actions",
      align: "center",
      headerAlign: "center",
      renderCell: ( {row} ) => (
        <Box sx={{display: 'flex', gap: 1}}>
          <TableActionButton
            icon={<Edit />}
            tooltip='Editar empleado'
            color={colors.blueAccent[ 400 ]}
            onClick={() => navigate( `/employees/edit/${ row._id }` )}
          />
          <TableActionButton
            icon={<Delete />}
            tooltip='Eliminar empleado'
            color={colors.redAccent[ 500 ]}
            onClick={() => handleDelete( row._id )}
          />
        </Box>
      ),
    },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [ colors, navigate, paginationModel, data ] );

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