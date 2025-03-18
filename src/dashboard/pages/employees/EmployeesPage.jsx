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
import {useFetchData} from "../../../hooks/useApi";

export const EmployeesPage = () => {
  const theme = useTheme();
  const colors = tokens( theme.palette.mode );
  const {data, error, loading, refetch, axiosInstance} = useFetchData( 'employees' );
  const navigate = useNavigate();

  console.log( 'EMPLOYEES>>>: ', data );

  const handleDelete = useCallback( async ( id, name ) => {
    try {
      if ( window.confirm( `¿Eliminar a ${ name }?` ) ) {
        await axiosInstance.delete( `${ import.meta.env.VITE_API_URL }/employees/${ id }`, id );
        refetch();

      }
    } catch ( error ) {
      console.error( 'Error eliminando:', error );
      alert( error.response?.data?.message || 'Error al eliminar' );
    }
  }, [ axiosInstance, refetch ] );

  const getRowId = ( row ) => row._id;


  const columns = useMemo( () => [
    {
      field: "id",
      headerName: "#",
      flex: 1,
      maxWidth: 50,
      renderCell: ( params ) => {
        const rowIndex = data.findIndex( row => row._id === params.row._id ) + 1;
        return <span>{rowIndex}</span>;
      }

    },
    {field: "name", headerName: "Name", cellClassName: "name-column--cell", flex: 1, minWidth: 100},
    {field: "last_name", headerName: "Last Name", cellClassName: "name-column--cell", flex: 1, minWidth: 100},
    {field: "age", headerName: "Age", type: "number", headerAlign: "left", align: "left", flex: 1, maxWidth: 50, },
    {
      field: 'userId', headerName: "UserName", headerAlign: "left", align: "left", flex: 1, maxWidth: 100,
      renderCell: ( params ) => params.value?.username || '-'
    },
    {field: "phone", headerName: "Phone Number", },
    {field: "email", headerName: "Email", flex: 1, minWidth: 180, },
    {field: "position", headerName: "Position", flex: 1, minWidth: 180},
    {field: "department", headerName: "Department", },
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
      <Box className='h-screen flex flex-col gap-4 justify-center items-center'>
        <Typography variant="h6" component="div">
          Loading Employees...
        </Typography>
        <CircularProgress color='info' />
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
    // <Box m="0 20px">
    <Box>
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
      <Box
        m="40px 0 0 0"
        width={`100%`}
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            overflow: 'auto'
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            // color: colors.greenAccent[ 300 ],
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
          // overflowX: 'auto', // Agrega esta propiedad para permitir scroll horizontal
          // overflowY: 'auto', // Agrega esta propiedad para permitir scroll vertical
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