import {Box, Typography, useTheme} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import {Link, useLocation} from "react-router"; // Asegúrate de importar Link
import {MenuItem} from "react-pro-sidebar";
import {tokens} from "../theme";

export const MenuItems = ( {isCollapsed, role} ) => {
    const theme = useTheme();
    const colors = tokens( theme.palette.mode );
    const {pathname} = useLocation();
    const menuItems = [
        {title: 'Dashboard', to: '/dashboard', icon: <HomeOutlinedIcon />},
        {type: 'header', title: 'Data'},
        {title: 'Manage Team', to: '/users', icon: <PeopleOutlinedIcon />, },
        {title: 'Employees', to: '/employees', icon: <ContactsOutlinedIcon />, role: 'admin'},
        {title: 'Invoices Balances', to: '/invoices', icon: <ReceiptOutlinedIcon />},
        {type: 'header', title: 'Pages'},
        {title: 'Profile Page', to: '/profile', icon: <PersonOutlinedIcon />},
        {title: 'Calendar', to: '/calendar', icon: <CalendarTodayOutlinedIcon />},
        // {title: 'FAQ Page', to: '/faq', icon: <HelpOutlineOutlinedIcon />},
        {type: 'header', title: 'Charts'},
        {title: 'Bar Chart', to: '/bar', icon: <BarChartOutlinedIcon />},
        {title: 'Pie Chart', to: '/pie', icon: <PieChartOutlineOutlinedIcon />},
        {title: 'Line Chart', to: '/line', icon: <TimelineOutlinedIcon />},
    ];

    return (
        <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {menuItems.map( ( item, index ) => {
                if ( item.role && item.role !== role ) return null;

                if ( item.type === 'header' ) {
                    return (
                        <Typography
                            key={index}
                            variant="h6"
                            color={colors.greenAccent[ 100 ]}
                            sx={{m: "15px 0 5px 20px"}}
                        >
                            {item.title}
                        </Typography>
                    );
                }

                return (
                    <MenuItem
                        key={item.to}
                        active={pathname === item.to}
                        icon={item.icon}
                        component={<Link to={item.to} />}
                    >
                        <Typography >
                            {item.title}
                        </Typography>
                    </MenuItem>
                );
            } )}
        </Box>
    );
};

// export default NavSection;