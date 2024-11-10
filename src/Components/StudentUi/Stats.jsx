import { Studentstats } from "../../Data/students"
import { MdOutlineShowChart } from "react-icons/md";


function Stats({ timeDate, setTimeDate }) {
  return (
    <div className="flex items-center justify-center gap-6 ">
      {
        Studentstats?.map((item, idx) => (
            <div key={idx} className={`flex flex-col flex-1 p-4 shadow-md border-[1px] rounded-[4px] border-gray-200`}>
                <div className="flex flex-col gap-4">
                    <h3 className="text-[#202224] text-[14px] font-semibold">{item?.name}</h3>

                    <h2 className={`text-[28px] font-bold ${item?.slug === 'positive' ? 'text-primary-color' : 'text-error'}`}>
                        {item?.total}
                    </h2>
                </div>

                <span className="flex mt-8 items-center gap-[2px]">
                    <MdOutlineShowChart className={`${item?.slug === 'positive' ? 'text-primary-color' : 'text-error'}`} />
                    <p className={`text-[14px] text-[#606060] font-semibold`}>
                        <span className={`${item?.slug === 'positive' ? 'text-primary-color' : 'text-error'}`} >{item?.percent}%</span>
                        {' '}Up from yesterday
                    </p>
                </span>
            </div>
        ))
      }
    </div>
  )
}

export default Stats
