import { useState } from "react"
import Navbar from "../Components/Helpers/Navbar"
import Sidebar from "../Components/Helpers/Sidebar"
import MyDetails from "../Components/ProfileUi/MyDetails"
import Password from "../Components/ProfileUi/Password"

function Profile() {
  const options = [
    {
        name: 'My Details',
        slug: 'mydetails'
    },
    {
        name: 'Password',
        slug: 'password'
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
    
            <div className="w-[97%] flex flex-col gap-[30px] m-auto mt-4 tablet:w-full">
              <h2 className="text-off-black text-[30px] font-semibold" >Profile</h2>

              <div className="w-full flex items-center gap-4 border-b-[1px] border-b-[#D9DBE9]">
                {
                  options?.map((item, idx) => (
                    <div key={idx} onClick={() => handleToggle(item?.slug)} className={`flex flex-col pt-[1px] pb-[11px] py-[4px] cursor-pointer border-b-[2px] min-w-[99px] items-center justify-center ${item?.slug === cardState ? 'text-primary-color border-b-primary-color' : 'text-[#364152]' }`}>
                      {item?.name}
                    </div>
                  ))
                }
              </div>

              {
                    cardState === 'mydetails' && (
                      <MyDetails />
                    )
                  }
                  {
                    cardState === 'password' && (
                      <Password />
                    )
                  }

            </div>
    
    
          </div>
    
        </div>
      )
}

export default Profile
