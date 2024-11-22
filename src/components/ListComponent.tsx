import React from "react";
import { Link } from "react-router-dom";

interface Station {
  station_id: number;
  station_name: string;
  region: string;
  address: string;
}

interface ListComponentProps {
  results: Station[]; // 검색 결과 배열 (객체 배열)
  selectedItem: Station | null; // 선택된 항목 (객체)
  onSelectItem: (item: Station) => void; // 항목 선택 핸들러
}

const ListComponent: React.FC<ListComponentProps> = ({
  results,
  selectedItem,
  onSelectItem,
}) => {
  if (results.length === 0) {
    return <p className="text-gray-400">검색 결과가 없습니다.</p>;
  }

  return (
    <div className="mt-8 bg-gray-100 rounded-lg p-4 w-full max-w-md border border-green-500">
      {results.map((item) => (
        <Link
          key={item.station_id}
          to={`/details/${item.station_id}`} // 링크 경로 설정
          onClick={() => onSelectItem(item)} // 선택된 항목 상태 업데이트
          className={`block p-3 mb-2 rounded-lg text-left cursor-pointer focus:outline-none ${
            selectedItem?.station_id === item.station_id
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-green-800 hover:bg-gray-300"
          }`}
        >
          <h3 className="font-bold">{item.station_name}</h3>
          <p>Region: {item.region}</p>
          <p>Address: {item.address}</p>
        </Link>
      ))}
    </div>
  );
};

export default ListComponent;
