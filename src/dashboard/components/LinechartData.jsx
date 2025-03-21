import * as React from 'react';
import {LineChart} from '@mui/x-charts/LineChart';




const uData = [ 4000, 3000, 2000, 2780, 1890, 2390, 3490 ];
const pData = [ 2400, 1398, 9800, 3908, 4800, 3800, 4300 ];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

export const LinechartData = () => {

  return (
    <LineChart className=''
      // width={500}
      // height={300}
      sx={{width: '100%', height: '100%'}}
      margin={{top: 10, bottom: 30, left: 40, right: 10}}
      series={[
        {data: pData, },
        {data: uData, },
      ]}
      xAxis={[ {scaleType: 'point', data: xLabels} ]}
    />
  );
}

