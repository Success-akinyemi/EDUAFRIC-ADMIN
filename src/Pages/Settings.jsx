import Navbar from "../Components/Helpers/Navbar"
import Sidebar from "../Components/Helpers/Sidebar"
import Countries from "../Components/SettingsUi/Countries"
import SiteSettings from "../Components/SettingsUi/SiteSettings"
import { useState } from "react"

function Settings({ setSelectedCard, setCountryId }) {
    const options = [
        {
            name: 'Site Settings',
            slug: 'sitesettings'
        },
        {
            name: 'Countries',
            slug: 'countries'
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
        
                <div className="w-[97%] flex flex-col gap-[30px] m-auto mt-4 tablet:w-full">
                  <h2 className="text-off-black text-[30px] font-semibold" >Settings</h2>
    
                  <div className="w-full flex items-center gap-4 border-b-[1px] border-b-[#D9DBE9]">
                    {
                      options?.map((item, idx) => (
                        <div key={idx} onClick={() => handleToggle(item?.slug)} className={`flex min-w-[103px] flex-col pt-[1px] pb-[11px] py-[4px] cursor-pointer border-b-[2px] items-center justify-center ${item?.slug === cardState ? 'text-primary-color border-b-primary-color' : 'text-[#364152] border-b-transparent' }`}>
                          {item?.name}
                        </div>
                      ))
                    }
                  </div>
    
                    {
                        cardState === 'sitesettings' && (
                          <SiteSettings />
                        )
                      }
                    {
                        cardState === 'countries' && (
                            <Countries setCountryId={setCountryId} setSelectedCard={setSelectedCard} />
                        )
                    }
    
                </div>
        
        
              </div>
        
            </div>
          )
}

export default Settings
