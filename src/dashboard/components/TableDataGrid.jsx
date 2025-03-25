import {useTheme} from '@emotion/react';
import React from 'react'
import {tokens} from '../../theme';
import useApi from '../../hooks/useApi';
import {useNavigate} from 'react-router';

export const TableDataGrid = ( {endpoint, columns} ) => {
    const theme = useTheme();
    const colors = tokens( theme.palette.mode );
    const navigate = useNavigate();
    const {data, error, loading, handleDelete, } = useApi( endpoint );

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
        navigate( `${endpoint}/users/create` );
    }




    return (
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
                    // "& .MuiDataGrid-columnHeader": {
                    //   borderBottom: "none",
                    //   minWidth: "100px"
                    // },
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
                    // checkboxSelection
                    rows={data}
                    columns={columns}
                    disableColumnResize
                    disableColumnMenu
                    density='comfortable'
                    getRowId={getRowId}
                // components={{
                //     Toolbar: GridToolbar
                // }}
                />
            </Box>
        </Box>
    )
}
