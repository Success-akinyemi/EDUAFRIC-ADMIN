import { useState } from "react"
import Navbar from "../Components/Helpers/Navbar"
import Sidebar from "../Components/Helpers/Sidebar"
import Banner from "../Components/AdvertUi/Banner"
import Recommendations from "../Components/AdvertUi/Recommendations"


function Advert() {
  const [timeDate, setTimeDate] = useState();
  const data = []
  const options = [
    {
        name: 'Banners',
        slug: 'banners'
    },
    {
        name: 'Recommendations',
        slug: 'recommendations'
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
              <h2 className="text-off-black text-[30px] font-semibold" >Advert</h2>
              

              <div className="w-full  flex items-center gap-4 border-b-[1px] border-b-[#D9DBE9]">
                {
                  options?.map((item, idx) => (
                    <div key={idx} onClick={() => handleToggle(item?.slug)} className={`flex flex-col pt-[1px] pb-[11px] py-[4px] cursor-pointer border-b-[2px] min-w-[103px] items-center justify-center ${item?.slug === cardState ? 'text-primary-color border-b-primary-color' : 'text-[#364152] border-b-transparent' }`}>
                      {item?.name}
                    </div>
                  ))
                }
              </div>

              {
                    cardState === 'banner' && (
                      <Banner data={data} loading={isFetchingAdvert} timeDate={timeDate} setTimeDate={setTimeDate} />
                    )
                  }
                  {
                    cardState === 'recommendations' && (
                      <Recommendations />
                    )
                  }

            </div>
    
    
          </div>
    
        </div>
      )
}

export default Advert
