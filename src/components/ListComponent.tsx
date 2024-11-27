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
      className="mt-8 bg-gray-100 rounded-lg p-4 w-full max-w-md border border-green-500"
      style={{
        maxHeight: '300px', // 최대 높이를 설정
        overflowY: 'auto',  // 스크롤 활성화
      }}
    >
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
