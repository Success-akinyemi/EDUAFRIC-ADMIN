import Sidebar from '../../Components/Helpers/Sidebar'
import Navbar from '../../Components/Helpers/Navbar'
import { useState } from 'react'
import Draft from '../../Components/CMS/Draft'
import Published from '../../Components/CMS/Published'
import Scheduled from '../../Components/CMS/Scheduled'
import { fetchCms } from '../../Helpers/fetch.api'
import AddContent from '../../Components/CMS/NewCms/AddContent'

function CMS({ setCmsId, setSelectedCard }) {
  const { cmsData, isFetchingCmsData } = fetchCms()
  const data = cmsData?.data;

  const options = [
    {
        name: 'Draft',
        slug: 'Draft'
    },
    {
        name: 'Scheduled',
        slug: 'Scheduled'
    },
    {
      name: 'Published',
      slug: 'Published'
    }
  ]
  const [ cardState, setCardState ] = useState(options[0]?.slug)

  const handleToggle = (value) => {
    setCardState(value)
  }

  const sortedData = data?.filter((dataItem) => dataItem.status === cardState);
  //console.log('object90', sortedData)


    return (
        <div className="page relative">
          <div className="fixed w-[257px] h-[100vh] left-0 top-0">
            <Sidebar />
          </div>
    
          <div className="section ml-auto">
            <Navbar />
    
            <div className="w-[97%] m-auto mt-4 tablet:w-full flex flex-col gap-[30px]">
              <h2 className="text-off-black text-[30px] font-semibold" >CMS</h2>
    
              <div className="w-full flex items-center gap-4 border-b-[1px] border-b-[#D9DBE9]">
                {
                  options?.map((item, idx) => (
                    <div key={idx} onClick={() => handleToggle(item?.slug)} className={`flex min-w-[103px] items-center justify-center flex-col pt-[1px] pb-[11px] py-[4px] cursor-pointer border-b-[2px] ${item?.slug === cardState ? 'text-primary-color border-b-primary-color' : 'text-[#364152] border-b-transparent' }`}>
                      {item?.name}
                    </div>
                  ))
                }
              </div>

                {
                  cardState === 'Draft' && (
                    <Draft setSelectedCard={setSelectedCard} setCmsId={setCmsId} data={sortedData} loading={isFetchingCmsData} setCardState={setCardState} />
                  )
                }
                {
                  cardState === 'Scheduled' && (
                    <Scheduled setSelectedCard={setSelectedCard} setCmsId={setCmsId} data={sortedData} loading={isFetchingCmsData} setCardState={setCardState} />
                  )
                }
                {
                  cardState === 'Published' && (
                    <Published setSelectedCard={setSelectedCard} setCmsId={setCmsId} data={sortedData} loading={isFetchingCmsData} setCardState={setCardState} />
                  )
                }
                {
                  cardState === 'addContent' && (
                    <AddContent />
                  )
                }


            </div>

    
    
          </div>
    
        </div>
      )
}

export default CMS
