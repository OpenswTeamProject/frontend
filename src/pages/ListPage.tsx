import React, { useState } from "react";
import ListComponent from "../components/ListComponent";
import { ImSearch } from "react-icons/im";
import ReactPaginate from "react-paginate";
import { MdPedalBike } from "react-icons/md";

const ListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // 검색어 상태
  const [results, setResults] = useState<string[]>([]); // 검색 결과 상태
  const [hasSearched, setHasSearched] = useState<boolean>(false); // 검색 버튼 클릭 여부 상태
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태
  const [currentPage, setCurrentPage] = useState<number>(0); // 현재 페이지 번호
  const itemsPerPage = 15; // 한 페이지에 표시할 항목 수

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

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected); // 선택된 페이지로 변경
  };

  const handleSelectItem = (item: string) => {
    console.log(`Selected item: ${item}`); // 선택된 대여소 확인용
  };

  // 현재 페이지에 보여줄 데이터 계산
  const offset = currentPage * itemsPerPage;
  const currentItems = results.slice(offset, offset + itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start pt-10 text-center">
      <h1 className="text-left text-2xl font-bold mb-4 text-navy-700">서울시 공공자전거 대여소</h1>
      <MdPedalBike className="mt-2 h-14 w-14 text-green-600"/>

      {/* 검색창 */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className="relative w-full max-w-3xl ml-3 mb-2"
      >
        <div className="flex items-center w-full space-x-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="검색어를 입력하세요"
            style={{ paddingLeft: "1.5rem" }}
            className="flex-grow p-3 text-sm rounded-[30px] border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-3 py-4 rounded-[30px] text-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <ImSearch className="text-white text-center ml-2 h-4 w-4" />
            <span></span>
          </button>
        </div>
      </form>

      {/* 로딩 상태 */}
      {loading && <p className="text-gray-400 mt-4">로딩 중...</p>}

      {/* 에러 메시지 */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* 검색 결과 리스트 */}
      {hasSearched && (
        <div className="mt-1 w-full max-w-4xl p-10 bg-white rounded-[20px] shadow-lg">
          <ListComponent
            results={currentItems} // 현재 페이지 데이터 전달
            selectedItem={null}
            onSelectItem={handleSelectItem}
            currentPage={currentPage} // 현재 페이지 번호 전달
            itemsPerPage={itemsPerPage} // 페이지당 항목 수 전달
          />

          {/* 페이지네이션 */}
          <div className="mt-10">
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              pageCount={Math.ceil(results.length / itemsPerPage)} // 총 페이지 수
              marginPagesDisplayed={2}
              pageRangeDisplayed={10}
              onPageChange={handlePageClick}
              containerClassName={"pagination flex justify-center space-x-2"}
              pageClassName={"px-3 py-1 rounded-md border border-gray-300"}
              activeClassName={"bg-green-600 text-white"}
              previousClassName={"px-3 py-1 rounded-md border border-gray-300"}
              nextClassName={"px-3 py-1 rounded-md border border-gray-300"}
              disabledClassName={"opacity-50 cursor-not-allowed"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListPage;
