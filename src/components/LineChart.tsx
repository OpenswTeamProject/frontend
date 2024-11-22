import React from "react";
import { Line } from "react-chartjs-2";
import "../chartConfig"; // Chart.js 설정 파일 임포트

type LineChartProps = {
  data: any;
  lineColor: string;
  pointColor: string;
  width?: number; // 그래프 너비
  height?: number; // 그래프 높이
};

const LineChart: React.FC<LineChartProps> = ({ data, lineColor, pointColor, width = 600, height = 300 }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        borderWidth: 2, // 선 두께
        borderColor: lineColor, // 선 색상
      },
      point: {
        radius: 5, // 점 크기
        backgroundColor: pointColor, // 점 색상
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // x축 그리드 숨김
        },
      },
      y: {
        grid: {
          color: "rgba(200, 200, 200, 0.5)", // y축 그리드 색상
        },
      },
    },
  };

  return (
    <div style={{ width, height }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
