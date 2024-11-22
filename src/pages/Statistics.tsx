import React from "react";
import { useLocation } from "react-router-dom"; // React Router의 useLocation 훅
import DockInfo from "../components/DockInfo";
import RentalStationList from "../components/RentalStationList";
import LineChart from "../components/LineChart";
import { mockBikeData } from "../api/mockBikeData";
import { mockWeatherData } from "../api/mockWeatherData";

const Statistics: React.FC = () => {
  const location = useLocation();
  const selectedStation = location.state?.selectedStation || "[지역명]"; // 전달된 데이터

  const { temperature, humidity, windSpeed, weather } = mockWeatherData;

  return (
    <div
      className="min-h-screen bg-gray-800 flex flex-col items-center justify-center text-white"
      style={{
        backgroundImage: "url('/ListBack.png')",
      }}
    >
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg text-black">
        {/* 선택된 대여소 이름 표시 */}
        <header className="bg-gray-200 p-4 rounded-lg shadow-md text-center border-2 border-green-500">
          <h1 className="text-xl font-bold">{selectedStation}</h1>
        </header>

        {/* 상단 정보 */}
        <div className="flex justify-around items-center py-6">
          {/* 거치대 수 */}
          <DockInfo />
          {/* 온도, 습도, 풍속 */}
          <div className="flex space-x-4">
            <div className="border-2 border-green-500 bg-gray-200 p-3 rounded-lg w-24 text-center">
              <p className="text-sm font-bold text-green-700">온도</p>
              <p className="text-lg font-semibold">{temperature}</p>
            </div>
            <div className="border-2 border-green-500 bg-gray-200 p-3 rounded-lg w-24 text-center">
              <p className="text-sm font-bold text-green-700">습도</p>
              <p className="text-lg font-semibold">{humidity}</p>
            </div>
            <div className="border-2 border-green-500 bg-gray-200 p-3 rounded-lg w-24 text-center">
              <p className="text-sm font-bold text-green-700">풍속</p>
              <p className="text-lg font-semibold">{windSpeed}</p>
            </div>
          </div>
          {/* 날씨 아이콘 */}
          <div className="flex flex-col items-center">
            <img
              src={`/${weather}.png`}
              alt={weather}
              className="w-36 h-36 object-contain"
            />
          </div>
        </div>

        {/* 하단 그래프 및 리스트 */}
        <div className="flex justify-between mt-6 space-x-6">
          {/* 선 그래프 */}
          <div className="w-2/3">
            <LineChart
              data={mockBikeData}
              lineColor="rgba(40, 98, 94, 1)"
              pointColor="rgba(40, 98, 94, 1)"
            />
          </div>
          {/* 근처 대여소 리스트 */}
          <RentalStationList />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
