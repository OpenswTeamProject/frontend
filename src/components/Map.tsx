import React, { useEffect, useRef } from "react";

interface MapProps {
  latitude: number;
  longitude: number;
}

const Map: React.FC<MapProps> = ({ latitude, longitude }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeMap = () => {
      if (!mapRef.current) return;

      const mapOption = {
        center: new window.kakao.maps.LatLng(latitude, longitude), // 지도 중심 좌표
        level: 3, // 확대 레벨
      };

      const map = new window.kakao.maps.Map(mapRef.current, mapOption); // 지도 생성

      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(latitude, longitude), // 마커 위치
      });

      marker.setMap(map); // 마커 추가
    };

    // 카카오맵 스크립트가 로드되지 않았다면 추가
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_JAVASCRIPT_KEY`;
      script.onload = initializeMap; // 스크립트 로드 후 지도 초기화
      document.head.appendChild(script);
    } else {
      initializeMap();
    }
  }, [latitude, longitude]);

  return <div ref={mapRef} style={{ width: "100%", height: "450px", marginTop: "20px" }} />;

};

export default Map;

