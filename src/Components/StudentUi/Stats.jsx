import { Studentstats } from "../../Data/students"
import { MdOutlineShowChart } from "react-icons/md";
import { fetchStudentStats } from "../../Helpers/fetch.api";


function Stats({ timeDate, setTimeDate }) {
  let data
  if(timeDate){
    const { isFetching, statsData } = fetchStudentStats(timeDate?.value)
    data = statsData
  }
  //console.log('stats Data', data?.data)
  const StudentStatsData = data?.data

  return (
    <div className="flex items-center justify-center gap-6 bg-white">
      {
        StudentStatsData?.map((item, idx) => (
            <div key={idx} className={`flex flex-col flex-1 p-4 shadow-md border-[1px] rounded-[4px] border-gray-200`}>
                <div className="flex flex-col gap-4">
                    <h3 className="text-[#202224] text-[14px] font-semibold">{item?.name}</h3>

                    <h2 className={`text-[28px] font-bold ${item?.percentage === '+' ? 'text-primary-color' : 'text-error'}`}>
                        {item?.current}
                    </h2>
                </div>

                <span className="flex mt-8 items-center gap-[2px]">
                    <MdOutlineShowChart className={`${item?.percentage === '+' ? 'text-primary-color' : 'text-error'}`} />
                    <p className={`text-[14px] text-[#606060] font-semibold`}>
                        <span className={`${item?.percentage === '+' ? 'text-primary-color' : 'text-error'}`} >{item?.change}%</span>
                        {' '}Up from { timeDate?.value === 'today' ? 'yesterday' : timeDate?.value === '7days' ? 'Last 7 days' : timeDate?.value === '30days' ? 'Last 30 days' : timeDate?.value === '1year' ? 'Last 1 year' : 'All Time' } 
                    </p>
                </span>
            </div>
        ))
      }
    </div>
  )
}

export default Stats
