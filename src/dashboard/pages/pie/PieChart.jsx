import {Box} from "@mui/material";
import Header from "../../components/Header";
import {PiechartData} from "./components/PiechartData";


const Pie = () => {
  return (
    <Box m="">
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box width={'100%'}  height={'70svh'} border={0} justifyItems={'center'} alignContent={'center'}>
        <PiechartData />
      </Box>
    </Box>
  );
};

export default Pie;
