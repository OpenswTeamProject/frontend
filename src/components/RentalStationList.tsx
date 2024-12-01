import React from "react";

interface RentalStationListProps {
  stations?: { station_name: string; total_slots: number }[]; 
}

const RentalStationList: React.FC<RentalStationListProps> = ({ stations = [] }) => {
  if (stations.length === 0) {
    return (
      <div className="w-full border-green-500 bg-green-500 rounded-[30px] p-4 text-white">
        <div className="text-center font-bold">근처 대여소가 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="w-full border-2 border-green-600 rounded-[30px] shadow-lg p-4">

      <div className="text-xl border-2 border-green-600 bg-white text-navy-700 font-bold text-center rounded-[20px] py-5 mb-4">
        근처 대여소 정보
      </div>

      <div
        className="overflow-y-auto max-h-64 scrollbar-custom px-3" 
        style={{ paddingRight: "10px" }} 
      >
        {stations.map((station, index) => (
          <div
            key={index}
            className="bg-gray-200 p-4 rounded-[20px] mb-4 shadow-md mx-2"
          >
            <p className="text-lg font-bold text-center">{station.station_name}</p>
            <p className="text-md text-gray-600 text-center">
              거치대 수: {station.total_slots}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentalStationList;
