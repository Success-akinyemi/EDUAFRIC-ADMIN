import { GrLineChart } from "react-icons/gr";
import { GoPeople } from "react-icons/go";
import { BsPersonVideo } from "react-icons/bs";
import { BsBank2 } from "react-icons/bs";
import { GoBook } from "react-icons/go";
import { MdOutlineMessage } from "react-icons/md";
import { RiMailOpenLine } from "react-icons/ri";
import { LuTv } from "react-icons/lu";
import { MdOutlineSettings } from "react-icons/md";

export const menuLinks = [
    {
        name: 'Dashboard',
        link: '/dashboard',
        icon: GrLineChart
    },
    {
        name: 'Students',
        link: '/students',
        icon: GoPeople
    },
    {
        name: 'Instructors',
        link: '/instructors',
        icon: BsPersonVideo
    },
    {
        name: 'Organizations',
        link: '/Organizations',
        icon: BsBank2
    },
    {
        name: 'Course',
        link: '/course',
        icon: GoBook
    },
    {
        name: 'Messages',
        link: '/messages',
        icon: MdOutlineMessage
    },
    {
        name: 'CMS',
        link: '/cms',
        icon: RiMailOpenLine
    },
    {
        name: 'Advert',
        link: '/advert',
        icon: LuTv
    },
    {
        name: 'Settings',
        link: '/settings',
        icon: MdOutlineSettings
    }
]