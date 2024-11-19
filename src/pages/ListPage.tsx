import React, { useState } from "react";

const ListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<string[]>([]);
  


  //여기가 데이터기준으로 필터링하는 부분
  const handleSearch = () => {
    //  예시데이터
    const allData = [
      "강남구 대여소 1",
      "강남구 대여소 2",
      "강남구 대여소 3",
      "강남구 대여소 4",
      "서초구 대여소 1",
      "서초구 대여소 2",
    ];
  
    // 검색어를 기준으로 데이터 필터링
    const filteredData = allData.filter((item) =>
      item.includes(searchTerm) // 검색어가 포함된 항목만 반환
    );
  
    // 결과 업데이트
    setResults(filteredData);
  };

 
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center text-center text-white"
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
          className="absolute right-2 top-2 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
        >
          검색
        </button>
      </div>

      {/* 검색 결과 리스트 */}
      {results.length > 0 && (
        <div className="mt-8 bg-gray-100 rounded-lg p-4 w-full max-w-md border border-green-500">
          {results.map((item, index) => (
            <div
              key={index}
              className="p-3 mb-2 bg-gray-200 rounded-lg text-green-800"
            >
              {item}
            </div>
          ))}
        </div>
      )}

    
      

      {/* 검색 결과가 없을 때 */}
      {results.length === 0 && searchTerm && (
        <p className="mt-8 text-gray-400">검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default ListPage;
