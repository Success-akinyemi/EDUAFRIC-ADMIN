import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Helpers/Navbar";
import Sidebar from "../../Components/Helpers/Sidebar";
import { IoIosArrowBack } from "react-icons/io";
import {
  fetchCourseContentForAdmin,
  fetchInstructorsCourses,
} from "../../Helpers/fetch.api";
import { formatDateAndTime } from "../../Helpers/formatDateAndTime";
import Spinner from "../../Components/Helpers/Spinner";
import { useState } from "react";
import toast from "react-hot-toast";
import { approveCourse, rejectCourse } from "../../Helpers/apis";

function CourseInfo({ setSelectedCard }) {
  const navigate = useNavigate();
  const loc = useLocation();
  const pathName = loc.pathname.split("/")[2];
  const { isFetchingInstructorsData, instructorsCourseData } =
    fetchInstructorsCourses({ allCourse: false, id: pathName });
  const dataArray = instructorsCourseData?.data;

  const {
    courseContentData,
    isFetchingCourseContent,
    courseContentServerError,
  } = fetchCourseContentForAdmin(pathName);
  const courseContent = courseContentData?.data
  const courseContentStatus = courseContentServerError?.response?.data?.msg

  const { formattedDate, formattedTime } = formatDateAndTime(
    dataArray?.createdAt
  );

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const [ approvingCourse, setApprovingCourse] = useState(false)
  const handleApproveCourse = async (id) => {
    try {
      if(approvingCourse){
        return
      }
      const confirm = window.confirm('Are you sure you want to approve this course')
      if(confirm){
        setApprovingCourse(true)
        const res = await approveCourse({ id: id })
        if(res.success){
          toast.success(res.data)
          window.location.reload()
        } else{
          toast.error(res.data)
        }
      }
    } catch (error) {
      
    } finally {
      setApprovingCourse(false)
    }
  }

  const [ rejectingCourse, setRejectingCourse ] = useState(false)
  const handleRejectCourse = async (id) => {
    setSelectedCard('rejectCourseModal')
    return
    try {
      setRejectingCourse(true)
      const res = await rejectCourse({ id: id })
      if(res.success){
        toast.success(res.data)
        window.location.reload()
      } else{
        toast.error(res.data)
      }
    } catch (error) {
      
    } finally {
      setRejectingCourse(false)
    }
  }
  return (
    <div className="page relative">
      <div className="fixed w-[257px] h-[100vh] left-0 top-0">
        <Sidebar />
      </div>

      <div className="section ml-auto">
        <Navbar />

        {isFetchingInstructorsData ? (
          <div className="w-full flex items-center justify-center mt-12 mb-12">
            <Spinner />
          </div>
        ) : (
          <div className="w-[97%] m-auto mt-4 tablet:w-full flex flex-col gap-[30px]">
            {/**TOP CARD*/}
            <div className="card flex flex-row justify-between">
              <div className="flex items-center gap-[50px]">
                <Link onClick={handleGoBack} className="">
                  <IoIosArrowBack />
                </Link>

                <div className="">
                  <div className="flex items-center gap-[6px]">
                    <div className="flex items-center gap-4">
                      <div className="flex  flex-col">
                        <h2 className="text-lg text-[#14142B] font-semibold">
                          Course Details
                        </h2>
                        <p className="text-xs font-normal text-[12px] text-[#929292]">
                          {dataArray?.slugCode}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`py-[5px] px-[10px] rounded-[100px] ${
                        dataArray?.isBlocked === true
                          ? "bg-[#FEF3F2] text-error" // Pending style
                          : dataArray?.approved === "Approved"
                          ? "bg-[#05A75312] text-primary-color" // Successful style
                          : dataArray?.approved === "Rejected"
                          ? "bg-[#FEF3F2] text-error"
                          : "bg-[#D8E0E5] text-[#585858]" // Inactive or other status style
                      }`}
                    >
                      {dataArray?.isBlocked
                        ? "Blacklisted"
                        : dataArray?.approved}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/**BOTTOM CARD */}
            <div className="card flex flex-col border-[1px] border-[#EFF0F6] shadow-sm rounded-[12px]">
              <div className="border-b-[1px] border-b-[#EFF0F6]">
                <p className="font-semibold text-[16px] text-[#344054]">
                  Course Details
                </p>
              </div>

              <div className="flex mt-[30px] flex-col gap-3">
                <div className="flex p-[3px] gap-[4px]">
                  <p className="font-normal w-[300px] text-[14px] text-[#929292]">
                    Course Title and Categories
                  </p>
                  <p className="text-sm font-medium text-[#1F2A37] text-[14px]">
                    {dataArray?.title} |{" "}
                    {dataArray?.category.map((item) => `${item}, `)}
                  </p>
                </div>
                <div className="flex p-[3px] gap-[4px]">
                  <p className="font-normal w-[300px] text-[14px] text-[#929292]">
                    Course ID
                  </p>
                  <p className="text-sm font-medium text-[#1F2A37] text-[14px]">
                    {dataArray?.slugCode}
                  </p>
                </div>
                <div className="flex p-[3px] gap-[4px]">
                  <p className="font-normal w-[300px] text-[14px] text-[#929292]">
                    Amount
                  </p>
                  <p className="text-sm font-medium text-[#1F2A37] text-[14px]">
                    {dataArray?.price?.toLocaleString()}
                  </p>
                </div>
                <div className="flex p-[3px] gap-[4px]">
                  <p className="font-normal w-[300px] text-[14px] text-[#929292]">
                    Date
                  </p>
                  <p className="text-sm font-medium text-[#1F2A37] text-[14px]">
                    {formattedDate}, {formattedTime}
                  </p>
                </div>
                <div className="flex p-[3px] gap-[4px]">
                  <p className="font-normal w-[300px] text-[14px] text-[#929292]">
                    Status
                  </p>
                  <div
                    className={`py-[5px] px-[10px] rounded-[100px] ${
                      dataArray?.isBlocked === true
                        ? "bg-[#FEF3F2] text-error" // Pending style
                        : dataArray?.approved === "Approved"
                        ? "bg-[#05A75312] text-primary-color" // Successful style
                        : dataArray?.approved === "Rejected"
                        ? "bg-[#FEF3F2] text-error"
                        : "bg-[#D8E0E5] text-[#585858]" // Inactive or other status style
                    }`}
                  >
                    {dataArray?.isBlocked ? "Blacklisted" : dataArray?.approved}
                  </div>
                </div>
              </div>
            </div>

            {/**COURSE LOG */}
            <div className="card mb-[10px] flex flex-col border-[1px] border-[#EFF0F6] shadow-sm rounded-[12px]">
              <div className="border-b-[1px] border-b-[#EFF0F6]">
                <p className="font-semibold text-[16px] text-[#344054]">
                  Course Logs
                </p>
              </div>

              <div className="flex flex-col gap-[120px] max-h-[891px] overflow-y-auto scrollbar-thin">
                <div className="flex items-start gap-[107px] mt-12 ">
                  <div className="flex-1 flex flex-col gap-[71px]">
                    <div className="flex flex-col gap-[10px]">
                      <h2 className="text-[#344054] text-[16px] font-semibold">
                        About this Course
                      </h2>
                      <p className="text-xs font-normal text-[#585858]">
                        {dataArray?.about}
                      </p>
                    </div>

                    <div className="flex flex-col gap-[10px]">
                      <h2 className="text-[#344054] text-[16px] font-semibold">
                        Instructor name
                      </h2>
                      <p className="text-xs font-normal text-[#585858]">
                        {dataArray?.instructorName}
                      </p>
                    </div>

                    <div className="flex flex-col gap-[10px]">
                      <h2 className="text-[#344054] text-[16px] font-semibold">
                        Course title
                      </h2>
                      <p className="text-xs font-normal text-[#585858]">
                        {dataArray?.title}
                      </p>
                    </div>

                    <div className="flex flex-col gap-[10px]">
                      <h2 className="text-[#344054] text-[16px] font-semibold">
                        Course categories
                      </h2>
                      <p className="text-xs font-normal text-[#585858]">
                        {dataArray?.category.map((item) => `${item}, `)}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col gap-[71px]">
                    <div className="flex flex-col gap-[10px]">
                      <h2 className="text-[#344054] text-[16px] font-semibold">
                        Course Syllabus
                      </h2>
                      <div className="text-xs font-normal text-[#585858]">
                        {dataArray?.syllabus?.map((item) => (
                          <div className="flex items-start gap-8 p-[2px]">
                            <p>{item?.period}:</p>
                            <p>{item?.mileStone}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-[10px]">
                      <h2 className="text-[#344054] text-[16px] font-semibold">
                        FAQ
                      </h2>
                      <div className="text-xs font-normal text-[#585858]">
                        {dataArray?.faq?.map((item) => (
                          <div className="flex items-start gap-8 p-[2px]">
                            <p>{item?.question}:</p>
                            <p>{item?.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-[10px]">
                      <h2 className="text-[#344054] text-[16px] font-semibold">
                        Price
                      </h2>
                      <p className="text-xs font-normal text-[#585858]">
                        {dataArray?.priceCurrency} {dataArray?.price}
                      </p>
                    </div>

                    <div className="flex flex-col gap-[10px]">
                      <h2 className="text-[#344054] text-[16px] font-semibold">
                        Cover Image
                      </h2>
                      {/**<p className="text-xs font-normal text-[#585858]"></p> */}
                      <img
                        alt={dataArray?.title}
                        src={dataArray?.coverImage}
                        className="w-[70%] rounded-[10px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className="border-b-[1px] border-b-[#EFF0F6]">
                    <p className="font-semibold text-[16px] text-[#344054]">
                      Course Content
                    </p>
                  </div>

                  <div className="">
                    {isFetchingCourseContent ? (
                      <div className="w-full flex items-center justify-center mt-12 mb-12">
                        <Spinner />
                      </div>
                    ) : courseContentStatus ? (
                      <p className="text-center text-error text-[19px] my-8">{courseContentStatus}</p>
                    ) : (
                      courseContent?.map((item) => (
                        <div className=""></div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/**ACTIONS BTN */}
            {console.log('object', dataArray)}
              {
                dataArray?.approved === "Pending" && (
                  <div className="flex mb-8 items-center justify-center gap-[56px]">
                    <div onClick={() => handleApproveCourse(dataArray?._id)} className="py-[10px] px-[18px] cursor-pointer text-white flex items-center justify-center shadow-sm border-[1px] rounded-[8px] bg-primary-color border-primary-color-2"> { approvingCourse ? 'Approving...' : 'Approve Course' }</div>
                    <div onClick={() => handleRejectCourse(dataArray?._id)} className="py-[10px] px-[18px] cursor-pointer text-white flex items-center justify-center shadow-sm border-[1px] rounded-[8px] bg-error border-error"> { rejectingCourse ? 'Rejecting...' : 'Reject Course' } </div>
                  </div>
                )
              }
              {
                dataArray?.approved === "Approved" && !dataArray?.isBlocked && (
                  <div className="flex mb-8 items-center justify-center gap-[56px]">
                    <div onClick={() => handleRejectCourse(dataArray?._id)} className="py-[10px] px-[18px] cursor-pointer text-white flex items-center justify-center shadow-sm border-[1px] rounded-[8px] bg-error border-error"> { rejectingCourse ? 'Blocking...' : 'Block Course' } </div>
                  </div>
                )
              }
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseInfo;
