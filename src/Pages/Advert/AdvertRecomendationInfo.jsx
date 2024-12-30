import { Link, useLocation } from "react-router-dom"
import Button from "../../Components/Helpers/Button"
import Navbar from "../../Components/Helpers/Navbar"
import Sidebar from "../../Components/Helpers/Sidebar"
import { fetchAllAdvert } from "../../Helpers/fetch.api"
import Spinner from "../../Components/Helpers/Spinner"


function AdvertRecomendationInfo() {
  const loc = useLocation()
  const pathName = loc.pathname.split('/')[2]
  const { advertData, isFetchingAdvert } = fetchAllAdvert({ id: pathName })
  const data = advertData?.data
  


    return (
        <div className="page relative">
          <div className="fixed w-[257px] h-[100vh] left-0 top-0">
            <Sidebar />
          </div>
    
          <div className="section ml-auto">
            <Navbar />

            {
              isFetchingAdvert ? (
                <div className="">
                  <Spinner />
                </div>
              ) : (
                <div className="w-[97%] m-auto mt-4 tablet:w-full flex flex-col gap-[30px]">

                  {/**TOP */}
                  <div className="min-h-[89px] rounded-[12px] border-[1px] bg-white border-white shadow-sm p-5 flex items-center justify-between">

                    <div className="flex items-center gap-4">
                      <Link to={`/advert`} >
                        <span className="icon">
                          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </span>
                      </Link>

                      <img src={data?.image} alt={data?.name} className="w-[60px] border-[1px] rounded-[4px] border-[#D0D5DD]" />

                      <div className="flex flex-col gap-[2px]">
                        <h3 className="text-[#14142B] text-lg font-semibold"></h3>
                        <p className="text-xs font-normal text-[#929292]"></p>
                      </div>

                      {/**Active status basd on date */}
                      <div className={`py-[5px] px-[10px] rounded-[100px]`}>

                      </div>
                    </div>

                    <div className="flex items-center gap-[13.7px]">
                      <div className="flex items-center gap-2 py-[10px] px-[18px] border-[1px] border-[#D0D5DD] rounded-[8px] text-[16px] font-medium text-[#585858]">
                          <span className="icon">
                              <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 18.1409 18.8867 17.8 19.485C17.4999 20.0118 17.0472 20.4353 16.5017 20.6997C15.882 21 15.0911 21 13.5093 21H10.4907C8.90891 21 8.11803 21 7.49834 20.6997C6.95276 20.4353 6.50009 20.0118 6.19998 19.485C5.85911 18.8867 5.8065 18.0975 5.70129 16.5193L5 6M10 10.5V15.5M14 10.5V15.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                          </span>
                          Delete
                      </div>
                      <Button text={`Add Banner`} />
                    </div>

                  </div>

                  {/**BOTTOM */}
                  <div className="card !border-[#EFF0F6] !p-[0px]">
                    <div className="min-h-[55px] p-5 flex items-center border-b-[1px] border-b-[#EFF0F6]">
                        <h3 className="text-[16px] text-[#344054] font-semibold">Banner Info</h3>
                    </div>

                    <div className="flex flex-col mt-6 gap-2 p-5">
                      <div className="flex items-center min-h-[32px]">
                        <p className="min-w-[200px] min-h-[20px] text-[#929292] text-sm font-medium">Name</p>
                        <p className="text-sm font-medium text-[#1F2A37]">{data?.name}</p>
                      </div>
                      <div className="flex items-center min-h-[32px]">
                        <p className="min-w-[200px] min-h-[20px] text-[#929292] text-sm font-medium">Type</p>
                        <p className="text-sm font-medium text-[#1F2A37]">{data?.type}</p>
                      </div>
                      <div className="flex items-center min-h-[32px]">
                        <p className="min-w-[200px] min-h-[20px] text-[#929292] text-sm font-medium">Destination</p>
                        <p className="text-sm font-medium text-[#1F2A37]">{data?.destination}</p>
                      </div>
                      <div className="flex items-center min-h-[32px]">
                        <p className="min-w-[200px] min-h-[20px] text-[#929292] text-sm font-medium">Organization Url</p>
                        <p className="text-sm font-medium text-[#1F2A37]">{data?.organizationUrl}</p>
                      </div>
                      <div className="flex items-center min-h-[32px]">
                        <p className="min-w-[200px] min-h-[20px] text-[#929292] text-sm font-medium">Start Date</p>
                        <p className="text-sm font-medium text-[#1F2A37]">{data?.startDate}</p>
                      </div>
                      <div className="flex items-center min-h-[32px]">
                        <p className="min-w-[200px] min-h-[20px] text-[#929292] text-sm font-medium">End Date</p>
                        <p className="text-sm font-medium text-[#1F2A37]">{data?.endDate}</p>
                      </div>
                    </div>
                  </div>

                </div>
              )
            }
    
    
          </div>
    
        </div>
      )
}

export default AdvertRecomendationInfo
