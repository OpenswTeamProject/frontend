import React, { useState } from "react";
import ListComponent from "../components/ListComponent";

const ListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // 검색어 상태
  const [results, setResults] = useState<string[]>([]); // 검색 결과 상태
  const [hasSearched, setHasSearched] = useState<boolean>(false); // 검색 버튼 클릭 여부 상태
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

    // 환경 변수에서 API URL 가져오기
    const BASE_API_URL = import.meta.env.VITE_API_URL;

    const handleSearch = async () => {
      setHasSearched(true);
      setError(null);
      setResults([]);
      setLoading(true);
  
      try {
        const response = await fetch(
          `${BASE_API_URL}/stations?search=${encodeURIComponent(searchTerm)}`
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
    <div
      className="min-h-screen bg-white flex flex-col items-center justify-start pt-40 text-center text-navy-700"
      style={{
        backgroundImage: "url('/background.jpg')", // 배경 이미지 경로 설정
        backgroundSize: "cover", // 이미지가 화면에 맞게 커버되도록 설정
        backgroundPosition: "right center", // 오른쪽으로 치우치게 배경 위치 조정
        backgroundRepeat: "no-repeat", // 배경 반복 없음
        filter: "opacity(0.9)",
      }}
    >
      <h1 className="text-3xl font-bold mb-10 text-black">서울시 공공자전거 대여소</h1>

      {/* 검색창 */}
      <form
        onSubmit={(e) => {
          e.preventDefault(); // 폼 기본 제출 동작 방지
          handleSearch(); // 검색 실행
        }}
        className="relative w-full max-w-xl mt-10" // max-w-xl로 너비 설정 및 mt-10로 검색창 아래로 이동
      >
        <div className="relative flex items-center w-full">
          <span className="absolute left-4 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6" // 아이콘 크기
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.9 14.32a8 8 0 111.42-1.42l4.27 4.27a1 1 0 11-1.42 1.42l-4.27-4.27zM8 14a6 6 0 100-12 6 6 0 000 12z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="지역을 입력하세요"
            className="w-full p-4 pl-12 text-lg rounded-full border border-gray-300 bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-green-500" // padding, text 크기 증가
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 transform -translate-y-1/2 bg-green-500 text-white px-6 py-3 rounded-full text-lg hover:bg-green-700" // 버튼 크기 증가
          >
            검색
          </button>
        </div>
      </form>

      {/* 로딩 상태 */}
      {loading && <p className="text-gray-400 mt-4">로딩 중...</p>}

      {/* 에러 메시지 */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

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
