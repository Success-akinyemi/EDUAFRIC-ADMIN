import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import ProfileImg from '../../assets/images/profile.png'

function Navbar() {
  return (
    <div className="h-[60px] py-1 w-full flex bg-white border-b-[1px] border-b-[#D9DBE9]">
      
      <div className="ml-auto flex items-center gap-2">
        <img src={ProfileImg} alt="profile" className="w-[34px] h-[34px] rounded-full" />

        <div className="flex flex-col gap-1">
            <p className="text-[12px] font-medium text-primary-color">Staff</p>
            <span className="text-text-color-3 flex items-center gap-[3px]">
                <p className="text-[14px] font-normal">Lateef Akinyemi</p>
                <MdOutlineKeyboardArrowDown className="text-[16px]" />
            </span>
        </div>

        <span className="h-[80%] w-[3px] bg-[#D9DBE9]"></span>

        <div className="cursor-pointer text-[#697586]">
            <FaRegBell className="text-[20px]" />
        </div>

      </div>
    </div>
  )
}

export default Navbar
