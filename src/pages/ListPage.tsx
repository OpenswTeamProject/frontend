import React, { useState } from "react";

const ListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // 검색어 상태
  const [results, setResults] = useState<string[]>([]); // 검색 결과 상태
  const [selectedItem, setSelectedItem] = useState<string | null>(null); // 선택된 항목 상태
  const [hasSearched, setHasSearched] = useState<boolean>(false); // 검색 버튼 클릭 여부 상태

  // 전체 데이터
  const allData = [
    "강남구 대여소 1",
    "강남구 대여소 2",
    "강남구 대여소 3",
    "강남구 대여소 4",
    "서초구 대여소 1",
    "서초구 대여소 2",
  ];

  // 검색 버튼 클릭 시 데이터 필터링
  const handleSearch = () => {
    setHasSearched(true); // 검색 버튼 클릭 상태를 true로 설정
    const filteredData = allData.filter((item) =>
      item.includes(searchTerm)
    );
    setResults(filteredData); // 필터링 결과 업데이트
  };

  // 리스트 항목 클릭 처리
  const handleSelectItem = (item: string) => {
    setSelectedItem(item); // 선택된 항목 업데이트
    alert(`선택된 대여소: ${item}`); // 선택된 항목을 알림으로 표시
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
          onChange={(e) => setSearchTerm(e.target.value)} // 검색어 상태 업데이트
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

      {/* 검색 결과 리스트 */}
      {results.length > 0 && (
        <div className="mt-8 bg-gray-100 rounded-lg p-4 w-full max-w-md border border-green-500">
          {results.map((item, index) => (
            <button
              key={index}
              onClick={() => handleSelectItem(item)} // 클릭 시 선택 처리
              className={`p-3 mb-2 rounded-lg w-full text-left cursor-pointer focus:outline-none ${
                selectedItem === item
                  ? "bg-green-500 text-white" // 선택된 항목 스타일
                  : "bg-gray-200 text-green-800 hover:bg-gray-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* 검색 결과가 없을 때 */}
      {hasSearched && results.length === 0 && (
        <p className="mt-8 text-gray-400">검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default ListPage;
