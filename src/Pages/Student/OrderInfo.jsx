import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Helpers/Navbar"
import Sidebar from "../../Components/Helpers/Sidebar"
import { IoIosArrowBack } from "react-icons/io";
import { fetchAllOrders, fetchStudentAllOrders } from "../../Helpers/fetch.api";
import { formatDateAndTime } from "../../Helpers/formatDateAndTime";
import Spinner from "../../Components/Helpers/Spinner";
import Button from "../../Components/Helpers/Button";
import { useState } from "react";
import LoadingBtn from "../../Components/Helpers/LoadingBtn";
import { updatePaymentStatus } from "../../Helpers/apis";
import ErrorCard from "../../Components/Helpers/ErrorCard";
import SuccessCard from "../../Components/Helpers/SuccessCard";


function OrderInfo() {
  const navigate = useNavigate();
  const loc = useLocation();
  const pathName = loc.pathname.split("/")[2];
  const { isFetchingOrders, oderData } = fetchAllOrders(pathName)
  const dataArray = oderData?.data

  const { formattedDate, formattedTime } = formatDateAndTime(dataArray?.createdAt)

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const [ updating, setUpdating ] = useState(false)
  const [ errorMsg, setErrorMsg ] = useState()
  const [ successMsg, setSuccessMsg ] = useState() 

  const handleUpdatePaymentStatus = async () => {
    if(updating){
      return
    }
    try {
      setUpdating(true)
      const res = await updatePaymentStatus({ id: dataArray?.orderId })
      if(res.success){
        setSuccessMsg(res?.data)
        setTimeout(() => {
          setSuccessMsg()
        }, 2500)
        window.location.reload()
      } else {
        setErrorMsg(res?.data)
        setTimeout(() => {
          setErrorMsg()
        }, 2500)
      }
    } catch (error) {
      
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="page relative">
      <div className="fixed w-[257px] h-[100vh] left-0 top-0">
        <Sidebar />
      </div>
      {
        errorMsg && (
          <ErrorCard errorMsg={errorMsg} />
        )
      }
      {
        successMsg && (
          <SuccessCard successMsg={successMsg}  />
        )
      }

      <div className="section ml-auto">
        <Navbar />

        {
          isFetchingOrders ? (
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
                            {dataArray?.courseTitle}
                          </h2>
                          <p className="text-xs font-normal text-[12px] text-[#929292]">
                            {dataArray?.orderId}
                          </p>
                        </div>
                      </div>

                      <div
                            className={`py-[5px] px-[10px] rounded-[100px] ${
                              dataArray?.orderStatus === 'Pending' || dataArray?.orderStatus === 'Initiated'
                                ? "bg-[#D8E0E5] text-[#585858]" // Pending style
                                : dataArray?.orderStatus === 'Successful'
                                ? "bg-[#05A75312] text-primary-color" // Successful style
                                : "bg-[#FEF3F2] text-error" // Inactive or other status style
                            }`}
                        >
                            {dataArray?.orderStatus}
                        </div>

                    </div>
                  </div>
                </div>
                
                <div className="">
                  {
                    updating ? (
                      <LoadingBtn />
                    ) : (
                      <Button onCLick={handleUpdatePaymentStatus} text={dataArray?.paid ? `Reject Payment` :  `Approve Payment`} style={dataArray?.paid ? `` : `!bg-error !border-error` } />
                    )
                  }
                </div>

              </div>



              {/**BOTTOM CARD */}
              <div className="card flex flex-col border-[1px] border-[#EFF0F6] shadow-sm rounded-[12px]">
                <div className="border-b-[1px] border-b-[#EFF0F6]">
                  <p className="font-semibold text-[16px] text-[#344054]">Order Details</p>
                </div>

                <div className="flex mt-[30px] flex-col gap-3">
                <div className="flex p-[3px] gap-[4px]" >
                      <p className="font-normal w-[300px] text-[14px] text-[#929292]">Order ID</p>
                      <p className="text-sm font-medium text-[#13693B] text-[14px]">{dataArray?.orderId}</p>
                  </div>
                  <div className="flex p-[3px] gap-[4px]" >
                      <p className="font-normal w-[300px] text-[14px] text-[#929292]">Order payment Refrence</p>
                      <p className="text-sm font-medium text-[#13693B] text-[14px]">{dataArray?.paymentRefrence}</p>
                  </div>
                  <div className="flex p-[3px] gap-[4px]" >
                      <p className="font-normal w-[300px] text-[14px] text-[#929292]">Amount</p>
                      <p className="text-sm font-medium text-[#1F2A37] text-[14px] flex items-center gap-1">{dataArray?.currency}
                      { 
                        dataArray?.discount ? (
                          <span className="flex items-center gap-[2px]">
                            <p>
                              {dataArray?.payableAmount?.toLocaleString()}
                            </p>
                            <p className="line-through font-semibold">
                              {dataArray?.amount?.toLocaleString()}
                            </p>
                            <p className="text-[#13693B]">
                              (Discount Percentage: {dataArray?.discountOff}%)
                            </p>
                          </span>
                        ) : (
                          <p>
                            {dataArray?.amount?.toLocaleString()}
                          </p>
                        )
                      }
                      </p>
                  </div>
                  <div className="flex p-[3px] gap-[4px]" >
                      <p className="font-normal w-[300px] text-[14px] text-[#929292]">Date</p>
                      <p className="text-sm font-medium text-[#1F2A37] text-[14px]">{formattedDate}</p>
                  </div>
                  <div className="flex p-[3px] gap-[4px]" >
                      <p className="font-normal w-[300px] text-[14px] text-[#929292]">No of Course</p>
                      <p className="text-sm font-medium text-[#1F2A37] text-[14px]">{`1`}</p>
                  </div>
                  <div className="flex p-[3px] gap-[4px]" >
                      <p className="font-normal w-[300px] text-[14px] text-[#929292]">Status</p>
                      <p className="text-sm font-medium text-[#1F2A37] text-[14px]">{dataArray?.orderStatus}</p>
                  </div>
                </div>
              </div>

              {/**COURSE DISPLAY */}
              <div className="card mb-[6rem] flex flex-col border-[1px] border-[#EFF0F6] shadow-sm rounded-[12px]">
                <div className="border-b-[1px] border-b-[#EFF0F6]">
                  <p className="font-semibold text-[16px] text-[#344054]">Course List</p>
                </div>

                <div className="mt-[30px] flex items-center py-4 gap-8">
                    <div className="w-[124px] flex flex-col">
                      <img src={dataArray?.courseImg} alt={dataArray?.courseTitle} className="w-[full]" />
                      <h2 className="text-[14px] font-semibold text-[#364152]">{dataArray?.courseTitle}</h2>
                      <p className="text-[10px] font-semibold text-[#364152]">{dataArray?.instructorName}</p>
                    </div>
                </div>

                <div className="border-t-[1px] border-t-[#EFF0F6] pt-3">
                  <p className="font-normal w-[300px] text-[14px] text-[#929292]">Total Amount: <span className="font-semibold text-[16px] text-[#344054]">{dataArray?.currency} {dataArray?.amount?.toLocaleString()}</span></p>
                </div>

              </div>
              

            </div>
          )
        }
      </div>
    </div>
  )
}

export default OrderInfo
