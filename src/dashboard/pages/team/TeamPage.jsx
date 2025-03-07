import {Fragment, useContext, useEffect} from 'react';
import {Box, Typography, useTheme} from "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {tokens} from "../../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

import useFetchData from '../../../hooks/useFetchData';

export const TeamPage = () => {
  const theme = useTheme();
  const colors = tokens( theme.palette.mode );
  const {data, error} = useFetchData( 'users' );

  const getRowId = ( row ) => row._id;

  const columns = [
    {field: '_id', headerName: "ID"},
    {
      field: 'name',
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: 'username',
      headerName: "User",
      type: "number",
      headerAlign: "left",
      align: "left",
    },

    {
      field: 'email',
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "roles",
      headerName: "Roles",
      flex: 1,
      align: "center",
      justify: "center",
      renderCell: ( {row: {roles}} ) => {
        return (
          <Box className='flex justify-center my-2 mx-auto p-1.5'
            width="50%"
            backgroundColor={
              roles.some( role => role.name === "admin" )
                ? colors.greenAccent[ 500 ]
                : roles.some( role => role.name === "manager" )
                  ? colors.blueAccent[ 500 ]
                  : colors.redAccent[ 700 ]
            }
            borderRadius="4px"
          >
            {roles.map( role => (
              <Fragment key={role._id}>
                {role.name === "admin" && <AdminPanelSettingsOutlinedIcon />}
                {role.name === "manager" && <SecurityOutlinedIcon />}
                {role.name === "user" && <LockOpenOutlinedIcon />}
                <Typography color={colors.grey[ 100 ]} sx={{ml: "5px"}}>
                  {role.name}
                </Typography>
              </Fragment>
            ) )}
          </Box>
        );
      },
    },
  ];


  if ( !user ) {
    return <p>No estas Logueado {error}</p>
  }

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        m="40px 0 0 0"
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
          components={{Toolbar: GridToolbar}}
        />
      </Box>
    </Box>
  );
};

// export default Team;
