import React from "react";

interface DockInfoProps {
  totalSlots: number; // 거치대 수
}

const DockInfo: React.FC<DockInfoProps> = ({ totalSlots }) => {
  return (
    <div className="border-2 border-green-500 bg-gray-200 p-6 rounded-lg text-center w-48">
      <p className="text-lg font-bold text-green-700">거치대 수</p>
      <p className="text-2xl font-semibold">{totalSlots}</p>
    </div>
  );
};

export default DockInfo;
