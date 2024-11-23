import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DockInfo from "../components/DockInfo";
import RentalStationList from "../components/RentalStationList";
import LineChart from "../components/LineChart";
import { mockWeatherData } from "../api/mockWeatherData";

const Statistics: React.FC = () => {
  const location = useLocation();
  const selectedStation = location.state?.selectedStation || "대여소 정보 없음";

  const [stationInfo, setStationInfo] = useState<{
    station_name: string;
    total_slots: number;
    nearby_stations: { station_name: string; total_slots: number }[];
  } | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { temperature, humidity, windSpeed, weather } = mockWeatherData;

  useEffect(() => {
    const fetchStationInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/stations/station_info?station=${encodeURIComponent(
            selectedStation
          )}`
        );

        if (!response.ok) {
          throw new Error("API 호출 중 오류 발생");
        }

        const data = await response.json();
        setStationInfo(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "알 수 없는 오류");
      } finally {
        setLoading(false);
      }
    };

    if (selectedStation !== "대여소 정보 없음") {
      fetchStationInfo();
    }
  }, [selectedStation]);

  if (loading) {
    return <div className="text-white">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-red-500">오류: {error}</div>;
  }

  if (!stationInfo) {
    return <div className="text-gray-400">대여소 정보를 불러올 수 없습니다.</div>;
  }

  // Chart.js 데이터 형식으로 변환 (안전 초기화)
  const chartData = {
    labels: stationInfo.nearby_stations
      ? stationInfo.nearby_stations.map((station) => station.station_name)
      : [],
    datasets: [
      {
        label: "거치대 수",
        data: stationInfo.nearby_stations
          ? stationInfo.nearby_stations.map((station) => station.total_slots)
          : [],
        backgroundColor: "rgba(40, 98, 94, 0.2)",
        borderColor: "rgba(40, 98, 94, 1)",
        borderWidth: 1,
      },
    ],
  };

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
          <h1 className="text-xl font-bold">{stationInfo.station_name}</h1>
        </header>

        {/* 상단 정보 */}
        <div className="flex justify-around items-center py-6">
          <DockInfo totalSlots={stationInfo.total_slots} />
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
            <LineChart data={chartData} />
          </div>
          {/* 근처 대여소 리스트 */}
          <RentalStationList stations={stationInfo.nearby_stations} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
