import {useEffect, useMemo, useState} from "react";
import {Link, useLocation} from "react-router";
import {Sidebar, Menu, MenuItem} from "react-pro-sidebar";
import {Box, IconButton, Typography, useTheme} from "@mui/material";

import {tokens} from "../theme";
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
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HttpsIcon from '@mui/icons-material/Https';
import {useSelector} from "react-redux";
import {SidebarHeader} from "./SidebarHeader";
// import {useQueryClient} from "@tanstack/react-query";

export const SideNav = () => {
  const theme = useTheme();
  const colors = tokens( theme.palette.mode );
  const {pathname} = useLocation();

  const [ isCollapsed, setIsCollapsed ] = useState( window.innerWidth < 768 );

  const {user, status} = useSelector( state => state.auth );
  const role = user?.roles[ 0 ].name;

  // const queryClient = useQueryClient();
  const routes = useMemo( () => ( {
    '/dashboard': 'Dashboard',
    '/users': 'Manage Team',
    '/employees': 'Employees',
    '/invoices': 'Invoices Balances',
    '/form': 'Profile Form',
    '/calendar': 'Calendar',
    '/faq': 'FAQ Page',
    '/bar': 'Bar Chart',
    '/pie': 'Pie Chart',
    '/line': 'Line Chart'
  } ), [] )

  useEffect( () => {
    console.log( 'SideNav: ', {user}, user?.roles[ 0 ].name );
  }, [ user, status ] )

  // const Item = ( {title, to, icon} ) => {

  //   // const prefetchData = () => {
  //   //   console.log( 'Prefetching' );
  //   //   queryClient.prefetchQuery( {
  //   //     queryKey: [ routes[ pathname ] === title, page, pageSize ],
  //   //     queryFn: () => getIssue( issue.number ),
  //   //     staleTime: 1000 * 60
  //   //   } )
  //   // }

  //   return (
  //     <MenuItem
  //       // onMouseEnter={prefetchData}
  //       active={routes[ pathname ] === title}
  //       style={{color: colors.grey[ 100 ]}}
  //       icon={icon}
  //       component={<Link to={to} />}
  //     >
  //       <Typography>{title}</Typography>
  //     </MenuItem>
  //   );
  // };


  // Unificar useEffect para resize y estado inicial
  useEffect( () => {
    const handleResize = () => setIsCollapsed( window.innerWidth < 768 );
    handleResize(); // Ejecutar inmediatamente para estado inicial
    window.addEventListener( 'resize', handleResize );
    return () => window.removeEventListener( 'resize', handleResize );
  }, [] );


  return (
    <Sidebar
      collapsed={isCollapsed}
      rootStyles={{
        border: "0",
        "& .ps-sidebar-container": {background: `${ colors.primary[ 400 ] } !important`, height: "100%"},
        "& .ps-menu-button:hover": {color: "#6575b7 !important", backgroundColor: "transparent !important", },
        "& .ps-menu-button.ps-active": {color: "red !important", },
        "& .MuiTypography-h6": {margin: "10px 5px", },
      }}
      className="border-2 !important"
    >

      <Menu iconShape="square">
        {/* LOGO AND MENU ICON */}
        <MenuItem
          onClick={() => setIsCollapsed( !isCollapsed )}
          icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
          style={{
            margin: "5px 0 5px 0",
            color: colors.grey[ 100 ],
          }}
        >
          {!isCollapsed && (
            <Box className='flex justify-between items-center ml-3.5'>
              <Typography variant="h3" color={colors.grey[ 200 ]}>
                CASTDEV
              </Typography>
              <IconButton onClick={() => setIsCollapsed( !isCollapsed )}>
                <MenuOutlinedIcon />
              </IconButton>
            </Box>
          )}
        </MenuItem>

        <Box mb="25px">
          <SidebarHeader isCollapsed={isCollapsed} user={user} colors={colors} />
        </Box>

        <Box paddingLeft={isCollapsed ? undefined : "10%"}>
          <Item title="Dashboard" to="/dashboard" icon={<HomeOutlinedIcon />} />
          <Typography variant="h6" color={colors.grey[ 300 ]} sx={{m: "15px 0 5px 20px"}} >Data</Typography>

          {role === 'admin' && <Item title="Manage Team" to="/users" icon={<PeopleOutlinedIcon />} />}
          {/* <Item
            title="Manage Team" to="/users" icon={<PeopleOutlinedIcon />}
          /> */}

          <Item title="Employees" to="/employees" icon={<ContactsOutlinedIcon />} />
          <Item title="Invoices Balances" to="/invoices" icon={<ReceiptOutlinedIcon />} />

          <Typography variant="h6" color={colors.grey[ 300 ]} sx={{m: "15px 0 5px 20px"}}>Pages</Typography>

          <Item title="Profile Form" to="/form" icon={<PersonOutlinedIcon />} />
          <Item title="Calendar" to="/calendar" icon={<CalendarTodayOutlinedIcon />} />
          <Item title="Roles & Permissions" to="/roles" icon={<HttpsIcon />} />

          <Typography variant="h6" color={colors.grey[ 300 ]} sx={{m: "15px 0 5px 20px"}} >Charts</Typography>

          <Item title="Bar Chart" to="/bar" icon={<BarChartOutlinedIcon />} />
          <Item title="Pie Chart" to="/pie" icon={<PieChartOutlineOutlinedIcon />} />
          <Item title="Line Chart" to="/line" icon={<TimelineOutlinedIcon />} />
        </Box>
        
      </Menu>
    </Sidebar >
  );
};