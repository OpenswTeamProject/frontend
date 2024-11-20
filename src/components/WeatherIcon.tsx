import React from "react";

type WeatherIconProps = {
    weather: "sunny" | "cloudy" | "rain"; // 가능한 옵션을 지정
  };
  

const WeatherIcon: React.FC<WeatherIconProps> = ({ weather }) => {
  const weatherIcons: Record<string, string> = {
    sunny: "public/Sunny.png",
    cloudy: "public/Cloudy.png",
    rain: "public/rain.png",
  };

  return <img src={weatherIcons[weather]} alt={weather} className="w-12 h-12" />;
};

export default WeatherIcon;
