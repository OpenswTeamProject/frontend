import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale, // 'category' 스케일
  LinearScale, // Y축 스케일
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// 필요한 Chart.js 구성요소 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BikeDemandGraph: React.FC<{ station: string }> = ({ station }) => {
  const [labels, setLabels] = useState<string[]>(["그제", "어제", "오늘", "내일", "모레"]);
  const [data, setData] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchPredictedData = async () => {
    try {
      const response = await fetch(
        `http://172.20.10.2:5000/predict?station=${encodeURIComponent(station)}`,
        {
          method: "POST", // 서버가 POST를 요구한다면
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("대여 수요 데이터를 가져오는 중 오류 발생");
      }

      const result = await response.json();

      const newLabels = result.map((item: any) => item.date);
      const newData = result.map((item: any) => parseFloat(item.predicted_rental.toFixed(1)));

      setLabels(newLabels);
      setData(newData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류");
    }
  };

  useEffect(() => {
    fetchPredictedData();
  }, [station]);

  if (error) {
    return <div className="text-red-500">오류: {error}</div>;
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: "대여 수요 예측",
        data,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full">
      <Line
        data={chartData}
        options={{
          plugins: {
            legend: { display: true },
          },
          scales: {
            x: { type: "category" }, // 'category' 스케일 명시
          },
        }}
      />
    </div>
  );
};

export default BikeDemandGraph;
