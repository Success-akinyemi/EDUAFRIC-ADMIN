import { Link, useLocation } from "react-router-dom";
import { fetchAllInstructors } from "../../Helpers/fetch.api";
import Sidebar from "../../Components/Helpers/Sidebar";
import Navbar from "../../Components/Helpers/Navbar";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useState } from "react";
import Spinner from "../../Components/Helpers/Spinner";
import toast from "react-hot-toast";
import { blackListInstructor } from "../../Helpers/apis";
import InstructorInfo from "../../Components/InstructorsUi/InstructorInfo";
import CourseList from "../../Components/InstructorsUi/CourseList";

function InstructorDetails() {
  const loc = useLocation();
  const pathName = loc.pathname.split("/")[2];
  const { isFetchingInstructor, instructorsData: data } = fetchAllInstructors(pathName);
  const instructorData = data?.data;

  const [ Blacklisting, setBlacklisting ] = useState(false)
  
  const handleBlacklsitInstructor = async () => {
    try {
      setBlacklisting(true)
      const res = await blackListInstructor({ id: pathName })
      if(res.success){
        toast.success(res.data)
        window.location.reload()
      } else {
        toast.error(res.data)
      }
    } catch {

    } finally {
      setBlacklisting(false)
    }
  };

  const options = [
    {
        name: 'Instructors Info',
        slug: 'stinfo'
    },
    {
        name: 'Course List',
        slug: 'ordlist'
    }
  ]
  const [ cardState, setCardState ] = useState(options[0]?.slug)

  const handleToggle = (value) => {
    setCardState(value)
  }
  return (
    <div className="page relative">
      <div className="fixed w-[257px] h-[100vh] left-0 top-0">
        <Sidebar />
      </div>

      <div className="section ml-auto">
        <Navbar />

        <div className="w-[97%] m-auto mt-4 tablet:w-full flex flex-col gap-[30px]">
          {/**TOP CARD*/}
          <div className="card flex flex-row justify-between">
            <div className="flex items-center gap-[50px]">
              <Link to={`/students`} className="">
                <IoIosArrowBack />
              </Link>

              <div className="">
                <div className="flex items-center gap-[6px]">
                  <div className="flex items-center gap-4">
                    {instructorData?.profileImg ? (
                      <img
                        src={instructorData?.profileImg}
                        alt={`${instructorData?.name}'s profile`}
                        className="w-[45px] h-[45px] rounded-full"
                      />
                    ) : (
                      <div
                        className={`w-[45px] h-[45px] rounded-full flex items-center justify-center text-gray-800 font-bold ${
                          instructorData?.blocked
                            ? "bg-[#D8E0E5] text-[#585858]" // Blacklisted style
                            : instructorData?.verified
                            ? "bg-[#05A75312] text-primary-color" // Active style
                            : "bg-[#FEF3F2] text-error" // Inactive style
                        }`}
                      >
                        {instructorData?.name.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div className="flex  flex-col">
                      <h2 className="text-lg text-[#14142B] font-semibold">
                        {instructorData?.name}
                      </h2>
                      <p className="text-xs font-normal text-[12px] text-[#929292]">
                        {instructorData?.email}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`py-[5px] px-[10px] rounded-[100px] ${
                      instructorData?.blocked
                        ? "bg-[#D8E0E5] text-[#585858]" // Blacklisted style
                        : instructorData?.verified
                        ? "bg-[#05A75312] text-primary-color" // Active style
                        : "bg-[#FEF3F2] text-error" // Inactive style
                    }`}
                  >
                    {instructorData?.blocked
                      ? "Blacklisted"
                      : instructorData?.verified
                      ? "Active"
                      : "Inactive"}
                  </div>
                </div>
              </div>
            </div>

            <div
              onClick={handleBlacklsitInstructor}
              className="cursor-pointer py-[2px] px-[6px] rounded-[8px] bg-[#D92D20] text-white flex items-center gap-[4px]"
            >
                <MdOutlineDeleteOutline />
                { instructorData?.blocked ? 'Account BLocked' : Blacklisting ? 'Blacklisting...' : 'Blacklist'}
            </div>
          </div>

          <div className="w-full flex items-center gap-4 border-b-[1px] border-b-[#D9DBE9]">
              {
                options?.map((item, idx) => (
                  <div key={idx} onClick={() => handleToggle(item?.slug)} className={`flex flex-col pt-[1px] pb-[11px] py-[4px] cursor-pointer border-b-[2px] ${item?.slug === cardState ? 'text-primary-color border-b-primary-color' : 'text-[#364152]' }`}>
                    {item?.name}
                  </div>
                ))
              }
          </div>

          {/**BOTTOM CARD */}
          {
            isFetchingInstructor ? (
              <div className="w-full flex items-center justify-center mt-12 mb-12">
              <Spinner />
            </div>
            ) : (
              <>
                {
                  cardState === 'stinfo' && (
                    <InstructorInfo data={instructorData} />
                  )
                }
                {
                  cardState === 'ordlist' && (
                    <CourseList id={pathName} />
                  )
                }
              </>
            )
          }
          

        </div>
      </div>
    </div>
  );
}

export default InstructorDetails;
