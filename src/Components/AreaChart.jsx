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
      textStyle: { color: "#848E9C" },
      gridlines: { color: "#2B3139" },
      format: "MMM dd",
    },

    vAxis: {
      textStyle: { color: "#848E9C" },
      gridlines: { color: "#2B3139" },
      format: `${currencySymbol}#,##0.00`,
    },

    chartArea: {
      width: "92%",
      height: "78%",
    },

    colors: ["#FCD535"],
    lineWidth: 2,
  };

  return (
    <div className="w-full h-[420px] md:h-[520px] bg-[#151A21] border border-[#2B3139] rounded-xl p-4">
      <Chart
        chartType="AreaChart"
        width="100%"
        height="100%"
        data={data}
        options={options}
        loader={<div className="text-[#FCD535]">Loading Chart...</div>}
      />
    </div>
  );
};

export default AreaChart;