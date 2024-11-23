import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DockInfo from "../components/DockInfo";
import RentalStationList from "../components/RentalStationList";
import BikeDemandGraph from "../components/BikeDemandGraph";
import { mockWeatherData } from "../api/mockWeatherData"; // 날씨 데이터 가져오기

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

  // Mock 날씨 데이터
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

  return (
    <div
      className="min-h-screen bg-gray-800 flex flex-col items-center justify-center text-white"
      style={{
        backgroundImage: "url('/ListBack.png')",
      }}
    >
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg text-black">
        <header className="bg-gray-200 p-4 rounded-lg shadow-md text-center border-2 border-green-500">
          <h1 className="text-xl font-bold">{stationInfo.station_name}</h1>
        </header>

        {/* 상단 정보 */}
        <div className="flex justify-around items-center py-6">
          <DockInfo totalSlots={stationInfo.total_slots} />
          {/* 날씨 정보 */}
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
              src={`/${weather}.png`} // 날씨 이미지 경로
              alt={weather}
              className="w-36 h-36 object-contain"
            />
          </div>
        </div>

        {/* 하단 그래프 및 리스트 */}
        <div className="flex justify-between mt-6 space-x-6">
          {/* 자전거 수요량 그래프 */}
          <div className="w-2/3">
            <BikeDemandGraph />
          </div>
          {/* 근처 대여소 리스트 */}
          <RentalStationList stations={stationInfo.nearby_stations} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
