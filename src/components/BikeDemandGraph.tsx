import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
const BASE_API_URL = import.meta.env.VITE_API_URL;

// Register required Chart.js components
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
        `${BASE_API_URL}/predict?station=${encodeURIComponent(station)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("대여 수요 데이터를 가져오는 중 오류 발생");
      }

      const result = await response.json();

      const newLabels = result.map((item: any) => {
        const date = new Date(item.date);
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월 (1월이 0부터 시작하므로 +1)
        const day = date.getDate().toString().padStart(2, '0'); // 일
        return `${month}-${day}`; // "MM-DD" 형식으로 반환
      });

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
        label: "대여수요예측",
        data,
        borderColor: "#43a257", // Horizon primary color
        backgroundColor: "rgba(67, 24, 255, 0.1)", // Horizon accent color
        borderWidth: 5,
        tension: 0.3, // Smooth curve
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend for simplicity
      },
      tooltip: {
        backgroundColor: "#1A202C", // Dark tooltip background
        titleColor: "#FFFFFF",
        bodyColor: "#A3AED0",
        cornerRadius: 10, // Rounded tooltip
        padding: 10,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Remove grid lines for clean look
        },
        ticks: {
          color: "#A3AED0", // Horizon axis text color
          font: {
            size: 20,
          },
        },
        border: {
          display: false, // Remove x-axis border
        },
      },
      y: {
        grid: {
          display: false, // Remove y-axis grid lines
        },
        ticks: {
          display: false, // Hide y-axis ticks for a minimal look
        },
        border: {
          display: false, // Remove y-axis border
        },
      },
    },
  };

  return (
    <div className="w-full p-4">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default BikeDemandGraph;
