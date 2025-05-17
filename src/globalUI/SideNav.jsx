import {useEffect, useState} from "react";
import {Sidebar, Menu, MenuItem} from "react-pro-sidebar";
import {useSelector} from "react-redux";

import {Box, IconButton, Typography, useTheme} from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import {tokens} from "../theme";

import {SidebarHeader} from "./SidebarHeader";
import {MenuItems} from "./MenuItems";

export const SideNav = () => {
  const theme = useTheme();
  const colors = tokens( theme.palette.mode );
  const [ isCollapsed, setIsCollapsed ] = useState( window.innerWidth < 768 );
  const [ role, setRole ] = useState( 'user' )
  const {user} = useSelector( ( state ) => state.auth );


  useEffect( () => {
    if ( user?.roles ) {
      const userRole = user?.roles[ 0 ]?.name;
      // console.log( userRole );
      setRole( userRole )
    }
  }, [ user?.roles ] )

  useEffect( () => {
    const handleResize = () => setIsCollapsed( window.innerWidth < 768 );
    window.addEventListener( "resize", handleResize );
    return () => window.removeEventListener( "resize", handleResize );
  }, [] );


  return (
    <Sidebar
      collapsed={isCollapsed}
      rootStyles={{
        border: "0",
        "& .ps-sidebar-container": {background: `${ colors.primary[ 400 ] } !important`, height: "100%"},
        "& .ps-menu-button:hover": {color: "#6575b7 !important", backgroundColor: "transparent !important"},
        "& .ps-menu-button.ps-active": {color: "red !important"},
        "& .MuiTypography-h6": {margin: "10px 5px"},
      }}
      className="border-2 !important"
    >
      <Menu iconShape="square">
        <MenuItem
          onClick={() => setIsCollapsed( !isCollapsed )}
          icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
          style={{margin: "5px 0", color: colors.grey[ 100 ]}}
        >
          {!isCollapsed && (
            <Box className="flex justify-between items-center ml-3.5">
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

        <MenuItems isCollapsed={isCollapsed} role={role} />

      </Menu>
    </Sidebar>
  );
};