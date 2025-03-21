import {useMemo} from "react";
import {useNavigate} from "react-router";
import useApi from "../../../../hooks/useApi";
import {useTheme} from "@emotion/react";
import {tokens} from "../../../../theme";

export const ColumnsTableEmployees = () => {
    const theme = useTheme();
    const colors = tokens( theme.palette.mode );
    const navigate = useNavigate();
    const {data: employees, handleDelete} = useApi( 'employees' );

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
    ], [ colors, handleDelete, navigate, employees ] )

    return columns;

}