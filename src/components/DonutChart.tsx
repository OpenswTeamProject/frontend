import React from "react";
import { Doughnut } from "react-chartjs-2";
import "../chartConfig"; // Chart.js 설정 파일 임포트

type DonutChartProps = {
  data: number[];
  colors: string[];
  size?: number; // 차트 크기
};

const DonutChart: React.FC<DonutChartProps> = ({ data, colors, size = 120 }) => {
  const chartData = {
    labels: ["사용", "미사용"],
    datasets: [
      {
        data,
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  };

  const options = {
    cutout: "70%", // 도넛 두께 조정
    plugins: {
      legend: {
        display: false, // 범례 숨김
      },
    },
  };

  return (
    <div className="flex flex-col items-center" style={{ width: size, height: size }}>
      <Doughnut data={chartData} options={options} />
      <p className="mt-2 text-gray-800 text-sm">임시 [  ??  ]</p> {/* 텍스트 위치 조정 */}
    </div>
  );
};

export default DonutChart;
