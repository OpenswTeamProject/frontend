import React from "react";
import WeatherIcon from "./WeatherIcon";
import { mockWeatherData } from "../api/mockWeatherData";

type WeatherInfoProps = {
  imageSize?: "small" | "large"; // 이미지 크기 옵션
};

const WeatherInfo: React.FC<WeatherInfoProps> = ({ imageSize = "small" }) => {
  const { temperature, humidity, windSpeed, weather } = mockWeatherData;
  const iconSize = imageSize === "large" ? "w-36 h-36" : "w-12 h-12"; // 크기 설정

  return (
    <div className="flex flex-col items-center">
      {/* WeatherIcon에 동적으로 크기 전달 */}
      <WeatherIcon weather={weather as "rain" | "sunny" | "cloudy"} className={iconSize} />
    </div>
  );
};

export default WeatherInfo;
