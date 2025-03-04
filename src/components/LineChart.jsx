// import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockLineData as data } from "../data/mockData";

const LineChart = ( { isCustomLineColors = false, isDashboard = false } ) => {
  const theme = useTheme();
  const colors = tokens( theme.palette.mode );

  return (
    // 
    <h1>LINECHART</h1>
  );
};

export default LineChart;
