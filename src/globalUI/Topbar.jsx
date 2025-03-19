import {useContext} from "react";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from '@mui/icons-material/Logout';
import {useAuthActions} from "../hooks/useAuthActions";
import Avatar from '@mui/material/Avatar';

import {Box, IconButton, useTheme} from "@mui/material";
import {ColorModeContext, tokens} from "../theme";

export const Topbar = () => {
  const theme = useTheme();
  const colors = tokens( theme.palette.mode );
  const colorMode = useContext( ColorModeContext );

  const getThemeIcon = () => {
    return theme.palette.mode === "dark" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />;
  };
  const {handleLogout} = useAuthActions();


  const topIcons = [
    {
      icon: getThemeIcon,
      onClick: colorMode.toggleColorMode,
    },
    {
      icon: <NotificationsOutlinedIcon />,
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
      onClick: handleLogout,
      // sx: {bgcolor: colors.blueAccent[ 700 ], color: colors.greenAccent[ 100 ]},
    },
  ];

  return (
    <Box className="h-10 mb-4 flex justify-center sm:justify-end">
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