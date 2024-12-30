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

function CouponCode({ data, loading, setSelectedCard, setCouponCodeId }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(""); // State for search input
    const couponCodeData = data || [];
    //console.log('couponCodeData', couponCodeData)
    const itemsPerPage = 6;
  
    // Filter students based on the search term (studentID or email)
    const filteredData = couponCodeData?.filter(
      (student) =>
        student?.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student?.text?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    // Calculate the total number of pages for filtered data
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  
    // Get the current page's students based on filtered data
    const currentStudents = filteredData.slice(
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

    const handleEditCouponCode = (id) => {
        setCouponCodeId(id)
        setSelectedCard('editCouponCode')
    }

    const handleDeleteCouponCode = (id) => {
        setCouponCodeId(id)
        setSelectedCard('deleteCouponCode')
    }


  return (
    <div className="flex flex-col p-4 gap-[30px] bg-white border-[1px] border-white shadow-sm rounded-t-[12px]">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-[50px]">
          <h3 className="text-lg font-semibold text-[#121212]">
            {filteredData.length} Coupon Codes
          </h3>
          <div className="flex items-center w-[400px] bg-white gap-[6px] rounded-[8px] border-[1px] py-[10px] px-[14px]">
            <CiSearch className="text-[21px]" />
            <input
              type="text"
              className="input border-none p-0"
              placeholder="Search by coupon code or text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value); // Update search term on input change
                setCurrentPage(1); // Reset to first page on search term change
              }}
            />
          </div>
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
                <th className="px-6 py-3 text-left text-gray-600 font-medium text-[12px]">
                  Coupon Text
                </th>
                <th className="px-6 py-3 text-left text-gray-600 font-medium text-[12px]">
                  Coupon Code
                </th>
                <th className="px-6 py-3 text-left text-gray-600 font-medium text-[12px]">
                  Percentage Discount
                </th>
                <th className="px-6 py-3 text-left text-gray-600 font-medium text-[12px]">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-gray-600 font-medium text-[12px]">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-gray-600 font-medium text-[12px]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((order) => {
                const { formattedDate, formattedTime } = formatDateAndTime(
                  order?.createdAt
                );
                return (
                  <tr key={order?._id}>
                    <td className="px-6 py-4 text-[13px] text-[#121212] font-normal">
                      {order?.text}
                    </td>
                    <td className="px-6 py-4 text-[13px] text-[#121212] font-normal">
                      {order?.code}
                    </td>
                    <td className="px-6 py-4 text-[13px] font-normal text-[#13693B]">
                      {order?.percentageOff}%
                    </td>
                    <td className="px-6 py-4 text-[13px] text-[#121212] font-normal">
                      {order?.students?.length}/{order.maxNumber}
                    </td>
                    <td className="px-6 py-4 text-[13px] text-start text-[#121212] font-normal">
                      <p className="text-[13px] font-normal text-[#121212]">
                        {formattedDate}
                      </p>
                      <p className="text-[13px] font-normal text-[#717171]">
                        {formattedTime}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative cursor-pointer flex items-center justify-between gap-2 group">
                        <div
                            className={`py-[5px] px-[10px] rounded-[100px] ${
                                order?.active === false
                                ? "bg-[#FEF3F2] text-error"// Pending style
                                : order?.active === true
                                ? "bg-[#05A75312] text-primary-color" // Successful style
                                : order?.active === 'Rejected'
                                ? "bg-[#FEF3F2] text-error"
                                : "bg-[#0b334c] text-[#585858]" // Inactive or other status style
                            }`}
                        >
                            {order?.active ? 'Active' : 'Inactive' }
                        </div>

                        <div>
                          <FiMoreVertical />
                        </div>

                        {/* MODAL POPUP, visible only on hover */}
                        <div className="absolute z-50 top-8 flex flex-col gap-3 bg-white border-[1px] border-gray-200 shadow-lg rounded-[8px] p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-[170px]">
                          <Link
                            onClick={() => handleEditCouponCode(order._id)}
                            className="flex items-center gap-3 text-sm"
                          >
                            <MdOutlineRemoveRedEye />
                            View
                          </Link>
                          <button
                            className="flex items-center gap-3 text-sm text-[#D34B56]"
                            onClick={() => handleDeleteCouponCode(order._id)}
                          >
                            <MdOutlineDeleteOutline />
                            Delete
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
        <div className="flex gap-[8px] items-center w-full">
          <button
            onClick={handlePreviousPage}
            className="px-3 py-1 border rounded bg-white flex items-center gap-1 mr-auto"
          >
            <FaArrowLeft />
            Previous
          </button>
          {renderPagination()}
          <button
            onClick={handleNextPage}
            className="px-3 py-1 border rounded bg-white flex items-center gap-1 ml-auto"
          >
            Next
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CouponCode
