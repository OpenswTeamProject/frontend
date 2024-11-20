import React from "react";
import { Doughnut } from "react-chartjs-2";
import "../chartConfig"; // Chart.js 등록 파일 가져오기

type DonutChartProps = {
  data: number[];
};

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const chartData = {
    labels: ["사용", "미사용"],
    datasets: [
      {
        data: data,
        backgroundColor: ["#4caf50", "#333"],
      },
    ],
  };

  return <Doughnut data={chartData} />;
};

export default DonutChart;
