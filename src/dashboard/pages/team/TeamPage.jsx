import {useCallback, useMemo} from "react";
import {Box, Button, Chip, CircularProgress, IconButton, Tooltip, Typography, useTheme} from "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {tokens} from "../../../theme";

import Header from "../../components/Header";
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import useFetchData from '../../../hooks/useApi';
import {useNavigate} from 'react-router';
import {getRoleColor, getRoleIcon} from './helper/helpers';
import LoadingSpinner from "../../../globalUI/LoadingSpinner";

export const TeamPage = () => {
  const theme = useTheme();
  const colors = tokens( theme.palette.mode );
  const {data, error, loading, refetch, axiosInstance} = useFetchData( 'users' );
  const navigate = useNavigate();

  console.log( "DATA DESDE TEAM PAGE", data );

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


  //*******************************/ COLUMNS
  const columns = useMemo( () => [

    {field: '_id', headerName: "ID"},
    {field: 'name', headerName: "Name", flex: 1, cellClassName: "name-column--cell", },
    {field: 'username', headerName: "User ", type: "number", headerAlign: "left", align: "left", },
    {field: 'email', headerName: "Email", flex: 1, },
    {field: "phone", headerName: "Phone Number", flex: 1, },
    {
      field: "roles", headerName: "Roles", flex: 1, align: "center", justify: "center",
      renderCell: ( {row: {roles}} ) => {
        return roles.map( role => (
          <Chip
            key={role._id}
            label={role.name}
            icon={getRoleIcon( role.name )}
            size='medium'
            sx={{backgroundColor: getRoleColor( role.name, colors )}}
            className='m-2 w-28'
          />
        ) );
      }
    },
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
                onClick={() => navigate( `/team/edit/${ row._id }` )}
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

  ], [ colors, handleDelete, navigate ] );

  if ( loading ) {
    return (
      <Box className='h-screen flex flex-col gap-4 justify-center items-center'>
        <Typography variant="h6" component="div">
          Loading Users...
        </Typography>
        <CircularProgress color='info' />
      </Box>
    );
  }
  // console.log( 'ERROR>>>', error );
  if ( error ) {
    return (
      <Box className='h-screen flex justify-center items-center'>
        <Typography variant="h6" component="div">
          Error al cargar usuarios: {error.message}
        </Typography>
      </Box>
    );
  }



  const newUser = () => {
    navigate( '/team/create' );
  }
  return (
    <Box m="20px" width={`calc(100% - 60px)`} minWidth={900}>
      <Box className='flex justify-between items-center'>
        <Header title="TEAM" subtitle="Managing the Team Members" />
        <Button className="text-sm font-bold flex justify-between items-center"
          sx={{backgroundColor: colors.blueAccent[ 700 ], color: colors.grey[ 100 ], }}
          onClick={newUser}
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
            color: colors.greenAccent[ 300 ],
          },
          "& .MuiDataGrid-container--top [role=row]": {
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
        }}
      >
        <DataGrid
          checkboxSelection
          rows={data}
          columns={columns}
          getRowId={getRowId}
          components={{
            Toolbar: GridToolbar
          }}
        />
      </Box>
    </Box>
  );
};