import { CiSearch } from "react-icons/ci";
import DateFilter from "../Helpers/DateFilter";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Spinner from "../Helpers/Spinner";
import { formatDateAndTime } from "../../Helpers/formatDateAndTime";
import { FiMoreVertical } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { deleteCms } from "../../Helpers/apis";
import toast from "react-hot-toast";
import Button from "../Helpers/Button";

function Published({ data, loading, setCardState, setSelectedCard, setCmsId }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const studentData = data || [];
  const itemsPerPage = 6;
  //console.log('objectddf', studentData)

  // Filter students based on the search term (studentID or email)
  const filteredData = studentData?.filter(
    (student) =>
      student?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student?.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the total number of pages for filtered data
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);

  // Get the current page's students based on filtered data
  const currentStudents = filteredData?.slice(
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

  //TOGGLE BLACKLIST
  const [ blacklisting, setBlacklisting ] = useState(false)
  const handleDeleteCms = async (value) => {
    setCmsId(value),
    setSelectedCard('deleteCms')
  }

  function truncateText(text, wordLimit) {
    if (!text) return "";
    
    const words = text.split(" "); // Split text into an array of words
    if (words.length <= wordLimit) return text; // Return text if it's within the word limit
    
    return words.slice(0, wordLimit).join(" ") + "..."; // Join the first N words and append "..."
  }

  const handleAddContent = () => {
    setCardState('addContent')
  }

  return (
    <div className="flex flex-col p-4 gap-[30px] bg-white border-[1px] border-white shadow-sm rounded-t-[12px]">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-[50px]">
          <h3 className="text-lg font-semibold text-[#121212]">
            {filteredData.length} Published
          </h3>
          <div className="flex items-center w-[400px] bg-white gap-[6px] rounded-[8px] border-[1px] py-[10px] px-[14px]">
            <CiSearch className="text-[21px] cursor-pointer" />
            <input
              type="text"
              className="input border-none p-0"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value); // Update search term on input change
                setCurrentPage(1); // Reset to first page on search term change
              }}
            />
          </div>
        </div>

        <div>
            {/**NEW CONTENT */}
            <Button onCLick={handleAddContent} text={'Add Content'} />
        </div>
      </div>

      <div>
        {loading ? (
          <div className="w-full flex items-center justify-center mt-12 mb-12">
            <Spinner />
          </div>
        ) : (
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-[#F9F9F9] rounded-t-[12px]">
                <th className="px-6 py-3 text-left text-gray-600 font-medium text-[12px] tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-gray-600 font-medium text-[12px] tracking-wider">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-gray-600 font-medium text-[12px] tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-gray-600 font-medium text-[12px] tracking-wider">
                  Author
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
              {currentStudents?.map((student) => {
                const { formattedDate, formattedTime } = formatDateAndTime(
                  student?.createdAt
                );
                return (
                  <tr key={student?._id}>
                    <td className="px-6 py-4 text-[14px] text-[#121212] font-normal">
                      {truncateText(student?.title, 8)}
                    </td>
                    <td dangerouslySetInnerHTML={{ __html: truncateText(student?.message, 8) }} className="px-6 py-4 text-[14px] text-[#121212] font-normal">
                    </td>
                    <td className="px-6 py-4 text-[14px] font-normal text-[#585858]">
                      {student?.type === 'pushnotification' ? 'Push Notification' : 'Mail'}
                    </td>
                    <td className="px-6 py-4 text-[14px] font-normal text-[#585858]">
                      {student?.author}
                    </td>
                    <td className="px-6 py-4 text-[14px] text-[#121212] font-normal">
                      <p className="text-[14px] font-normal text-[#121212]">
                        {formattedDate}
                      </p>
                      <p className="text-[14px] font-normal text-[#717171]">
                        {formattedTime}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative cursor-pointer flex justify-between gap-2 group">
                        <div
                          className={`py-[5px] px-[10px] rounded-[100px] bg-[#FCB90B12] text-[#FCB90B]`}
                        >
                          {student?.status}
                        </div>

                        <div>
                          <FiMoreVertical />
                        </div>

                        {/* MODAL POPUP, visible only on hover */}
                        <div className="absolute z-50 top-8 flex flex-col gap-3 bg-white border-[1px] border-gray-200 shadow-lg rounded-[8px] p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-[170px]">
                          <Link
                            to={`/edit-cms/${student._id}`}
                            className="flex items-center gap-3 text-sm text-primary-color"
                          >
                            <MdOutlineRemoveRedEye />
                            View
                          </Link>
                          <button
                            className="flex items-center gap-3 text-sm text-[#D34B56]"
                            onClick={() => handleDeleteCms(student._id)}
                          >
                            <MdOutlineDeleteOutline />
                            { blacklisting ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <div className="w-full flex justify-center items-center pt-[30px]">
        <div className="flex w-full gap-[8px] items-center justify-between">
          <button
            onClick={handlePreviousPage}
            className="px-3 py-1 border rounded bg-white flex gap-[8px] items-center justify-center"
          >
            <FaArrowLeft />
            Previous
          </button>
          {renderPagination()}
          <button
            onClick={handleNextPage}
            className="px-3 py-1 border rounded bg-white flex gap-[8px] items-center justify-center"
          >
            Next
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Published;
