import {useEffect, useMemo} from "react";
import {Box, Button, CircularProgress, IconButton, Tooltip, Typography} from "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {tokens} from "../../../theme";
import Header from "../../components/Header";
import {useTheme} from "@mui/material";

import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from "react-router";
import useApi from "../../../hooks/useApi";
import LoadingSpinner from "../../../globalUI/LoadingSpinner";

export const EmployeesPage = () => {
  const theme = useTheme();
  const colors = tokens( theme.palette.mode );
  const {data: employees, error, isLoading, deleteData} = useApi( 'employees' );
  const navigate = useNavigate();

  const handleDelete = ( id ) => {
    if ( window.confirm( '¿Eliminar este usuario?' ) ) {
      deleteData.mutate( id );
    }
  };

  useEffect( () => {
    // console.log( 'EMPLOYEES>>>: ', employees );
  }, [ employees ] )


  const getRowId = ( row ) => row._id;
  const columns = useMemo( () => [
    {
      field: "id",
      headerName: "#",
      maxWidth: 50,
      renderCell: ( params ) => {
        const rowIndex = employees.findIndex( row => row._id === params.row._id ) + 1;
        return <span>{rowIndex}</span>;
      }
    },
    {field: "name", headerName: "Name", flex: 1},
    {field: "last_name", headerName: "Last Name", flex: 1},
    {field: "age", headerName: "Age", type: "number", headerAlign: "left", align: "left", maxWidth: 50, },
    {
      field: 'userId', headerName: "UserName", headerAlign: "left", align: "left", maxWidth: 100,
      renderCell: ( params ) => params.value?.username || '-'
    },
    {field: "phone", headerName: "Phone Number", },
    {field: "email", headerName: "Email", minWidth: 180, },
    {field: "position", headerName: "Position", flex: 1},
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [ colors, navigate, employees ] )

  const newEmployee = () => {
    navigate( '/employees/create' );
  }

  if ( isLoading ) {
    return (
      <Box className='h-screen flex flex-col gap-4 justify-center items-center'>
        <Typography variant="h6" component="div">
          Loading Employees...
        </Typography>
        <CircularProgress color='info' />
      </Box>
    );
  }
  // console.log( 'ERROR>>>', error );

  if ( error === 'No Employees Found.' ) {
    return (
      <Box className='h-screen flex justify-center items-center'>
        <Typography variant="h6" component="div">
          No hay empleados registrados: {error.message}
        </Typography>
      </Box>
    );
  }

  return (
    // <Box m="0 20px">
    <Box>
      <Box className="flex flex-col justify-between items-center sm:flex-row">
        <Header title="Employees" subtitle="List of Contacts for Future Reference" />
        <Button className="text-sm font-bold flex justify-between items-center"
          sx={{backgroundColor: colors.blueAccent[ 700 ], color: colors.grey[ 100 ], }}
          onClick={newEmployee}
        >
          <GroupAddOutlinedIcon sx={{mr: "15px"}} />
          New
        </Button>

      </Box>
      {

        // ( error ) ? (
        //   <Box className='h-screen flex justify-center items-center'>
        //     <Typography variant="h6" component="div">
        //       No hay empleados registrados: {error.message}
        //     </Typography>
        //   </Box>
        // ) :

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
          }}
        >

          {
            isLoading ? (
              // <LoadingSpinner title="Loading Employees" color='primary'/>
              <Box className='h-screen -mt-32 flex flex-col gap-4 justify-center items-center'>
                <Typography variant="h6" component="div">
                  Loading Employees...
                </Typography>
                <CircularProgress color='info' />
              </Box>
            ) : (
              <DataGrid className="w-full"
                rows={employees.length > 0 ? employees : []}
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
            )}
        </Box>
      }
    </Box>
  );
};