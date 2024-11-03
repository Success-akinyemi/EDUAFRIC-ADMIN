import { Link, useLocation, useNavigate } from "react-router-dom"
import { menuLinks } from "../../Data/menuLinks.jsx"
import Logo from "./Logo"
import { LuLogOut } from "react-icons/lu";
import { useState } from "react";
import { useDispatch } from "react-redux";

function Sidebar() {
  const dispatch = useDispatch()
  const location = useLocation();
  const navigate = useNavigate()
  const [ isLoading, setIsLoading ] = useState(false)
  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleSignout = async () => {
    if(isLoading){
        return
    }
    try {
        setIsLoading(true)
        //const res = await signoutUser()

        navigate('/')
    } catch (error) {
        
    } finally {
        setIsLoading(false)
    }
}

  return (
    <div className="w-[257px] h-[100vh] overflow-hidden flex flex-col bg-white">
      <div className="mb-12 mt-4 flex items-center justify-center">
        <Logo imgStyle={`w-[50px]`} textStyle={`text-[30px] text-primary-color`} />
      </div>

      <div className="h-fit mb-12 overflow-y-auto items-start flex flex-col gap-5 p-2 scrollbar-thin">
        {
          menuLinks.map((item, idx) => {
            const Icon = item.icon
            return (
              <Link key={idx} to={`${item.link}`} className={`link flex  py-[10px] px-[18px] gap-[17px] text-[16px] font-medium w-full rounded-[8px] ${isActive(`${item.link}`) ? 'bg-primary-color text-white' : 'text-gray-700'}`}>
                <Icon className="text-[24px]"/>
                {item.name}
              </Link>
            )
          })
        }

      </div>

      <div onClick={handleSignout} className="mt-auto flex items-center gap-[21px] justify-center h-[86px] border-t-[1px] border-t-[#D9DBE9] text-[16px] hover:text-error cursor-pointer">
        <LuLogOut className="text-[24px]" />
        Logout
      </div>
    </div>
  )
}

export default Sidebar
