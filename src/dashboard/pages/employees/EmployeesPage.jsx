import {Box, Button} from "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {tokens} from "../../../theme";
import Header from "../../components/Header";
import {useTheme} from "@mui/material";
import {useEffect, useState} from "react";
import {fetchEmployees} from "../../../helpers/api";
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import {Link, useNavigate} from "react-router";

export const EmployeesPage = () => {
  const theme = useTheme();
  const colors = tokens( theme.palette.mode );

  const [ employees, setEmployees ] = useState( [] );

  // console.log( employees );

  useEffect( () => {
    fetchEmployees()
      .then( ( response ) => {
        const employeesWithId = response.map( ( employee, index ) => ( {
          ...employee,
          id: index + 1,
        } ) );
        setEmployees( employeesWithId );
      } )
      .catch( ( error ) => {
        console.error( error );
      } );

  }, [] );

  const columns = [
    {field: "id", headerName: "ID", flex: 0.5, },
    {field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell", },
    {field: "last_name", headerName: "Last Name", flex: 1, cellClassName: "name-column--cell", },
    {field: "age", headerName: "Age", type: "number", headerAlign: "left", align: "left", },
    {field: "phone", headerName: "Phone Number", flex: 1, },
    {field: "email", headerName: "Email", flex: 1, },
    {field: "position", headerName: "Position", flex: 1, },
    {field: "department", headerName: "Department", flex: 1, },
  ];
  const navigate = useNavigate();

  const newEmployee = () => {
    navigate( '/employees/create' );
  }

  return (
    <Box m="0 20px">
      <Box className="flex justify-between items-center">
        <Header title="Employees" subtitle="List of Contacts for Future Reference" />

        {/* <Link to="/create"> */}
        <Button className="text-sm font-bold flex justify-between items-center"
          sx={{backgroundColor: colors.blueAccent[ 700 ], color: colors.grey[ 100 ], }}
          onClick={newEmployee}
        >
          <GroupAddOutlinedIcon sx={{mr: "15px"}} />
          New
        </Button>
        {/* </Link> */}


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
          rows={employees}
          columns={columns}
          // getRowId={getRowId}
          components={{Toolbar: GridToolbar}}
        />
      </Box>
    </Box>
  );
};

// export default Employees;
