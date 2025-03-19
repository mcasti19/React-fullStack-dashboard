import {Box} from "@mui/material";
import Header from "../../components/Header";
import {BarchartData} from "../../components/BarChart";
// import BarChart from "../../components/BarChart";

export const BarChartPage = () => {
  return (
    <Box m="20px" border={0}>
      <Header title="Bar Chart" subtitle="Simple Bar Chart" />
      <Box height="70vh">
        <BarchartData />
      </Box>
    </Box>
  );
};

// export default Bar;
