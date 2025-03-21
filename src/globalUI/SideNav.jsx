import {useEffect, useState} from "react";
import {Link, NavLink} from "react-router";
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
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";



const Item = ( {title, to, icon, selected, setSelected} ) => {
  const theme = useTheme();
  const colors = tokens( theme.palette.mode );
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[ 100 ],
      }}
      onClick={() => setSelected( title )}
      icon={icon}
      component={<Link to={to} />}
    >
      {/* <NavLink to={to} /> */}
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

export const SideNav = () => {
  const theme = useTheme();
  const colors = tokens( theme.palette.mode );
  const [ selected, setSelected ] = useState( "Dashboard" );
  const [ isCollapsed, setIsCollapsed ] = useState( false );

  useEffect( () => {
    const handleResize = () => {
      if ( window.innerWidth < 768 ) {
        setIsCollapsed( true );
      } else {
        setIsCollapsed( false );
      }
    };
    window.addEventListener( 'resize', handleResize );
    return () => {
      window.removeEventListener( 'resize', handleResize );
    };
  }, [] );


  return (
    <Sidebar
      collapsed={isCollapsed}
      rootStyles={{
        border: "0",
        "& .ps-sidebar-container": {
          background: `${ colors.primary[ 400 ] } !important`,
          height: "100%"
        },
        "& .ps-menu-button:hover": {
          color: "#6575b7 !important",
          backgroundColor: "transparent !important",
        },
        "& .ps-menu-button.ps-active": {
          color: "red !important",
        },
        "& .MuiTypography-h6": {
          margin: "10px 5px",
        },
      }}
    // className="h-screen"
    >
      <h1 className="text"></h1>
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
                CASTDEVEL
              </Typography>
              <IconButton onClick={() => setIsCollapsed( !isCollapsed )}>
                <MenuOutlinedIcon />
              </IconButton>
            </Box>
          )}
        </MenuItem>

        {!isCollapsed && (
          <Box mb="25px">
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                alt="profile-user"
                // width="100px"
                // height="100px"
                src={'logo.jpg'}
                style={{cursor: "pointer", borderRadius: "50%"}}
                className="w-20"
              />
            </Box>
            <Box textAlign="center">
              <Typography
                variant="h2"
                color={colors.grey[ 100 ]}
                fontWeight="bold"
                sx={{m: "10px 0 0 0"}}
              >
                Moisés Castillo
              </Typography>
              <Typography variant="h5" color={colors.greenAccent[ 500 ]}>
                Full Stack Developer
              </Typography>
            </Box>
          </Box>
        )}

        {isCollapsed && (
          <Box mb="25px">
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                alt="profile-user"
                width="50px"
                height="50px"
                src={'logo.jpg'}
                style={{cursor: "pointer", borderRadius: "50%"}}
              />
            </Box>

          </Box>
        )}

        <Box paddingLeft={isCollapsed ? undefined : "10%"}>
          <Item
            title="Dashboard"
            to="/dashboard"
            icon={<HomeOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />

          <Typography
            variant="h6"
            color={colors.grey[ 300 ]}
            sx={{m: "15px 0 5px 20px"}}
          >
            Data
          </Typography>
          <Item
            title="Manage Team"
            to="/users"
            icon={<PeopleOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Employees"
            to="/employees"
            icon={<ContactsOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Invoices Balances"
            to="/invoices"
            icon={<ReceiptOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />

          <Typography
            variant="h6"
            color={colors.grey[ 300 ]}
            sx={{m: "15px 0 5px 20px"}}
          >
            Pages
          </Typography>
          <Item
            title="Profile Form"
            to="/form"
            icon={<PersonOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Calendar"
            to="/calendar"
            icon={<CalendarTodayOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="FAQ Page"
            to="/faq"
            icon={<HelpOutlineOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />

          <Typography
            variant="h6"
            color={colors.grey[ 300 ]}
            sx={{m: "15px 0 5px 20px"}}
          >
            Charts
          </Typography>
          <Item
            title="Bar Chart"
            to="/bar"
            icon={<BarChartOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Pie Chart"
            to="/pie"
            icon={<PieChartOutlineOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Line Chart"
            to="/line"
            icon={<TimelineOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          {/* <Item
            title="Geography Chart"
            to="/geography"
            icon={<MapOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          /> */}
        </Box>
      </Menu>
    </Sidebar >
    // </Box>
  );
};

// export default SideNav;
