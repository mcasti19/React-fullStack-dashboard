import * as React from 'react';
import {BarChart} from '@mui/x-charts/BarChart';


export const BarchartData = () => {
  return (
    <BarChart
      series={[
        {data: [ 35, 44, 24, 34 ]},
        {data: [ 51, 6, 49, 30 ]},
        {data: [ 15, 25, 30, 50 ]},
        {data: [ 60, 50, 15, 25 ]},
      ]}
      xAxis={[ {data: [ 'Quarter1', 'Quarter2', 'Quarter3', 'Quarter4' ], scaleType: 'band'} ]}
      margin={{top: 10, bottom: 30, left: 40, right: 10}}
      sx={{width: '100%', height: '100%'}}

    />
  );
}
