import {Box} from "@mui/material";
import Header from "../../components/Header";
import {LinechartData} from "../../components/LinechartData";

const LineChartPage = () => {
  return (
    <Box className=''>
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box width={'100%'}  height={'70svh'} border={0} justifyItems={'center'} alignContent={'center'}>
        <LinechartData />
      </Box>
    </Box>
  );
};

export default LineChartPage;
