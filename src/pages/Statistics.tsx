import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DockInfo from "../components/DockInfo";
import RentalStationList from "../components/RentalStationList";
import BikeDemandGraph from "../components/BikeDemandGraph";
import Map from "../components/Map";
import "leaflet/dist/leaflet.css";

const Statistics: React.FC = () => {
  const location = useLocation();
  const selectedStation = location.state?.selectedStation || "대여소 정보 없음";

  const [stationInfo, setStationInfo] = useState<{
    station_name: string;
    total_slots: number;
    latitude: number;
    longitude: number;
    nearby_stations: { station_name: string; total_slots: number }[];
  } | null>(null);

  const [weatherInfo, setWeatherInfo] = useState<{
    temperature: number;
    humidity: number;
    windSpeed: number;
    description: string;
    weatherIcon: string;
  } | null>(null);

  const [forecastInfo, setForecastInfo] = useState<
    {
      datetime: string;
      temperature: number;
      humidity: number;
      windSpeed: number;
      rainVolume: number;
      snowVolume: number;
      description: string;
      weatherIcon: string;
    }[]
  >([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStationInfo = async () => {
      try {
        const response = await fetch(
          `http://34.64.194.23:5000/stations/station_info?station=${encodeURIComponent(
            selectedStation
          )}`
        );

        if (!response.ok) {
          throw new Error("대여소 API 호출 중 오류 발생");
        }

        const data = await response.json();
        setStationInfo(data);

        if (data && data.latitude && data.longitude) {
          await Promise.all([
            fetchWeatherInfo(data.latitude, data.longitude),
            fetchForecastInfo(data.latitude, data.longitude),
          ]);
        }
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

  const fetchWeatherInfo = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `http://34.64.194.23:5000/weather/current?lat=${lat}&lon=${lon}`
      );

      if (!response.ok) {
        throw new Error("날씨 API 호출 중 오류 발생");
      }

      const data = await response.json();
      setWeatherInfo({
        temperature: data.temperature,
        humidity: data.humidity,
        windSpeed: data.wind_speed,
        description: data.description,
        weatherIcon: data.weather_icon,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류");
    }
  };

  const fetchForecastInfo = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `http://34.64.194.23:5000/weather/forecast?lat=${lat}&lon=${lon}`
      );

      if (!response.ok) {
        throw new Error("날씨 예보 API 호출 중 오류 발생");
      }

      const data = await response.json();
      const mergedData: Record<string, any> = {};
      data.forEach((forecast: any) => {
        const datetime = forecast.datetime.split(" ")[0];

        if (!mergedData[datetime]) {
          mergedData[datetime] = {
            datetime,
            temperature: forecast.temperature,
            humidity: forecast.humidity,
            windSpeed: forecast.wind_speed,
            rainVolume: forecast.rain_volume || 0,
            snowVolume: forecast.snow_volume || 0,
            description: forecast.description,
            weatherIcon: forecast.weather_icon,
            count: 1,
          };
        } else {
          mergedData[datetime].temperature += forecast.temperature;
          mergedData[datetime].humidity += forecast.humidity;
          mergedData[datetime].windSpeed += forecast.wind_speed;
          mergedData[datetime].rainVolume += forecast.rainVolume || 0;
          mergedData[datetime].snowVolume += forecast.snowVolume || 0;
          mergedData[datetime].count += 1;
        }
      });

      const averagedForecasts = Object.values(mergedData)
        .map((item: any) => ({
          datetime: item.datetime,
          temperature: parseFloat((item.temperature / item.count).toFixed(1)),
          humidity: parseFloat((item.humidity / item.count).toFixed(1)),
          windSpeed: parseFloat((item.windSpeed / item.count).toFixed(1)),
          rainVolume: parseFloat(item.rainVolume.toFixed(1)),
          snowVolume: parseFloat(item.snowVolume.toFixed(1)),
          description: item.description,
          weatherIcon: item.weatherIcon,
        }))
        .slice(1, 5);

      setForecastInfo(averagedForecasts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류");
    }
  };

  if (loading) {
    return <div className="text-white">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-red-500">오류: {error}</div>;
  }

  if (!stationInfo || !weatherInfo) {
    return <div className="text-gray-400">대여소 또는 날씨 정보를 불러올 수 없습니다.</div>;
  }

return (
  <div className="grid grid-cols-12 gap-4 p-6 bg-gray-50 h-screen">
  {/* 좌측 패널 */}
  <div className="col-span-4 h-full bg-gray-200 p-6 rounded-lg shadow-lg">
    <button className="bg-green-500 text-white w-full py-4 rounded-lg text-lg font-bold">
      다른 대여소 찾으러가기
    </button>
    <div className="bg-white p-6 mt-6 rounded-lg shadow-md h-4/5 overflow-auto">
      <h2 className="text-xl font-semibold mb-4">근처 대여소 정보</h2>
      <RentalStationList stations={stationInfo?.nearby_stations || []} />
    </div>
      </div>

      {/* 우측 패널 */}
      <div className="col-span-8 space-y-6">
        {/* 상단 박스 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg text-center shadow">
            <p className="text-gray-600 font-bold">거치대수</p>
            <p className="text-xl font-semibold">
              {stationInfo?.total_slots ?? "N/A"}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center shadow">
            <p className="text-gray-600 font-bold">현재날씨정보</p>
            <p className="text-sm">
              {weatherInfo?.description ?? "날씨 정보 없음"}
            </p>
            <img
              src={weatherInfo?.weatherIcon || ""}
              alt="날씨 아이콘"
              className="w-12 h-12 mx-auto"
            />
          </div>
        </div>
        {/* 하단 박스 */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg text-center shadow">
            <p className="text-gray-600 font-bold">온도</p>
            <p className="text-xl font-semibold">
              {weatherInfo?.temperature ?? "N/A"}°C
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center shadow">
            <p className="text-gray-600 font-bold">풍속</p>
            <p className="text-xl font-semibold">
              {weatherInfo?.windSpeed ?? "N/A"} m/s
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center shadow">
            <p className="text-gray-600 font-bold">습 도</p>
            <p className="text-xl font-semibold">
              {weatherInfo?.humidity ?? "N/A"}%
            </p>
          </div>
        </div>
        {/* 지도와 그래프 */}
        <div className="grid grid-cols-2 gap-4">
          <BikeDemandGraph station={selectedStation} />
          <Map latitude={stationInfo?.latitude || 0} longitude={stationInfo?.longitude || 0} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
