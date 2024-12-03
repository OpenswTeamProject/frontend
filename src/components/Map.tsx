import React, { useEffect, useRef, useState } from "react";

interface MapProps {
  latitude: number;
  longitude: number;
}

const Map: React.FC<MapProps> = ({ latitude, longitude }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    const initializeMap = () => {
      if (!mapRef.current || !window.kakao || !window.kakao.maps) return;

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

    const loadKakaoMapScript = () => {
      return new Promise<void>((resolve) => {
        if (window.kakao && window.kakao.maps) {
          setIsMapLoaded(true);
          resolve();
        } else {
          const script = document.createElement("script");
          const apiKey = import.meta.env.VITE_MAP_API_KEY; // 환경 변수에서 API 키 가져오기
          script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
          script.onload = () => {
            window.kakao.maps.load(() => {
              setIsMapLoaded(true);
              resolve();
            });
          };
          document.head.appendChild(script);
        }
      });
    };

    // 카카오맵 스크립트 로드 후 지도 초기화
    loadKakaoMapScript().then(() => {
      if (isMapLoaded) {
        initializeMap();
      }
    });
  }, [latitude, longitude, isMapLoaded]);

  return <div ref={mapRef} style={{ width: "100%", height: "450px", marginTop: "20px" }} />;
};

export default Map;
