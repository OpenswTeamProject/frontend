import React, { useState } from "react";
import ListComponent from "../components/ListComponent";

const ListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // 검색어 상태
  const [results, setResults] = useState<
    { id: number; name: string; address: string; count: number }[]
  >([]); // 검색 결과 상태
  const [selectedItem, setSelectedItem] = useState<string | null>(null); // 선택된 항목 상태
  const [hasSearched, setHasSearched] = useState<boolean>(false); // 검색 버튼 클릭 여부 상태

  const allData = [
    { id: 1, name: "강남구 대여소 1", address: "서울 강남구 테헤란로 1", count: 5 },
    { id: 2, name: "강남구 대여소 2", address: "서울 강남구 테헤란로 2", count: 3 },
    { id: 3, name: "강남구 대여소 3", address: "서울 강남구 테헤란로 3", count: 10 },
    { id: 4, name: "강남구 대여소 4", address: "서울 강남구 테헤란로 4", count: 2 },
    { id: 5, name: "서초구 대여소 1", address: "서울 서초구 서초대로 1", count: 8 },
    { id: 6, name: "서초구 대여소 2", address: "서울 서초구 서초대로 2", count: 6 },
  ];

  const handleSearch = () => {
    setHasSearched(true);
    const filteredData = allData.filter((item) =>
      item.name.includes(searchTerm)
    );
    setResults(filteredData);
  };

  const handleSelectItem = (item: string) => {
    setSelectedItem(item);
    console.log(`Selected item: ${item}`);
  };

  return (
    <div
      className="min-h-screen bg-gray-800 flex flex-col items-center justify-center text-center text-white"
      style={{
        backgroundImage: "url('/ListBack.png')",
      }}
    >
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
          className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
        >
          검색
        </button>
      </div>

      {/* 검색 결과 리스트 */}
      {hasSearched && (
        <ListComponent
          results={results}
          selectedItem={selectedItem}
          onSelectItem={handleSelectItem}
        />
      )}
    </div>
  );
};

export default ListPage;
