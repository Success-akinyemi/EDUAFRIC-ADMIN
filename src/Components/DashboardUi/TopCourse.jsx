import { useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { MdOutlineFilterList } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { topCourse } from "../../Data/topCourse";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import DateFilter from "../Helpers/DateFilter";

function TopCourse() {
  const [currentPage, setCurrentPage] = useState(1);
  const [timeDate, setTimeDate] = useState();

  const itemsPerPage = 6;

  // Calculate the total number of pages
  const totalPages = Math.ceil(topCourse.length / itemsPerPage);

  // Get the current page's courses
  const currentCourses = topCourse.slice(
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
    <div className="flex flex-col gap-6">
      {/* Search and Filter Bar */}
      <div className="flex items-center">
        <div className="flex items-center w-[400px] bg-white gap-[6px]">
          <CiSearch />
          <input
            type="text"
            className="input"
            placeholder="Search for course"
          />
        </div>

        <div className="w-full flex">
            <DateFilter setTimeDate={setTimeDate} timeDate={timeDate} />
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-[12px] p-6 border-[1px] border-gray-200">
        <h2 className="text-off-black text-[18px] font-semibold">
          Top selling courses
        </h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-gray-600 font-medium text-[12px] tracking-wider">
                Course
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium text-[12px] tracking-wider">
                Order Amount
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium text-[12px] tracking-wider">
                Uploaded Date
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium text-[12px] tracking-wider">
                Instructor
              </th>
            </tr>
          </thead>
          <tbody>
            {currentCourses.map((course) => (
              <tr key={course._id} className="border-t border-gray-200">
                {/* Course Column */}
                <td className="px-6 py-4">
                  <div className="font-semibold text=-[14px] text-[#364152]">
                    {course?.title}
                  </div>
                  <div className="text-[14px] font-normal text-gray-600">
                    {course?.category.join(", ")}
                  </div>
                </td>
                {/* Order Amount Column */}
                <td className="px-6 py-4">
                  <div className="text-[14px] font-normal text-gray-600">
                    ${course?.price * course?.students?.length}
                  </div>
                </td>
                {/* Uploaded Date Column */}
                <td className="px-6 py-4">
                  <div className="text-[14px] font-normal text-gray-600">
                    {new Date(course.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </div>
                </td>
                {/* Instructor Column */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {course.img ? (
                      <img
                        src={course.img}
                        alt={`${course.instructorName}'s profile`}
                        className="w-[32px] h-[32px] rounded-full"
                      />
                    ) : (
                      <div className="w-[32px] h-[32px] rounded-full bg-gray-300 flex items-center justify-center text-gray-800 font-bold">
                        {course.instructorName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <div className="text-[14px] font-semibold text-gray-900">
                        {course.instructorName}
                      </div>
                      <div className="text-[14px] font-normal text-gray-600">
                        {course.instructorEmailL}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between border-t-[1px] border-t-gray-200 py-4 px-6">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="flex items-center justify-center gap-2 px-4 py-2 mr-2 bg-white border-[1px] text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          <FaArrowLeft />
          Previous
        </button>

        <div className="flex gap-1">
          {renderPagination()}
        </div>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center gap-2 px-4 py-2 ml-2 bg-white border-[1px] text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
            <FaArrowRight />
        </button>
      </div>

    </div>
  );
}

export default TopCourse;
