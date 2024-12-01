import { Link, useLocation } from "react-router-dom";
import { fetchStaffs } from "../../Helpers/fetch.api";
import Sidebar from "../../Components/Helpers/Sidebar";
import Navbar from "../../Components/Helpers/Navbar";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useState } from "react";
import Spinner from "../../Components/Helpers/Spinner";
import toast from "react-hot-toast";
import { blockAccount, unBlockAccount } from "../../Helpers/apis";
import StaffDetails from "../../Components/StaffUi/StaffDetails";

function StaffInfo({setSelectedCard, setAdminStaffId}) {
  const loc = useLocation();
  const pathName = loc.pathname.split("/")[2];
  const { isFetchingStaffsData, staffsData } = fetchStaffs(pathName);
  const studentData = staffsData?.data;

  console.log('staff data',studentData)

  const [ Blacklisting, setBlacklisting ] = useState(false)
  
  const handleBlacklsitAdmin = async () => {
    try {
      setBlacklisting(true)
      const res = await blockAccount({ _id: pathName })
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

  const handleUnBlacklsitAdmin = async () => {
    try {
      setBlacklisting(true)
      const res = await unBlockAccount({ _id: pathName })
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

  const handleApproveAccount = () => {
    setAdminStaffId(pathName)
    setSelectedCard('approveAdmin')
  }

  const options = [
    {
        name: 'Staff Info',
        slug: 'stinfo'
    },
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
              <Link to={`/staffs`} className="">
                <IoIosArrowBack />
              </Link>

              <div className="">
                <div className="flex items-center gap-[6px]">
                  <div className="flex items-center gap-4">
                    {studentData?.profileImg ? (
                      <img
                        src={studentData?.profileImg}
                        alt={`${studentData?.firstName}'s profile`}
                        className="w-[45px] h-[45px] rounded-full"
                      />
                    ) : (
                      <div
                        className={`w-[45px] h-[45px] rounded-full flex items-center justify-center text-gray-800 font-bold ${
                          studentData?.blocked === true
                          ? "bg-[#FEF3F2] text-error"// Pending style
                          : studentData?.approved === true
                          ? "bg-[#05A75312] text-primary-color" // Successful style
                          : studentData?.approved === false
                          ? "bg-[#D8E0E5] text-[#585858]"
                          : "bg-[#FEF3F2] text-error" // Inactive or other status style
                        }`}
                      >
                        {studentData?.firstName.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div className="flex  flex-col">
                      <h2 className="text-lg text-[#14142B] font-semibold">
                        {studentData?.firstName}
                      </h2>
                      <p className="text-xs font-normal text-[12px] text-[#929292]">
                        {studentData?.email}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`py-[5px] px-[10px] rounded-[100px] ${
                      studentData?.blocked === true
                      ? "bg-[#FEF3F2] text-error"// Pending style
                      : studentData?.approved === true
                      ? "bg-[#05A75312] text-primary-color" // Successful style
                      : studentData?.approved === false
                      ? "bg-[#D8E0E5] text-[#585858]"
                      : "bg-[#FEF3F2] text-error" // Inactive or other status style
                    }`}
                  >
                  {studentData?.approved ? 'Active' : !studentData?.approved ? 'Pending' : studentData?.blocked ? 'Blocked' : '' }
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 ">
              <div
                onClick={studentData?.blocked ? handleUnBlacklsitAdmin : handleBlacklsitAdmin}
                className="cursor-pointer px-2 rounded-[8px] bg-[#D92D20] text-white flex items-center gap-[4px]"
              >
                  <MdOutlineDeleteOutline />
                  { studentData?.blocked ? 'Account BLocked' : Blacklisting ? 'Blacklisting...' : 'Blacklist'}
              </div>
              {
                !studentData?.approved && (
                  <div
                  onClick={handleApproveAccount}
                  className="cursor-pointer px-2 py-[2px] rounded-[8px] bg-primary-color text-white flex items-center gap-[4px]"
                >
                    <MdOutlineDeleteOutline />
                    Approve Account
                </div>
                )
              }

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
            isFetchingStaffsData ? (
              <div className="w-full flex items-center justify-center mt-12 mb-12">
              <Spinner />
            </div>
            ) : (
              <>
                {
                  cardState === 'stinfo' && (
                    <StaffDetails data={studentData} />
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

export default StaffInfo;
