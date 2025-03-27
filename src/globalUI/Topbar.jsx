import {useContext} from "react";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';

import {Box, IconButton, useTheme} from "@mui/material";
import {ColorModeContext, tokens} from "../theme";
import {useAuthStore} from "../hooks/useAuthStore";

export const Topbar = () => {
  const theme = useTheme();
  const colors = tokens( theme.palette.mode );
  const colorMode = useContext( ColorModeContext );

  const getThemeIcon = () => {
    return theme.palette.mode === "dark" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />;
  };

  const {startLogout} = useAuthStore();


  const topIcons = [
    {
      icon: getThemeIcon,
      onClick: colorMode.toggleColorMode,
    },
    {
      icon: <Badge color="error" overlap="circular" badgeContent=" " variant="dot">
        <NotificationsOutlinedIcon />
      </Badge>
      // sx: {bgcolor: colors.blueAccent[ 700 ], color: colors.greenAccent[ 100 ]},
    },
    {
      icon: <SettingsOutlinedIcon />,
      // sx: {bgcolor: colors.blueAccent[ 700 ], color: colors.greenAccent[ 100 ]},
    },
    {
      icon: <PersonOutlinedIcon />,
      // sx: {bgcolor: colors.blueAccent[ 700 ], color: colors.greenAccent[ 100 ]},
    },
    {
      icon: <LogoutIcon />,
      onClick: startLogout,
      // sx: {bgcolor: colors.blueAccent[ 700 ], color: colors.greenAccent[ 100 ]},
    },
  ];

  return (
    <Box className="h-10 mb-4 mt-4 flex justify-center md:justify-end md:mt-0">
      <Box className="flex justify-center items-center gap-7 ">
        {topIcons.map( ( topIcon, index ) => (
          <IconButton key={index} onClick={topIcon.onClick} className="border-2 w-5 h-5">
            <Avatar sx={{bgcolor: colors.blueAccent[ 800 ], color: colors.greenAccent[ 100 ]}} className="">
              {typeof topIcon.icon === 'function' ? topIcon.icon() : topIcon.icon}
            </Avatar>
          </IconButton>
        ) )}
      </Box>
    </Box>
  );
};