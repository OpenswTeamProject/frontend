import React from "react";
import { Link } from "react-router-dom";

interface ListComponentProps {
  results: string[]; // 검색 결과 배열
  selectedItem: string | null; // 선택된 항목
  onSelectItem: (item: string) => void; // 항목 선택 핸들러
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
    <div
      className="mt-8 bg-gray-100 rounded-2xl p-4 w-full max-w-xl border border-green-500"
      style={{
        maxHeight: '400px', // 최대 높이를 설정
        overflowY: 'auto',  // 스크롤 활성화
        paddingRight: '10px', // 스크롤바 오른쪽 간격 조정
      }}
    >
      <style>
        {`
        /* 스크롤바 스타일 */
        div::-webkit-scrollbar {
          width: 18px; /* 스크롤바의 너비 */
        }
  
        div::-webkit-scrollbar-track {
          background: #f0f0f0; /* 스크롤바 트랙 색상 */
          border-radius: 11px; /* 트랙 모서리 둥글게 */
        }
  
        div::-webkit-scrollbar-thumb {
          background: #a3a3a3; /* 스크롤바 핸들 색상 */
          border-radius: 14px; /* 핸들 모서리 둥글게 */
        }
  
        div::-webkit-scrollbar-thumb:hover {
          background: #7e7e7e; /* 스크롤바 핸들 hover 색상 */
        }
        `}
      </style>
    
      {results.length === 0 ? (
        <p className="text-gray-400">검색 결과가 없습니다.</p> // 결과가 없을 때 메시지 표시
      ) : (
        results.map((item, index) => (
          <Link
            key={index}
            to="/statistics" // 통계 페이지로 이동
            state={{ selectedStation: item }} // 선택된 항목 데이터 전달
            onClick={() => onSelectItem(item)} // 선택된 항목 상태 업데이트
            className={`block p-3 mb-2 rounded-lg text-left cursor-pointer focus:outline-none ${
              selectedItem === item
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-green-800 hover:bg-gray-300"
            }`}
          >
            {item}
          </Link>
        ))
      )}
    </div>
  );
};

export default ListComponent;
