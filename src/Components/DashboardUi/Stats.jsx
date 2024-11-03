import { MdOutlineFilterList } from "react-icons/md";
import { stats } from "../../Data/stats";

function Stats() {
    const statsData = stats

  return (
    <div className="flex flex-col gap-6 text-gray-700">
      <div className="gap-3 flex items-center ml-auto">
        <div className="card py-2 px-3">

        </div>

        <div className="card py-2 px-3 flex items-center gap-[3px]">
         <MdOutlineFilterList className="text-[18px]" />
         Filters
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
            {statsData.map((item) => (
                <div key={item.slug} className="card flex flex-col">
                    <p className="text-[14px] font-medium text-gray-500">{item.title}</p>

                    <div className="flex items-center justify-between">
                        <h2 className="text-[30px] font-semibold text-gray-900">{item.total}</h2>

                        <span></span>
                    </div>
                </div>
            ))}
      </div>

      <div className=""></div>

    </div>
  )
}

export default Stats
