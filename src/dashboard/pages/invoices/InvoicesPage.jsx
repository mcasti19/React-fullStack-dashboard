import {Box, Button, Tooltip, Typography, useTheme} from "@mui/material";
import {tokens} from "../../../theme";
import {useEffect, useMemo, useState} from "react";
import {Delete, Edit, GroupAddOutlined, Image} from "@mui/icons-material";
import {TableActionButton, TableDataGrid} from "../../components/TableDataGrid";
import useApi from "../../../hooks/useApi";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";


export const InvoicesPage = () => {
  const theme = useTheme();
  const colors = tokens( theme.palette.mode );
  const navigate = useNavigate();

  const {user} = useSelector( state => state.auth );
  const [ role, setRole ] = useState( 'user' )
  const [ paginationModel, setPaginationModel ] = useState( {
    page: 0,
    pageSize: 5
  } );

  const {data: invoices, error, isLoading, deleteData, fetchError} = useApi(
    'invoices',
    paginationModel.page + 1,
    paginationModel.pageSize
  );

  const columns = useMemo( () => {
    const baseColumns = [
      {field: "id", headerName: "ID", minWidth: 150, flex: 1},
      {
        field: 'costumer', headerName: 'Costumer', flex: 1, minWidth: 300,
        renderCell: ( {row: {name, image_url, email}} ) => (
          <Tooltip key={user.id} title={[ name, ' - ', email ]} placement="top-start" >
            <Box className='flex justify-center items-center gap-4'>
              <img
                src={image_url}
                alt="Profile Picture"
                className="h-10 w-10 rounded-full bg-blue-900"
              />
              <Box className='flex-col justify-center items-center gap-4'>
                <Typography variant='h5'>{name}</Typography>
                <Typography variant='h5'>{email}</Typography>
              </Box>
            </Box>
          </Tooltip>
        )
      },
      {
        field: "amount", headerName: "Amount", flex: 1, minWidth: 100, maxWidth: 120,
        renderCell: ( params ) => (
          <Typography color={colors.greenAccent[ 500 ]} >
            ${params.row.amount}
          </Typography>
        ),
      },
      {
        field: "date", headerName: "Date", flex: 1, maxWidth: 220,
      },
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
              tooltip='Edit Invoice'
              color={colors.blueAccent[ 400 ]}
            // onClick={() => handleClickOpen( row )}
            />
            <TableActionButton
              icon={<Delete />}
              tooltip='Delete Invoice'
              color={colors.redAccent[ 500 ]}
              onClick={() => {
                if ( window.confirm( '¿Delete this Invoice?' ) ) {
                  deleteData.mutate( row.id );
                }
              }}
            />
          </>
        )
      } );
    }

    return baseColumns;
  }, [ deleteData, colors, role, user.id ] );

  useEffect( () => {
    if ( user ) {
      const userRole = user.roles[ 0 ].name;
      setRole( userRole )
    }
    console.log( invoices );
  }, [ user, role, invoices ] )

  if ( fetchError ) {
    return (
      <div>
        <h1 className=''>Error:{fetchError.response.data}</h1>
      </div>
    )
  }

  const createButton = (
    <Button
      variant='contained'
      startIcon={<GroupAddOutlined />}
      onClick={() => navigate( '/invoices/create' )}
    >
      New
    </Button>
  );

  return (
    <TableDataGrid
      title='Invoices'
      subtitle='Invoices Management'
      rows={invoices || []}
      columns={columns}
      rowCount={invoices?.metadata?.totalItems || 0}
      loading={isLoading}
      error={error}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      createButton={role !== 'user' && createButton}
      entityName='Invoices'
      showToolbar
      // density='comfortable'
    />
  );
};
