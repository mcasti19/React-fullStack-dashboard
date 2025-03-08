// // import { ResponsiveLine } from "@nivo/line";
// import { useTheme } from "@mui/material";
// import { tokens } from "../theme";

// const LineChart = ( { isCustomLineColors = false, isDashboard = false } ) => {
//   const theme = useTheme();
//   const colors = tokens( theme.palette.mode );

//   return (
//     //
//     <h1>LINECHART</h1>
//   );
// };

// export default LineChart;


import {mockLineData as data} from "../../data/mockData";
import * as React from 'react';
import {LineChart} from '@mui/x-charts/LineChart';

export default function BasicLineChart() {


  console.log( data );


  return (
    <LineChart
      xAxis={[ {data: [ 1, 2, 3, 5, 8 ]} ]}
      series={[
        {
          data: [ 2, 5.5, 2, 8.5, 1.5 ],
        },
      ]}
      width={1000}
      height={200}
    />
  );
}

