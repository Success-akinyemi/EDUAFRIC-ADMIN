import { CiSearch } from "react-icons/ci"
import DateFilter from "../Helpers/DateFilter"
import { useState } from "react";

function DataTable({ data, timeDate, setTimeDate }) {
  const [currentPage, setCurrentPage] = useState(1);
  const studentData = data || [] 

  const itemsPerPage = 6;

  // Calculate the total number of pages
  const totalPages = Math.ceil(studentData.length / itemsPerPage);

  // Get the current page's courses
  const currentCourses = studentData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle changing to the next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle changing to the previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to generate static pagination numbers
  const renderPagination = () => {
    if (totalPages <= 6) {
      // Display all pages if there are 6 or fewer
      return Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-3 py-1 border rounded ${
            currentPage === i + 1 ? "bg-gray-300" : "bg-white"
          }`}
        >
          {i + 1}
        </button>
      ));
    } else {
      // Display 1, 2, 3, ..., last 3 pages when total pages > 6
      return (
        <>
          <button
            onClick={() => setCurrentPage(1)}
            className={`px-3 py-1 border rounded ${
              currentPage === 1 ? "bg-gray-300" : "bg-white"
            }`}
          >
            1
          </button>
          <button
            onClick={() => setCurrentPage(2)}
            className={`px-3 py-1 border rounded ${
              currentPage === 2 ? "bg-gray-300" : "bg-white"
            }`}
          >
            2
          </button>
          <button
            onClick={() => setCurrentPage(3)}
            className={`px-3 py-1 border rounded ${
              currentPage === 3 ? "bg-gray-300" : "bg-white"
            }`}
          >
            3
          </button>
          <span className="px-2">...</span>
          {Array.from({ length: 3 }, (_, i) => (
            <button
              key={totalPages - 2 + i}
              onClick={() => setCurrentPage(totalPages - 2 + i)}
              className={`px-3 py-1 border rounded ${
                currentPage === totalPages - 2 + i ? "bg-gray-300" : "bg-white"
              }`}
            >
              {totalPages - 2 + i}
            </button>
          ))}
        </>
      );
    }
  };

  return (
    <div className="flex flex-col p-4 gap-[30px] bg-white border-[1px] border-white shadow-sm rounded-t-[12px]">
      
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-[50px]">
            <h3 className="text-lg font-semibold text-[#121212]" >34 Students</h3>
            <div className="flex items-center w-[400px] bg-white gap-[6px]">
                <CiSearch className="text-[28px] cursor-pointer" />
                <input
                    type="text"
                    className="input"
                    placeholder="Search"
                />
            </div>
        </div>

        <div className="">
            <div className="w-full flex">
                <DateFilter setTimeDate={setTimeDate} timeDate={timeDate} />
            </div>
        </div>
      </div>

      <div className="">
      <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-gray-600 font-medium text-[12px] tracking-wider">
                Student Name
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium text-[12px] tracking-wider">
                Display Name
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium text-[12px] tracking-wider">
                Student ID
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium text-[12px] tracking-wider">
                Email Address
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium text-[12px] tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium text-[12px] tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {currentCourses.map((course) => (
                <tr>

                </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default DataTable
