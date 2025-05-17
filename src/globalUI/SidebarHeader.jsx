import {Box, Typography} from "@mui/material";

export const SidebarHeader = ( {isCollapsed, user, colors} ) => (
    <>
        <Box className='flex justify-center items-center'>
            <img
                alt="profile-user"
                src='avatar.png'
                style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    width: isCollapsed ? "50px" : "80px",
                    height: isCollapsed ? "50px" : "80px"
                }}
            />
        </Box>
        {
            !isCollapsed && (
                <Box textAlign="center">
                    <Typography variant="h2" fontWeight="bold" color={colors.grey[ 100 ]} sx={{m: "10px 0 0 0"}}  >
                        {user.name}
                    </Typography>
                    <Typography variant="h5" color={colors.greenAccent[ 500 ]}  >
                        Full Stack Developer
                    </Typography>
                </Box>
            )
        }
    </>
);