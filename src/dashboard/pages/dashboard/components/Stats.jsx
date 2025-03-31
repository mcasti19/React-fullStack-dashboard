import React from 'react'
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import {Box, Grid2, useTheme} from "@mui/material";

import StatBox from '../../../components/StatBox';
import {tokens} from '../../../../theme';



export const StatsBox = () => {
    const theme = useTheme();
    const colors = tokens( theme.palette.mode );

    const Stats = [
        {
            title: "12,361",
            subtitle: "Emails Sent",
            progress: "0.14",
            increase: "+14%",
            icon: <EmailIcon sx={{color: colors.greenAccent[ 600 ], fontSize: "26px"}} />
        },
        {
            title: "431,225",
            subtitle: "Sales Obtained",
            progress: "0.50",
            increase: "+50%",
            icon: <PointOfSaleIcon sx={{color: colors.greenAccent[ 600 ], fontSize: "26px"}} />,
        },
        {
            title: "32,441",
            subtitle: "New Clients",
            progress: "0.30",
            increase: "+75%",
            icon: <PersonAddIcon sx={{color: colors.greenAccent[ 600 ], fontSize: "26px"}} />,
        },
        {
            title: "1,325,134",
            subtitle: "Traffic Received",
            progress: "0.80",
            increase: "+43%",
            icon: <TrafficIcon sx={{color: colors.greenAccent[ 600 ], fontSize: "26px"}} />,
        },
    ]
    return (
        <>
            {
                Stats.map( ( stat, index ) => (
                    <Grid2 key={index} size={{xs: 12, md: 6, lg: 3}}>
                        <Box backgroundColor={colors.primary[ 400 ]} className='flex items-center justify-center h-full'>
                            <StatBox
                                title={stat.title}
                                subtitle={stat.subtitle}
                                progress={stat.progress}
                                increase={stat.increase}
                                icon={stat.icon}
                            />
                        </Box>
                    </Grid2>
                ) )
            }
        </>
    )
}
