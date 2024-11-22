import React from "react";
import { Line } from "react-chartjs-2";
import "../chartConfig";

type LineChartProps = {
  data: any;
  lineColor: string;
  pointColor: string;
};

const LineChart: React.FC<LineChartProps> = ({ data, lineColor, pointColor }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    elements: {
      line: {
        borderWidth: 2,
        borderColor: lineColor,
        tension: 0.4,
      },
      point: {
        radius: 5,
        backgroundColor: pointColor,
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "rgba(200, 200, 200, 0.5)" } },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
