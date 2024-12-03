import React from "react";
import { Link } from "react-router-dom";

interface ListComponentProps {
  results: string[]; // 검색 결과 배열
  selectedItem: string | null; // 선택된 항목
  onSelectItem: (item: string) => void; // 항목 선택 핸들러
  currentPage: number; // 현재 페이지 번호
  itemsPerPage: number; // 페이지당 표시할 항목 수
}

const ListComponent: React.FC<ListComponentProps> = ({
  results,
  selectedItem,
  onSelectItem,
  currentPage,
  itemsPerPage,
}) => {
  if (results.length === 0) {
    return <p className="text-gray-400">검색 결과가 없습니다.</p>;
  }

  return (
    <div className="rounded-[15px] overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead className=" bg-gray-200">
          <tr>
            <th className="w-1/12 px-4 py-3 border-b text-left text-sm font-bold text-gray-500">
              No.
            </th>
            <th className="px-2 py-3 border-b  text-sm font-bold text-gray-500 pr-10 ">
              
            </th>
          </tr>
        </thead>
        <tbody>
          {results.map((item, index) => (
            <tr
              key={index}
              className={`hover:bg-gray-100 ${
                selectedItem === item ? "bg-green-200" : ""
              }`}
            >
              <td className="px-6 py-4 border-b text-sm text-gray-700">
                {currentPage * itemsPerPage + index + 1}
              </td>
              <td className="px-6 py-4 border-b text-sm text-gray-700">
                <Link
                  
                  to="/statistics" // 통계 페이지로 이동
                  state={{ selectedStation: item }} // 선택된 데이터 전달
                  onClick={() => onSelectItem(item)} // 선택된 항목 상태 업데이트
                  className="text-navy-600 hover:text-green-700"
                >
                  {item}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListComponent;
