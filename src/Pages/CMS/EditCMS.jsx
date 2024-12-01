import Sidebar from '../../Components/Helpers/Sidebar'
import Navbar from '../../Components/Helpers/Navbar'
import { useEffect, useState } from 'react'
import Draft from '../../Components/CMS/Draft'
import Published from '../../Components/CMS/Published'
import Scheduled from '../../Components/CMS/Scheduled'
import { fetchCms } from '../../Helpers/fetch.api'
import AddContent from '../../Components/CMS/NewCms/AddContent'
import EditContent from '../../Components/CMS/EditCms/EditContent'
import { useLocation } from 'react-router-dom'
import Spinner from '../../Components/Helpers/Spinner'

function EditCMS() {
    const loc = useLocation()
    const pathName = loc.pathname.split('/')[2]
  const { cmsData, isFetchingCmsData } = fetchCms(pathName)
  const data = cmsData?.data;
  console.log('cms dara', data)

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
  const [ cardState, setCardState ] = useState(data?.status)
  useEffect(() => {
    if(data?.status){
        setCardState(data?.status)
    }
  }, [data?.status])
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
              <h2 className="text-off-black text-[30px] font-semibold" >CMS</h2>
    

              {
                isFetchingCmsData ? (
                    <div className="flex items-center justify-center">
                        <Spinner />
                    </div>
                ) : (
                    <>
                        <div className="w-full flex items-center gap-4 border-b-[1px] border-b-[#D9DBE9]">
                            {
                            options?.map((item, idx) => (
                                <div key={idx} className={`flex min-w-[103px] items-center justify-center flex-col pt-[1px] pb-[11px] py-[4px] cursor-pointer border-b-[2px] ${item?.slug === cardState ? 'text-primary-color border-b-primary-color' : 'text-[#364152]' }`}>
                                {item?.name}
                                </div>
                            ))
                            }
                        </div>
                    
                        <EditContent data={data} />
                    </>
                )
              }

            </div>

    
    
          </div>
    
        </div>
      )
}

export default EditCMS
