import {Box, Typography, useTheme} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {tokens} from "../../../theme";
// import {mockDataInvoices} from "../../../data/mockData";
import Header from "../../components/Header";
import {useEffect, useState} from "react";
import useAxios from "../../../hooks/useAxios";
import {Image} from "@mui/icons-material";


export const InvoicesPage = () => {
  const theme = useTheme();
  const colors = tokens( theme.palette.mode );
  const axiosInstance = useAxios();
  const [ invoices, setInvoices ] = useState( [] );

  useEffect( () => {
    async function obtenerInvoices() {
      try {
        const response = await axiosInstance.get( `${ import.meta.env.VITE_API_URL }/invoices` );

        if ( response.status >= 200 && response.status < 300 ) {
          setInvoices( response.data );
          console.log( response.data );
        } else {
          console.error( `Error ${ response.status }: ${ response.statusText }` );
        }
      } catch ( error ) {
        console.error( `Error: ${ error.message }` );
      }
    }
    obtenerInvoices();

  }, [ axiosInstance ] )


  const columns = [
    {field: "id", headerName: "ID"},
    {
      field: "image_url", headerName: "Picture",
      renderCell: ( params ) => (
        <img
          src={params.image_url}
          alt="Profile Picture"
          className="h-10 w-10 rounded-full bg-blue-900"
        />
      )
    },
    {field: "name", headerName: "Customer", flex: 1, cellClassName: "name-column--cell", },

    {field: "email", headerName: "Email", flex: 1, },
    {
      field: "amount", headerName: "Amount", flex: 1, justify: "center",
      renderCell: ( params ) => (
        <Typography color={colors.greenAccent[ 500 ]} >
          ${params.row.amount}
        </Typography>
      ),
    },
    {
      field: "date", headerName: "Date", flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="INVOICES" subtitle="List of Invoice Balances" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            alignContent: "center"
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
        }}
      >
        <DataGrid checkboxSelection rows={invoices} columns={columns} />
      </Box>
    </Box>
  );
};
