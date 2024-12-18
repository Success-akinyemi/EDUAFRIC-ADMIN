import { Link, useLocation, useNavigate } from "react-router-dom";
import { menuLinks } from "../../Data/menuLinks.jsx";
import Logo from "./Logo";
import { LuLogOut } from "react-icons/lu";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signout } from "../../Helpers/apis.js";
import toast from "react-hot-toast";
import { signOut } from "../../Redux/User/adminSlice.js";

function Sidebar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleSignout = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const res = await signout();
      if (res.success) {
        toast.success(res.data);
        dispatch(signOut());
        navigate("/");
      } else {
        toast.error(res.data || "Failed to sign out");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[257px] h-[100vh] overflow-hidden flex flex-col bg-white">
      <div className="mb-12 mt-4 flex items-center justify-center">
        <Logo
          imgStyle={`w-[50px]`}
          textStyle={`text-[30px] text-primary-color`}
        />
      </div>

      <div className="h-fit mb-12 overflow-y-auto flex flex-col gap-5 p-2 scrollbar-thin">
        {menuLinks.map((item, idx) => (
          <Link
            key={idx}
            to={`${item.link}`}
            className={`link flex py-[10px] px-[18px] gap-[17px] text-[16px] font-medium w-full rounded-[8px] ${
              isActive(`${item.link}`)
                ? "bg-primary-color text-white"
                : "text-gray-700"
            }`}
          >
            {isActive(`${item.link}`) ? 
              <span>{item?.activeIcon}</span> :
              <span>{item?.icon}</span>
            }
            {item.name}
          </Link>
        ))}
      </div>

      <div
        onClick={handleSignout}
        className="mt-auto flex items-center gap-[21px] px-[18px] h-[86px] border-t-[1px] border-t-[#D9DBE9] text-[16px] hover:text-error cursor-pointer"
      >
        <span className="flex items-center justify-center w-5 h-5">
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 17L21 12M21 12L16 7M21 12H9M9 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        {isLoading ? "Logging out..." : "Logout"}
      </div>
    </div>
  );
}

export default Sidebar;
