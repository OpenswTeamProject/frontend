import React, { useState } from "react";
import ListComponent from "../components/ListComponent";

const ListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // 검색어 상태
  const [results, setResults] = useState<string[]>([]); // 검색 결과 상태
  const [hasSearched, setHasSearched] = useState<boolean>(false); // 검색 버튼 클릭 여부 상태
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  const handleSearch = async () => {
    setHasSearched(true);
    setError(null);
    setResults([]);
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/stations?search=${encodeURIComponent(searchTerm)}`
      );

      if (!response.ok) {
        throw new Error("검색 결과를 가져오는 중 문제가 발생했습니다.");
      }

      const data = await response.json();
      setResults(data.stations.map((station: any) => station.station_name)); // 대여소 이름만 추출
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 에러");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectItem = (item: string) => {
    console.log(`Selected item: ${item}`); // 선택된 대여소 확인용
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

      {/* 로딩 상태 */}
      {loading && <p className="text-gray-400">로딩 중...</p>}

      {/* 에러 메시지 */}
      {error && <p className="text-red-500">{error}</p>}

      {/* 검색 결과 리스트 */}
      {hasSearched && (
        <ListComponent
          results={results}
          selectedItem={null}
          onSelectItem={handleSelectItem}
        />
      )}
    </div>
  );
};

export default ListPage;
