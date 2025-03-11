import {useCallback, useMemo} from "react";
import {Box, Button, CircularProgress, IconButton, Tooltip, Typography} from "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {tokens} from "../../../theme";
import Header from "../../components/Header";
import {useTheme} from "@mui/material";

import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from "react-router";
import useFetchData from "../../../hooks/useApi";

export const EmployeesPage = () => {
  const theme = useTheme();
  const colors = tokens( theme.palette.mode );
  const {data, error, loading, refetch, axiosInstance} = useFetchData( 'employees' );
  const navigate = useNavigate();

  console.log( 'EMPLOYEES>>>: ', data );

  const getRowId = ( row ) => row._id;

  const handleDelete = useCallback( async ( id, name ) => {
    try {
      if ( window.confirm( `¿Eliminar a ${ name }?` ) ) {
        await axiosInstance.delete( `users/${ id }` );
        refetch();
      }
    } catch ( error ) {
      console.error( 'Error eliminando:', error );
      alert( error.response?.data?.message || 'Error al eliminar' );
    }
  }, [ axiosInstance, refetch ] );

  const columns = useMemo( () => [
    // {field: "_id", headerName: "ID", flex: 0.5, },
    {
      field: "id",
      headerName: "#",
      flex: 0.5,
      renderCell: ( params ) => {
        // Obtiene el índice del registro en el array + 1
        const rowIndex = data.findIndex( row => row._id === params.row._id ) + 1;
        //* data.indexOf(row) es O(n), para grandes datasets (>1000 registros) es mejor usar:
        return <span>{rowIndex}</span>;
      }

    },
    {field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell", },
    {field: "last_name", headerName: "Last Name", flex: 1, cellClassName: "name-column--cell", },
    {field: "age", headerName: "Age", type: "number", headerAlign: "left", align: "left", },
    {field: "phone", headerName: "Phone Number", flex: 1, },
    {field: "email", headerName: "Email", flex: 1, },
    {field: "position", headerName: "Position", flex: 1, },
    {field: "department", headerName: "Department", flex: 1, },
    {
      field: "actions",
      headerName: "Actions",
      align: "center",
      headerAlign: "center",
      renderCell: ( {row} ) => {

        return (
          <Box sx={{display: 'flex', gap: 1}}>
            <Tooltip title="Editar usuario">
              <IconButton
                onClick={() => navigate( `/employee/edit/${ row._id }` )}
                sx={{color: colors.blueAccent[ 400 ]}}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton
                onClick={() => handleDelete( row._id, row.name )}
                sx={{color: colors.redAccent[ 600 ]}}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ], [ colors, handleDelete, navigate, data ] )

  const newEmployee = () => {
    navigate( '/employees/create' );
  }

  if ( loading ) {
    return (
      <Box className='h-screen flex justify-center items-center'>
        <Typography variant="h6" component="div">
          Cargando Empleados...
        </Typography>
        <CircularProgress />
      </Box>
    );
  }
  console.log( 'ERROR>>>', error );
  if ( error ) {
    return (
      <Box className='h-screen flex justify-center items-center'>
        <Typography variant="h6" component="div">
          Error al cargar Empleados: {error.message}
        </Typography>
      </Box>
    );
  }

  return (
    <Box m="0 20px">
      <Box className="flex justify-between items-center">
        <Header title="Employees" subtitle="List of Contacts for Future Reference" />

        <Button className="text-sm font-bold flex justify-between items-center"
          sx={{backgroundColor: colors.blueAccent[ 700 ], color: colors.grey[ 100 ], }}
          onClick={newEmployee}
        >
          <GroupAddOutlinedIcon sx={{mr: "15px"}} />
          New
        </Button>

      </Box>
      <Box className="overflow-x-scroll"
        minWidth={900}
        overflow='auto' // Cambia a 'auto' para permitir scroll horizontal y vertical
        m="20px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[ 300 ],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[ 700 ],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[ 400 ],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[ 700 ],
          },
          "& .MuiCheckbox-root": {
            color: `${ colors.greenAccent[ 200 ] } !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${ colors.grey[ 100 ] } !important`,
          },
          overflowX: 'auto', // Agrega esta propiedad para permitir scroll horizontal
          overflowY: 'auto', // Agrega esta propiedad para permitir scroll vertical
        }}
      >
        <DataGrid className="w-full"
          rows={data}
          columns={columns}
          getRowId={getRowId}
          components={{Toolbar: GridToolbar}}
          initialState={{
            sorting: {
              sortModel: [ {
                field: 'id',
                sort: 'asc'
              } ]
            }
          }}

        />
      </Box>
    </Box>
  );
};