import React from "react";

interface ListComponentProps {
  results: { id: number; name: string; address: string; count: number }[]; // 검색 결과 배열
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
    <div className="mt-8 bg-gray-100 rounded-lg p-4 w-full max-w-md border border-green-500 h-64 overflow-y-auto">
      <table className="table-auto w-full text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-4 text-black w-12">번호</th>
            <th className="px-4 py-4 text-black w-32">대여소 이름</th>
            <th className="px-4 py-4 text-black w-64">상세 주소</th>
            <th className="px-4 py-4 text-black w-20">대여 개수</th>
          </tr>
        </thead>
        <tbody>
          {results.map((item, index) => (
            <tr
              key={index}
              onClick={() => onSelectItem(item.name)}
              className={`cursor-pointer ${
                selectedItem === item.name
                  ? "bg-green-500 text-black" // 선택된 항목도 검정색 텍스트
                  : "hover:bg-gray-300 text-black"
              }`}
            >
              <td className="px-4 py-4">{item.id}</td>
              <td className="px-4 py-4">{item.name}</td>
              <td className="px-4 py-4 break-words">{item.address}</td>
              <td className="px-4 py-4">{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListComponent;
