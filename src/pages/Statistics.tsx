import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DockInfo from "../components/DockInfo";
import RentalStationList from "../components/RentalStationList";
import BikeDemandGraph from "../components/BikeDemandGraph";

const Statistics: React.FC = () => {
  const location = useLocation();
  const selectedStation = location.state?.selectedStation || "대여소 정보 없음";

  const [stationInfo, setStationInfo] = useState<{
    station_name: string;
    total_slots: number;
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

  // 아이콘 맵핑 함수
  const getWeatherIcon = (description: string): string => {
    const iconMapping: Record<string, string> = {
      "clear sky": "01d",
      "few clouds": "02d",
      "scattered clouds": "03d",
      "broken clouds": "04d",
      "shower rain": "09d",
      rain: "10d",
      thunderstorm: "11d",
      snow: "13d",
      mist: "50d",
    };
    return iconMapping[description.toLowerCase()] || "01d";
  };

  useEffect(() => {
    const fetchStationInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/stations/station_info?station=${encodeURIComponent(
            selectedStation
          )}`
        );

        if (!response.ok) {
          throw new Error("대여소 API 호출 중 오류 발생");
        }

        const data = await response.json();
        setStationInfo(data);

        // 날씨 데이터 가져오기
        if (data && data.nearby_stations.length > 0) {
          const [lat, lon] = [37.5665, 126.9780]; // 예시 위도/경도
          await Promise.all([fetchWeatherInfo(lat, lon), fetchForecastInfo(lat, lon)]);
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
        `http://localhost:5000/weather/current?lat=${lat}&lon=${lon}`
      ); // 백엔드의 현재 날씨 API 경로
  
      if (!response.ok) {
        throw new Error("백엔드 API 호출 중 오류 발생");
      }
  
      const data = await response.json();
      setWeatherInfo({
        temperature: data.temperature,
        humidity: data.humidity,
        windSpeed: data.wind_speed,
        description: data.description,
        weatherIcon: data.weather_icon, // 백엔드에서 아이콘 포함
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류");
    }
  };
  const fetchForecastInfo = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `http://localhost:5000/weather/forecast?lat=${lat}&lon=${lon}`
      );

      if (!response.ok) {
        throw new Error("날씨 예보 API 호출 중 오류 발생");
      }

      const data = await response.json();

      // 데이터 병합
      const mergedData: Record<string, any> = {};
      data.forEach((forecast: any) => {
        const datetime = forecast.datetime.split(" ")[0];

        if (!mergedData[datetime]) {
          mergedData[datetime] = {
            datetime,
            temperature: forecast.temperature,
            humidity: forecast.humidity,
            windSpeed: forecast.wind_speed,
            rainVolume: forecast.rainVolume || 0,
            snowVolume: forecast.snowVolume || 0,
            description: forecast.description,
            weatherIcon: `http://openweathermap.org/img/wn/${getWeatherIcon(
              forecast.description
            )}@2x.png`,
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

      // 평균값 계산
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
        .slice(1, 5); // 첫날 제외

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
          <div className="flex space-x-4">
            <div className="border-2 border-green-500 bg-gray-200 p-3 rounded-lg w-24 text-center">
              <p className="text-sm font-bold text-green-700">온도</p>
              <p className="text-lg font-semibold">{weatherInfo.temperature}°C</p>
            </div>
            <div className="border-2 border-green-500 bg-gray-200 p-3 rounded-lg w-24 text-center">
              <p className="text-sm font-bold text-green-700">습도</p>
              <p className="text-lg font-semibold">{weatherInfo.humidity}%</p>
            </div>
            <div className="border-2 border-green-500 bg-gray-200 p-3 rounded-lg w-24 text-center">
              <p className="text-sm font-bold text-green-700">풍속</p>
              <p className="text-lg font-semibold">{weatherInfo.windSpeed} m/s</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={weatherInfo.weatherIcon}
              alt={weatherInfo.description}
              className="w-36 h-36 object-contain"
            />
            <p className="text-sm font-bold text-gray-700">{weatherInfo.description}</p>
          </div>
        </div>

        {/* 하단 그래프 및 리스트 */}
        <div className="flex justify-between mt-6 space-x-6">
          <div className="w-2/3">
            <BikeDemandGraph />
          </div>
          <RentalStationList stations={stationInfo.nearby_stations} />
        </div>

        {/* 5일/3시간 날씨 예보 */}
        <div className="mt-8 bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-center mb-4">4일간 날씨 예보</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {forecastInfo.map((forecast, index) => (
              <div
                key={index}
                className="border-2 border-green-500 bg-white p-4 rounded-lg text-center"
              >
                <p className="text-sm font-bold">{forecast.datetime}</p>
                <img
                  src={forecast.weatherIcon}
                  alt={forecast.description}
                  className="w-16 h-16 mx-auto"
                />
                <p className="text-lg font-semibold">{forecast.temperature}°C</p>
                <p className="text-sm">{forecast.description}</p>
                <p className="text-sm">습도: {forecast.humidity}%</p>
                <p className="text-sm">풍속: {forecast.windSpeed} m/s</p>
                <p className="text-sm">강수량: {forecast.rainVolume} mm</p>
                <p className="text-sm">강설량: {forecast.snowVolume} mm</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
