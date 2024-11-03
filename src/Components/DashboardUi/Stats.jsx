import { MdOutlineFilterList } from "react-icons/md";
import { stats } from "../../Data/stats";
import { FaArrowUp } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";

function Stats() {
    const statsData = stats

  return (
    <div className="flex flex-col gap-6 text-gray-700">
      <div className="gap-3 flex items-center ml-auto">
        <div className="card py-2 px-3">
            <p className="flex items-center gap-[2px]"><CiCalendar className="text-[20px]" /> Jan 6, 2022 – Jan 13, 2022</p>
        </div>

        <div className="card py-2 px-3 flex items-center gap-[3px]">
         <MdOutlineFilterList className="text-[18px]" />
         Filters
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
            {statsData?.map((item) => (
                <div key={item.slug} className="card flex flex-col gap-1">
                    <p className="text-[14px] font-medium text-gray-500">{item.title}</p>

                    <div className="flex items-center justify-between">
                        <h2 className="text-[30px] font-semibold text-gray-900">{item.total}</h2>

                        <span className={`rounded-[16px] text-[14px] font-medium py-[2px] px-[9px] flex items-center justify-center ${item?.slug === 'positive' ? 'bg-success-50 text-primary-color' : 'bg-error-50 text-error'}`}>
                        ${item?.slug === 'positive' ? <FaArrowUp /> : <FaArrowDown /> }
                        {item?.percent}
                        </span>
                    </div>
                </div>
            ))}
      </div>

      <div className=""></div>

    </div>
  )
}

export default Stats
