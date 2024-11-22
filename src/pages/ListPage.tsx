import React, { useState } from "react";
import ListComponent from "../components/ListComponent";

type Station = {
  station_id: number;
  station_name: string;
  region: string;
  address: string;
};

const ListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<Station[]>([]);
  const [selectedItem, setSelectedItem] = useState<Station | null>(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/stations?search=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      setResults(data.stations);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  const handleSelectItem = (item: Station) => {
    setSelectedItem(item); // 선택된 항목 업데이트
    console.log(`Selected station: ${item.station_name}`);
  };

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center text-center text-white">
      <h1 className="text-3xl font-bold mb-8">대여소 리스트</h1>

      {/* 검색창 */}
      <div className="relative w-full max-w-md">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="검색어를 입력하세요"
          className="w-full p-3 rounded-full border border-green-500 bg-gray-200 text-black focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="absolute right-2 top-2 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
        >
          검색
        </button>
      </div>

      {/* 검색 결과 */}
      <ListComponent results={results} selectedItem={selectedItem} onSelectItem={handleSelectItem} />
    </div>
  );
};

export default ListPage;
