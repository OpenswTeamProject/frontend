import React from "react";
import { Line } from "react-chartjs-2";
import "../chartConfig"; // Chart.js 등록 파일 가져오기

type LineChartProps = {
  data: {
    labels: string[];
    datasets: { label: string; data: number[]; borderColor: string }[];
  };
};

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      fill: false,
      tension: 0.1,
    })),
  };

  return <Line data={chartData} />;
};

export default LineChart;
