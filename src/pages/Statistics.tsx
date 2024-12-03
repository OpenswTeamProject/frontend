import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RentalStationList from "../components/RentalStationList";
import BikeDemandGraph from "../components/BikeDemandGraph";
import Map from "../components/Map";


import { ImSearch } from "react-icons/im";
import { WiHumidity, WiThermometer, WiWindy } from "react-icons/wi";
import { MdPedalBike } from "react-icons/md";

const Statistics: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedStation = location.state?.selectedStation || "대여소 정보 없음";
  const BASE_API_URL = import.meta.env.VITE_API_URL;
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

          `${BASE_API_URL}/stations/station_info?station=${encodeURIComponent(
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

        `${BASE_API_URL}/weather/current?lat=${lat}&lon=${lon}`

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
        `${BASE_API_URL}/weather/forecast?lat=${lat}&lon=${lon}`
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
<div className="min-h-screen bg-gray-100">
  <header className="sticky top-0 z-10 bg-white p-2 shadow flex items-center justify-between">
    <div>
      <h1 className="ml-6 mt-[8px] text-2xl font-bold text-gray-400">
        {stationInfo?.station_name}
      </h1>
    </div>
    <div className="flex items-center">
      <img
        src={weatherInfo?.weatherIcon}
        alt={weatherInfo?.description}
        className="w-16 h-16 mr-1"
      />
      <div className="mr-2">
        <p className="text-xl font-bold">{weatherInfo?.temperature}°C</p>
        <p className="text-sm text-gray-600">{weatherInfo?.description}</p>
      </div>
    </div>
  </header>
  <div className="flex w-full">
    <aside className="w-1/6 bg-gradient-to-r from-white to-gray-100 p-4 shadow-lg">
      <button
        onClick={() => navigate("/Listpage")}
        className="flex items-center space-x-2 text-lg font-bold text-gray-800 hover:text-green-500 mt-9"
      >
        <ImSearch className="text-green-600 h-6 w-6" />
        <span>대여소 검색하러 가기</span>
      </button>
      <div className="mt-12">
        <RentalStationList stations={stationInfo?.nearby_stations || []} />
      </div>
    </aside>
    <main className="flex-1 p-4">
      <div className="grid grid-cols-4 gap-3 mb-4">
        {[
          {
            label: "거치대 개수",
            value: stationInfo?.total_slots,
            icon: <MdPedalBike className="text-green-500 h-7 w-7" />,
          },
          {
            label: "온도",
            value: `${weatherInfo?.temperature}°C`,
            icon: <WiThermometer className="text-blue-500 h-8 w-8" />,
          },
          {
            label: "습도",
            value: `${weatherInfo?.humidity}%`,
            icon: <WiHumidity className="text-blue-500 h-8 w-8" />,
          },
          {
            label: "풍속",
            value: `${weatherInfo?.windSpeed} m/s`,
            icon: <WiWindy className="text-blue-500 h-8 w-8" />,
          },
        ].map((item, index) => (
          <div
            key={index}
            className="p-3 bg-white rounded-[16px] text-center shadow-lg flex flex-col items-center"
          >
            {item.icon}
            <p className="text-lg font-bold text-gray-400 mt-1">{item.label}</p>
            <p className="text-2xl font-bold text-navy-700">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <section className="bg-white rounded-[20px] shadow-lg p-3">
          <p className="text-[24px] font-bold text-navy-800">대여소위치</p>
          <p className="text-xs font-bold text-green-500">KakaoMap</p>
          <Map latitude={stationInfo?.latitude} longitude={stationInfo?.longitude} />
        </section>
        <div className="bg-white rounded-[20px] shadow-lg p-3">
          <p className="text-[24px] font-bold text-navy-800">대여수요예측</p>
          <p className="text-xs font-bold text-green-500">Demand Forecasting</p>
          <BikeDemandGraph station={selectedStation} />
        </div>
      </div>
      <div className="mt-4 bg-white rounded-[20px] shadow-lg p-3">
        <p className="text-[24px] font-bold text-navy-700">날씨예측</p>
        <p className="text-xs font-bold text-green-500 ml-1">4day Forecast</p>
        <table className="w-full text-[14px] font-bold text-left text-navy-700">
          <thead className="text-sm text-gray-400 border-b border-gray-300">
            <tr>
              <th scope="col" className="px-4 py-2">Date</th>
              <th scope="col" className="px-4 py-2">Status</th>
              <th scope="col" className="px-4 py-2">Temperature</th>
              <th scope="col" className="px-4 py-2">Humidity</th>
              <th scope="col" className="px-4 py-2">Wind Speed</th>
              <th scope="col" className="px-4 py-2">Rain Volume</th>
              <th scope="col" className="px-4 py-2">Snow Volume</th>
            </tr>
          </thead>
          <tbody>
            {forecastInfo.map((forecast, index) => (
              <tr key={index} className="bg-white">
                <td className="px-4 py-2">{forecast.datetime}</td>
                <td className="px-4 py-2 flex items-center space-x-1">
                  <img
                    src={forecast.weatherIcon}
                    alt={forecast.description}
                    className="inline w-8 h-8"
                  />
                  <span>{forecast.description}</span>
                </td>
                <td className="px-4 py-2">{forecast.temperature}°C</td>
                <td className="px-4 py-2">{forecast.humidity}%</td>
                <td className="px-4 py-2">{forecast.windSpeed} m/s</td>
                <td className="px-4 py-2">{forecast.rainVolume} mm</td>
                <td className="px-4 py-2">{forecast.snowVolume} mm</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  </div>
</div>

  );
};

export default Statistics;
