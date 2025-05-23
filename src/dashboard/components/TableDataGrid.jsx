import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    Tooltip,
    Typography,
    useTheme
} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';

import {tokens} from '../../theme';

// import {CustomToolbar} from "./ToolbarDataGrid";

export const TableDataGrid = ( {
    title,
    subtitle,
    rows,
    columns,
    rowCount,
    loading,
    error,
    paginationModel,
    onPaginationModelChange,
    pageSizeOptions = [ 5, 10, 15, 25, 100 ],
    createButton,
    getRowId = ( row ) => row._id || row.id,
    entityName = 'registros',
    // density,
    // eslint-disable-next-line no-unused-vars
    getRowIndex // Nueva prop para calcular el índice de la fila
} ) => {
    const theme = useTheme();
    const colors = tokens( theme.palette.mode );

    if ( error ) {
        return (
            <Box className='h-screen flex justify-center items-center'>
                <Typography variant='h6' component='div'>
                    Error al cargar {entityName}: {error.message}
                </Typography>
            </Box>
        );
    }

    if ( loading ) {
        return (
            <Box className='h-screen flex flex-col gap-4 justify-center items-center'>
                <Typography variant='h6' component='div'>
                    Cargando {entityName}...
                </Typography>
                <CircularProgress color='info' />
            </Box>
        );
    }

    return (
        <Box className='flex flex-col grow w-full md:w-[90%] m-auto'>
            <Box className='flex flex-col justify-between items-center md:flex-row'>
                <Box>
                    <Typography variant='h3' sx={{color: colors.grey[ 100 ]}}>
                        {title}
                    </Typography>
                    <Typography variant='h5' sx={{color: colors.greenAccent[ 400 ]}}>
                        {subtitle}
                    </Typography>
                </Box>
                {createButton}
            </Box>

            <Box
                className=' mt-10 w-full h-full rounded-sm'
                m="40px 0 0 0"
                width={`100%`}
                height="75vh"
                sx={{
                    '& .MuiDataGrid-root': {border: 'none', borderRadius: '20px', },
                    '& .MuiDataGrid-cell, .MuiDataGrid-columnHeader': {
                        borderBottom: 'none',
                        // background: 'transparent !important',
                        fontSize: '16px',
                        color: colors.greenAccent[ 200 ],
                        backgroundColor: colors.primary[ 400 ],
                        display: 'flex',
                        alignItems: 'center'
                        // padding: '10px'
                    },
                    '& .MuiDataGrid-virtualScroller': {
                        backgroundColor: colors.primary[ 400 ],
                        // padding:'0 20px'   
                    },
                    '& .MuiDataGrid-footerContainer': {
                        borderTop: 'none',
                        backgroundColor: colors.blueAccent[ 900 ]
                    },
                    '& .MuiCheckbox-root': {
                        color: `${ colors.greenAccent[ 200 ] } !important`
                    }
                }}
            >
                <DataGrid
                    sx={{height: '100%'}}
                    rows={rows}
                    columns={columns}
                    loading={loading}
                    // disableColumnResize
                    // disableColumnMenu
                    // density={density}
                    density='comfortable'
                    getRowId={getRowId}
                    pagination
                    paginationMode='server'
                    rowCount={rowCount}
                    pageSizeOptions={pageSizeOptions}
                    paginationModel={paginationModel}
                    onPaginationModelChange={onPaginationModelChange}
                    checkboxSelection
                />
            </Box>
        </Box>
    );
};

export const TableActionButton = ( {icon, tooltip, color, onClick} ) => (
    <Tooltip title={tooltip}>
        <IconButton onClick={onClick} sx={{color}}>
            {icon}
        </IconButton>
    </Tooltip>
);