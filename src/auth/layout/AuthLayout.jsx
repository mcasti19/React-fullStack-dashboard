
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
            <Grid2
                item
                className="box-shadow"
                xs={3}
                sx={{
                    width: {sm: 450},
                    backgroundColor: 'white',
                    padding: 3,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h5" sx={{textAlign: 'center'}}>{title}</Typography>

                {children}

            </Grid2>
        </Grid2>
    )
};