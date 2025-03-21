import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

export const getRoleIcon = ( roleName ) => {
    const icons = {
        admin: <AdminPanelSettingsOutlinedIcon />,
        manager: <SecurityOutlinedIcon />,
        user: <LockOpenOutlinedIcon />
    };
    return icons[ roleName ] || <LockOpenOutlinedIcon />;
};


export const getRoleColor = ( roleName, colors ) => {
    const colorsMap = {
        admin: colors.greenAccent[ 500 ],
        manager: colors.blueAccent[ 500 ],
        user: colors.redAccent[ 700 ]
    };
    return colorsMap[ roleName ] || colors.grey[ 900 ];
};

