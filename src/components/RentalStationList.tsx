import React from "react";

interface RentalStationListProps {
  stations?: { station_name: string; total_slots: number }[]; // 대여소 데이터 배열 (optional)
}

const RentalStationList: React.FC<RentalStationListProps> = ({ stations = [] }) => {
  if (stations.length === 0) {
    return (
      <div className="border-2 border-green-500 bg-gray-100 rounded-lg w-1/3 p-4">
        <div className="text-center font-bold text-gray-500">
          근처 대여소가 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="border-2 border-green-500 bg-gray-100 rounded-lg w-1/3">
      {/* 제목 */}
      <div className="bg-gray-200 p-2 border-b-2 border-green-500 text-center font-bold sticky top-0">
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
            <p className="font-bold">{station.station_name}</p>
            <p className="text-sm text-gray-600">거치대 수: {station.total_slots}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentalStationList;
