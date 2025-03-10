import Grid2 from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import AppTheme from '../shared-theme/AppTheme';
import {CssBaseline} from '@mui/material';
import {styled} from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
// import {SitemarkIcon} from '../pages/sign-up/components/CustomIcons';

const Card = styled( MuiCard )( ( {theme} ) => ( {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing( 4 ),
    gap: theme.spacing( 2 ),
    margin: 'auto',
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [ theme.breakpoints.up( 'sm' ) ]: {
        width: '450px',
    },
    ...theme.applyStyles( 'dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    } ),
} ) );


const AuthContainer = styled( Stack )( ( {theme} ) => ( {
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing( 2 ),
    [ theme.breakpoints.up( 'sm' ) ]: {
        padding: theme.spacing( 4 ),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles( 'dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        } ),
    },
} ) );



export const AuthLayout = ( {children, title = ''} ) => {
    return (
        <AppTheme>
            <CssBaseline enableColorScheme />
            <AuthContainer direction="column" justifyContent="space-between" >
                <ColorModeSelect sx={{position: 'fixed', top: '1rem', right: '1rem'}} />
                <Card variant="outlined">
                    {/* <SitemarkIcon /> */}
 
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
                    >{title}</Typography>
                    {children}


                </Card>

            </AuthContainer>
        </AppTheme>
    )
};