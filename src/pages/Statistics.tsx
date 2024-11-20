import React from "react";
import WeatherIcon from "../components/WeatherIcon";
import DonutChart from "../components/DonutChart";
import LineChart from "../components/LineChart";
import { statisticsData } from "../api/mockData";

const Statistics: React.FC = () => {
  const { region, weather, totalUsers, donutChartData, lineChartData } = statisticsData;



  return (
    <div
      className="min-h-screen bg-gray-800 flex flex-col items-center justify-center text-center text-white"
      style={{
        backgroundImage: "url('/ListBack.png')",
      }}
    >
      <div className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-lg text-black">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{region} 대여소</h2>
          <WeatherIcon weather={weather as "sunny" | "cloudy" | "rain"} />

        </div>
        <p className="text-center mt-2">이용자 수: {totalUsers}명</p>
        <div className="flex justify-around mt-4">
          <div className="w-1/3">
            <DonutChart data={donutChartData} />
          </div>
          <div className="w-2/3">
            <LineChart data={lineChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
