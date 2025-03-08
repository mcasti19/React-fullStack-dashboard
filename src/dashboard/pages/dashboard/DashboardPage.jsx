import {Box, Button, Grid2, IconButton, Typography, useTheme} from "@mui/material";
import {tokens} from "../../../theme";
import {mockTransactions} from "../../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
// import GeographyChart from "../../components/GeographyChart";
// import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";

export const DashboardPage = () => {
  const theme = useTheme();
  const colors = tokens( theme.palette.mode );

  return (

    <Box m="10px 20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center"
        className='flex flex-col mb-4 justify-between items-center sm:flex-row sm:mb-0'>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button className="text-sm font-bold py-10 px-20"
            sx={{
              backgroundColor: colors.blueAccent[ 700 ],
              color: colors.grey[ 100 ],
            }}
          >
            <DownloadOutlinedIcon sx={{mr: "10px"}} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box className="flex flex-col gap-4 h-dvh overflow-scroll">
        {/* ROW 1 */}
        <Grid2 container spacing={2} className=''>
          <Grid2 size={{xs: 12, md: 6, lg: 3}}>
            <Box backgroundColor={colors.primary[ 400 ]} className='flex items-center justify-center h-32'>
              <StatBox
                title="12,361"
                subtitle="Emails Sent"
                progress="0.75"
                increase="+14%"
                icon={<EmailIcon sx={{color: colors.greenAccent[ 600 ], fontSize: "26px"}} />}
              />
            </Box>
          </Grid2>
          <Grid2 size={{xs: 12, md: 6, lg: 3}}>
            <Box backgroundColor={colors.primary[ 400 ]} className='flex items-center justify-center h-32'>
              <StatBox
                title="431,225"
                subtitle="Sales Obtained"
                progress="0.50"
                increase="+21%"
                icon={<PointOfSaleIcon sx={{color: colors.greenAccent[ 600 ], fontSize: "26px"}} />
                }
              />
            </Box>
          </Grid2>
          <Grid2 size={{xs: 12, md: 6, lg: 3}}>
            <Box backgroundColor={colors.primary[ 400 ]} className='flex items-center justify-center h-32'>
              <StatBox
                title="32,441"
                subtitle="New Clients"
                progress="0.30"
                increase="+5%"
                icon={<PersonAddIcon sx={{color: colors.greenAccent[ 600 ], fontSize: "26px"}} />}
              />
            </Box>
          </Grid2>
          <Grid2 size={{xs: 12, md: 6, lg: 3}}>
            <Box backgroundColor={colors.primary[ 400 ]} className='flex items-center justify-center h-32'>
              <StatBox
                title="1,325,134"
                subtitle="Traffic Received"
                progress="0.80"
                increase="+43%"
                icon={<TrafficIcon sx={{color: colors.greenAccent[ 600 ], fontSize: "26px"}} />
                }
              />
            </Box>
          </Grid2>
        </Grid2>
        {/*************************************** ROW 2 ***************************************/}
        <Grid2 container spacing={2}>
          <Grid2 size={{xs: 12, sm: 12, md: 12, lg: 8}}>
            <Box backgroundColor={colors.primary[ 400 ]} className='flex flex-col h-72  py-0 px-8'>
              <Box className='flex justify-between items-center mt-6 py-0 px-7'>
                <Box>
                  <Typography variant="h5" fontWeight="600" color={colors.grey[ 100 ]}> Revenue Generated </Typography>
                  <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[ 500 ]}> $59,342.32 </Typography>
                </Box>
                <Box>
                  <IconButton>
                    <DownloadOutlinedIcon sx={{fontSize: "26px", color: colors.greenAccent[ 300 ]}} />
                  </IconButton>
                </Box>
              </Box>
              <Box className="">
                <LineChart isDashboard={true} />
              </Box>
            </Box>
          </Grid2>

          <Grid2 size={{xs: 12, lg: 4}}>
            <Box backgroundColor={colors.primary[ 400 ]} className='h-72 overflow-scroll'>
              <Box className='flex justify-between items-center p-3.5'
                borderBottom={`4px solid ${ colors.primary[ 300 ] }`}
                colors={colors.grey[ 100 ]}
              >
                <Typography color={colors.grey[ 100 ]} variant="h5" fontWeight="600">
                  Recent Transactions
                </Typography>
              </Box>
              {mockTransactions.map( ( transaction, i ) => (
                <Box key={`${ transaction.txId }-${ i }`} className='flex justify-between items-center p-3.5' borderBottom={`4px solid ${ colors.primary[ 300 ] }`}>
                  <Box>
                    <Typography
                      color={colors.greenAccent[ 500 ]}
                      variant="h5"
                      fontWeight="600"
                    >
                      {transaction.txId}
                    </Typography>
                    <Typography color={colors.grey[ 100 ]}>
                      {transaction.user}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[ 100 ]}>{transaction.date}</Box>
                  <Box
                    backgroundColor={colors.greenAccent[ 700 ]}
                    p="5px 10px"
                    borderRadius="4px"
                  >
                    ${transaction.cost}
                  </Box>
                </Box>
              ) )}
            </Box>
          </Grid2>
        </Grid2>

        {/*************************************************** ROW 3 ***************************************************/}

        <Grid2 container spacing={2}>
          <Grid2 size={{xs: 12, lg: 4}}>
            <Box backgroundColor={colors.primary[ 400 ]} className='h-68 p-3.5'>
              <Typography variant="h5" fontWeight="600">
                Campaign
              </Typography>
              <Box className='flex flex-col items-center mt-6'>
                <ProgressCircle size="125" />
                <Typography
                  variant="h5"
                  color={colors.greenAccent[ 500 ]}
                  sx={{mt: "15px"}}
                >
                  $48,352 revenue generated
                </Typography>
                <Typography>Includes extra misc expenditures and costs</Typography>
              </Box>
            </Box>
          </Grid2>

          <Grid2 size={{xs: 12, lg: 4}}>
            <Box backgroundColor={colors.primary[ 400 ]} className='h-68 p-3.5'>
              <Typography variant="h5" fontWeight="600">
                Sales Quantity
              </Typography>
              <Box className='h-60 -mt-5'>
                {/* <BarChart isDashboard={true} /> */}
              </Box>
            </Box>
          </Grid2>

          <Grid2 size={{xs: 12, lg: 4}}>
            <Box backgroundColor={colors.primary[ 400 ]} className='h-68 p-3.5' >
              <Typography variant="h5" fontWeight="600">
                Geography Based Traffic
              </Typography>
              <Box className='h-60 -mt-5'>
                {/* <GeographyChart isDashboard={true} /> */}
              </Box>
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </Box >
  );
};

// export default Dashboard;
