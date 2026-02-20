import React from "react";
import Chart from "react-google-charts";

const AreaChart = ({ historicalData, currencySymbol }) => {

  const data = historicalData?.prices
    ? [
        ["Date", "Price"],
        ...historicalData.prices.map((item) => [
          new Date(item[0]),
          item[1],
        ]),
      ]
    : [["Date", "Price"]];

  const options = {
    backgroundColor: "transparent",
    legend: "none",
    curveType: "function",
    hAxis: {
      textStyle: { color: "#FFFFFF" },
      gridlines: { color: "#444444" },
      format: "MMM dd",
    },
    vAxis: {
      textStyle: { color: "#FFFFFF" },
      gridlines: { color: "#444444" },
      format: `${currencySymbol}#,##0.00`,
    },
    chartArea: {
      width: "90%",
      height: "80%",
    },
    colors: ["#10B981"],
    lineWidth: 3,
  };

  return (
    <div className="w-full bg-gray-800/20 rounded-xl border border-emerald-500/20">
      <Chart
        chartType="AreaChart"
        width="100%"
        height="100%"
        data={data}
        options={options}
        loader={<div className="text-emerald-400">Loading Chart...</div>}
      />
    </div>
  );
};

export default AreaChart;