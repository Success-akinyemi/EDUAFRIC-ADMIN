import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import ProfileImg from '../../assets/images/profile.png';
import { useState } from "react";
import { Link } from "react-router-dom";
import { notifications } from "../../Data/notifications";
import { formatDistanceToNow, parseISO } from "date-fns"; // Import necessary functions
import { useSelector } from "react-redux";

function Navbar() {
    const { currentAdmin } = useSelector((state) => state.admin);
    const admin = currentAdmin?.data

    const [isHovered, setIsHovered] = useState(false);
    const topNotification = notifications;
    const notificationData = topNotification.splice(0, 5);


    return (
        <div className="relative h-[60px] py-1 px-4 w-full flex bg-white border-b-[1px] border-b-[#D9DBE9]">
            <div className="ml-auto flex items-center gap-2">
                <img src={ProfileImg} alt="profile" className="w-[34px] h-[34px] rounded-full" />

                <div className="flex flex-col gap-1">
                    <p className="text-[12px] font-medium text-primary-color">{admin?.role}</p>
                    <span className="text-text-color-3 flex items-center gap-[3px]">
                        <p className="text-[14px] font-normal">{admin?.firstName} {admin?.lastName}</p>
                        <MdOutlineKeyboardArrowDown className="text-[16px]" />
                    </span>
                </div>

                <span className="h-[80%] w-[3px] bg-[#D9DBE9]"></span>

                <div 
                    className="relative cursor-pointer text-[#697586]"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <FaRegBell className="text-[20px]" />
                    
                    {isHovered && (
                        <div className="card absolute z-50 right-3 top-3 flex flex-col gap-6">
                            <div className="w-[412px]">
                                <h2 className="text-off-black text-[18px] font-semibold">
                                    Notifications
                                </h2>

                                <div className="w-full mt-4 flex flex-col gap-5">
                                    {notificationData.map((item, idx) => (
                                        <div key={idx} className="w-full pb-3 border-b-[1px] flex flex-col gap-2">
                                            <p className="text-[14px] font-normal text-[#121212]">{item?.notification}</p>
                                            <span className="text-[#878C96]">
                                                {formatDistanceToNow(parseISO(item?.createdAt), { addSuffix: true })}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Link to={'/all-notifications'} className="text-primary-color text-[14px] font-semibold">View more notifications</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
