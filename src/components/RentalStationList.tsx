import React from "react";

const RentalStationList: React.FC = () => { //대여소 하드코딩
  const stations = [
    "역삼역 3번 출구",
    "강남역 5번 출구",
    "선릉역 2번 출구",
    "양재역 6번 출구",
    "역삼역 3번 출구 - 추가 정보",
    "강남역 5번 출구 - 추가 정보",
    "선릉역 2번 출구 - 추가 정보",
    "양재역 6번 출구 - 추가 정보",
  ];

  return (
    <div className="border-2 border-green-500 bg-gray-100 rounded-lg w-1/3">
      {/* 제목 */}
      <div className="bg-gray-200 p-2 border-b-2 border-green-500 text-center font-bold  sticky top-0">
        근처 대여소 정보
      </div>
      {/* 스크롤 가능한 리스트 */}
      <div
        className="p-4 overflow-y-auto h-64 scrollbar-custom"
        style={{
          maxHeight: "15rem", // 스크롤 가능한 최대 높이 설정
        }}
      >
        {stations.map((station, index) => (
          <div
            key={index}
            className="bg-gray-200 p-2 rounded-lg mb-2 shadow-md hover:bg-green-100"
          >
            {station}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentalStationList;
