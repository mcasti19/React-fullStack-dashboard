import {Box, Toolbar} from "@mui/material"
import {SideNav, Topbar} from "../components/global";
// const drawerWidth = 280;

export const DashboardLayout = ( {children} ) => {
    return (

        <Box sx={{display: 'flex'}} className="animate__animated animate__fadeIn">
            {/* <Topbar drawerWidth={drawerWidth} />
            <SideNav drawerWidth={drawerWidth} /> */}
            {/* <Topbar />
            <SideNav /> */}

            <Box
                component='main'
                sx={{flexGrow: 1, p: 1}}
            >
                {children}

            </Box>

        </Box>

    )
};