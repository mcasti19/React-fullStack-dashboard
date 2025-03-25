import {useMemo} from "react";
import {Box, Button, Chip, CircularProgress, IconButton, Tooltip, Typography, useTheme} from "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {tokens} from "../../../theme";

import Header from "../../components/Header";
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import useApi from '../../../hooks/useApi';
import {useNavigate} from 'react-router';
import {getRoleColor, getRoleIcon} from './helper/helpers';

export const UsersPage = () => {
  const theme = useTheme();
  const colors = tokens( theme.palette.mode );
  const {data: users, error, loading, handleDelete, } = useApi( 'users' );

  const navigate = useNavigate();

  // console.log( "DATA DESDE Users PAGE", users );

  //*******************************/ COLUMNS
  const columns = useMemo( () => [

    {field: '_id', headerName: "ID", flex:0.5, minWidth:100 },
    {field: 'name', headerName: "Name", cellClassName: "name-column--cell", flex: 1, minWidth: 120},
    {field: 'username', headerName: "User ", type: "number", headerAlign: "left", align: "left", flex: 1, minWidth: 120 },
    {field: 'email', headerName: "Email", flex: 1.5, minWidth: 250},
    {field: "phone", headerName: "Phone Number", flex: 1, minWidth: 100},
    {
      field: "roles", headerName: "Roles", align: "center", justify: "center", flex: 1, minWidth: 120,
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
      justify: "center",
      align: "center",
      // headerAlign: "center",
      renderCell: ( {row} ) => {
        return (
          <Box >
            <Tooltip title="Editar usuario">
              <IconButton
                onClick={() => navigate( `/users/edit/${ row._id }` )}
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

  const getRowId = ( row ) => row._id;


  //**************************************************/ LOADING
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

  //**************************************************/ ERROR
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
    navigate( '/users/create' );
  }

  return (
    // <Box m="20px" width={`calc(100% - 60px)`} minWidth={900}>
    <Box className='flex flex-col grow w-full md:w-[90%] m-auto'>
      <Box className='flex flex-col justify-between items-center md:flex-row'>
        <Header title="Users" subtitle="Managing the Team Members" />
        <Button className="text-sm font-bold flex justify-between items-center"
          sx={{backgroundColor: colors.blueAccent[ 700 ], color: colors.grey[ 100 ], }}
          onClick={newUser}
        >
          <GroupAddOutlinedIcon sx={{mr: "15px"}} />
          New
        </Button>

      </Box>

      <Box
        className='border-1 border-slate-500 mt-10 w-full h-full rounded-sm'
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            // overflow: 'auto'
          },
          "& .MuiDataGrid-cell, .MuiDataGrid-columnHeader": {
            borderBottom: "none",
            background: "transparent !important",
            fontSize: '16px',
            color: colors.greenAccent[ 200 ],
          },
          "& .name-column--cell": {
            // color: colors.greenAccent[ 300 ],
          },
          "& .MuiDataGrid-container--top [role=row]": {
            // backgroundColor: colors.blueAccent[ 200 ],
            backgroundColor: "transparent",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[ 400 ],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[ 900 ],
          },
          "& .MuiCheckbox-root": {
            color: `${ colors.greenAccent[ 200 ] } !important`,
          },
        }}
      >
        <DataGrid
          sx={{height: '100%'}}
          rows={users}
          columns={columns}
          disableColumnResize
          disableColumnMenu
          density='comfortable'
          getRowId={getRowId}
          components={{
            Toolbar: GridToolbar
          }}
        />
      </Box>
    </Box>
  );
};