import { useTheme } from "@mui/material";
// import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { mockBarData as data } from "../data/mockData";

const BarChart = ( { isDashboard = false } ) => {
  const theme = useTheme();
  const colors = tokens( theme.palette.mode );

  return (
    <div>
      <h1>BARCHART</h1>
    </div>
    // <ResponsiveBar
    //   data={ data }
    //   theme={ {
    //     // added
    //     axis: {
    //       domain: {
    //         line: {
    //           stroke: colors.grey[100],
    //         },
    //       },
    //       legend: {
    //         text: {
    //           fill: colors.grey[100],
    //         },
    //       },
    //       ticks: {
    //         line: {
    //           stroke: colors.grey[100],
    //           strokeWidth: 1,
    //         },
    //         text: {
    //           fill: colors.grey[100],
    //         },
    //       },
    //     },
    //     legends: {
    //       text: {
    //         fill: colors.grey[100],
    //       },
    //     },
    //   } }
    //   keys={ [
    //     'hot dog',
    //     'burger',
    //     'sandwich',
    //     'kebab',
    //     'fries',
    //     'donut'
    //   ] }

    //   indexBy="year"
    //   margin={ { top: 50, right: 130, bottom: 50, left: 60 } }
    //   padding={ 0.3 }
    //   valueScale={ { type: "linear" } }
    //   indexScale={ { type: "band", round: true } }
    //   colors={ { scheme: "pastel1" } }
    //   defs={ [
    //     {
    //       id: "dots",
    //       type: "patternDots",
    //       background: "inherit",
    //       color: "#38bcb2",
    //       size: 4,
    //       padding: 1,
    //       stagger: true,
    //     },
    //     {
    //       id: "lines",
    //       type: "patternLines",
    //       background: "inherit",
    //       color: "#eed312",
    //       rotation: -45,
    //       lineWidth: 6,
    //       spacing: 10,
    //     },
    //   ] }
    //   // fill={ [
    //   //   {
    //   //     match: {
    //   //       id: 'fries'
    //   //     },
    //   //     id: 'dots'
    //   //   },
    //   //   {
    //   //     match: {
    //   //       id: 'sandwich'
    //   //     },
    //   //     id: 'lines'
    //   //   }
    //   // ] }
    //   borderColor={ {
    //     from: "color",
    //     modifiers: [["darker", "1.6"]],
    //   } }
    //   axisTop={ null }
    //   axisRight={ null }
    //   axisBottom={ {
    //     tickSize: 5,
    //     tickPadding: 5,
    //     tickRotation: 0,
    //     legend: isDashboard ? undefined : "Year", // changed
    //     legendPosition: "middle",
    //     legendOffset: 32,
    //   } }
    //   axisLeft={ {
    //     tickSize: 5,
    //     tickPadding: 5,
    //     tickRotation: 0,
    //     legend: isDashboard ? undefined : "Profits", // changed
    //     legendPosition: "middle",
    //     legendOffset: -40,
    //   } }
    //   enableLabel={ true }
    //   enableTotals={ true }
    //   labelSkipWidth={ 12 }
    //   labelSkipHeight={ 12 }
    //   isInteractive={ true }
    //   labelTextColor={ {
    //     from: "color",
    //     modifiers: [["darker", 2.5]],
    //   } }
    //   legends={ [
    //     {
    //       dataFrom: "keys",
    //       anchor: "bottom-right",
    //       direction: "column",
    //       justify: false,
    //       translateX: 120,
    //       translateY: 0,
    //       itemsSpacing: 2,
    //       itemWidth: 100,
    //       itemHeight: 20,
    //       itemDirection: "left-to-right",
    //       itemOpacity: 0.85,
    //       symbolSize: 20,
    //       effects: [
    //         {
    //           on: "hover",
    //           style: {
    //             itemOpacity: 1,
    //           },
    //         },
    //       ],
    //     },
    //   ] }

    //   // role="application"
    //   // barAriaLabel={ e => e.id + ": " + e.formattedValue + e.indexValue }
    // />
  );
};

export default BarChart;
