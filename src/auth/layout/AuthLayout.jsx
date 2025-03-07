import Grid2 from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

export const AuthLayout = ( {children, title = ''} ) => {
    return (
        <Grid2
            container
            spacing={0}
            direction="column"
            alignContent="center"
            justifyContent="center"
            sx={{minHeight: '100vh', backgroundColor: 'primary.main', padding: 4}}
        >
            <Grid2 className="flex flex-col justify-center items-center box-shadow bg-slate-600 p-3 rounded-2xl w-96" >
                <Typography variant="h5" sx={{textAlign: 'center'}}>{title}</Typography>
                {children}
            </Grid2>
        </Grid2>
    )
};