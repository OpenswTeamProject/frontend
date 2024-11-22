import React from "react";
import WeatherInfo from "../components/WeatherInfo";
import DonutChart from "../components/DonutChart";
import LineChart from "../components/LineChart";
import { mockBikeData } from "../api/mockBikeData";
import { mockWeatherData } from "../api/mockWeatherData";

const Statistics: React.FC = () => {
  const { temperature, humidity, windSpeed, weather } = mockWeatherData;

  return (
    <div
      className="min-h-screen bg-gray-800 flex flex-col items-center justify-center text-white"
      style={{
        backgroundImage: "url('/ListBack.png')",
      }}
    >
      <div className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-lg text-black">
        <header className="bg-gray-200 p-4 rounded-md shadow-md text-center border-b-2 border-green-500">
          <h1 className="text-xl font-bold text-green-700">[지역명] 대여소</h1>
        </header>
        <div className="flex justify-around items-center py-6">
          {/* 첫 번째 도넛 차트 */}
          <div>
            <DonutChart data={[70, 30]} colors={["#4caf50", "#3c3c3c"]} size={100} />
          </div>
          {/* 두 번째 도넛 차트 */}
          <div>
            <DonutChart data={[40, 60]} colors={["#ff9800", "#3c3c3c"]} size={100} />
          </div>
          <div className="flex space-x-4">
            <div className="border-2 border-green-500 bg-gray-100 p-3 rounded-lg w-24 text-center">
              <p className="text-sm font-bold text-green-700">온도</p>
              <p className="text-lg font-semibold">{temperature}</p>
            </div>
            <div className="border-2 border-green-500 bg-gray-100 p-3 rounded-lg w-24 text-center">
              <p className="text-sm font-bold text-green-700">습도</p>
              <p className="text-lg font-semibold">{humidity}</p>
            </div>
            <div className="border-2 border-green-500 bg-gray-100 p-3 rounded-lg w-24 text-center">
              <p className="text-sm font-bold text-green-700">풍속</p>
              <p className="text-lg font-semibold">{windSpeed}</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <WeatherInfo imageSize="large" />
          </div>
        </div>
        <div className="mt-6">
          <LineChart
            data={mockBikeData}
            lineColor="rgba(75, 192, 192, 1)"
            pointColor="rgba(75, 192, 192, 1)"
            width={1000}
            height={400}
          />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
