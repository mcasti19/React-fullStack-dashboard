import {Box, Button, Grid2, IconButton, Typography, useTheme} from "@mui/material";
import {tokens} from "../../../theme";
import {mockTransactions} from "../../../dashboard/data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import {BarchartData} from "../../components/BarChart";
import {LinechartData} from "../../components/LinechartData";
import {PiechartData} from "../pie/components/PiechartData";
import {StatsBox} from "./components/Stats";
// import {useSelector} from "react-redux";

export const DashboardPage = () => {
  const theme = useTheme();
  const colors = tokens( theme.palette.mode );

  // const {user} = useSelector( state => state.auth );
  // console.log( user );


  return (
    <Box m="0" border={0} className="flex flex-col grow">
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
      {/* <Box className="overflow-scroll" > */}
      <Grid2 container spacing={2} className='flex flex-col gap-4 border-amber-300 border-0 grow h-[100%]' >
        {/* ROW 1 */}
        <Grid2 container spacing={2} className='w-full flex-grow-1 border-0'>
          <StatsBox />
        </Grid2>

        {/*************************************** ROW 2 ***************************************/}
        <Grid2 container spacing={2} className='w-full flex-grow-2 border-0'>
          <Grid2 size={{xs: 12, sm: 12, md: 12, lg: 8}} border={0} className="flex">
            <Box backgroundColor={colors.primary[ 400 ]} className='flex flex-col p-4 gap-3 w-full'>
              <Box className='flex justify-between items-center grow'>
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
              <Box sx={{width: '100%', height: 200}}>
                <LinechartData />
              </Box>
            </Box>
          </Grid2>

          <Grid2 size={{xs: 12, sm: 12, md: 12, lg: 4}} border={0} overflow={"auto"} className='flex flex-col'>
            <Box backgroundColor={colors.primary[ 400 ]} className='h-[300px] overflow-auto grow'>
              <Box className='flex justify-between items-center p-3.5'
                borderBottom={`2px solid ${ colors.primary[ 300 ] }`}
                colors={colors.grey[ 100 ]}
              >
                <Typography color={colors.grey[ 100 ]} variant="h5" fontWeight="600">
                  Recent Transactions
                </Typography>
              </Box>
              {mockTransactions.map( ( transaction, i ) => (
                <Box key={`${ transaction.txId }-${ i }`} className='flex justify-between items-center p-3.5' borderBottom={`2px solid ${ colors.primary[ 300 ] }`}>
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

        <Grid2 container spacing={2} className='w-full flex-grow-1 border-0'>
          <Grid2 size={{xs: 12, lg: 4}} className=" border-0 flex flex-col">
            <Box backgroundColor={colors.primary[ 400 ]} className='p-3.5 sm:grow'>
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

          <Grid2 size={{xs: 12, lg: 4}} className=" border-0 flex flex-col">
            <Box backgroundColor={colors.primary[ 400 ]} className='p-3.5 flex flex-col justify-center items-center sm:grow'>
              <Typography variant="h5" fontWeight="600">
                Sales Quantity
              </Typography>
              <Box className="w-full"
              sx={{width: '100%', height: 200}}
              >
                <BarchartData />
              </Box>
            </Box>
          </Grid2>

          <Grid2 size={{xs: 12, lg: 4}} className=" border-0 flex">
            <Box backgroundColor={colors.primary[ 400 ]} className='p-3.5 sm:grow' >
              <Typography variant="h5" fontWeight="600">
                Geography Based Traffic
              </Typography>
              <Box className="w-full h-full"
              sx={{width: '100%', height: 200}}
              >
                <PiechartData />
              </Box>
            </Box>
          </Grid2>
        </Grid2>
      </Grid2>
      {/* </Box> */}
    </Box >
  );
};