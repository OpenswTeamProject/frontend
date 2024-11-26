import React from "react";

type WeatherIconProps = {
  weather: "rain" | "sunny" | "cloudy"; // 타입 명시
  className?: string; // 클래스명 설정
};

const WeatherIcon: React.FC<WeatherIconProps> = ({ weather, className }) => {
  const weatherIcons: Record<string, string> = {
    rain: "/rain.png",
    sunny: "/Sunny.png",
    cloudy: "/Cloudy.png",
  };

  return <img src={weatherIcons[weather]} alt={weather} className={className} />;
};

export default WeatherIcon;
