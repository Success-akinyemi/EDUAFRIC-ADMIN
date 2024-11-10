import { CiSearch } from "react-icons/ci"
import DateFilter from "../Helpers/DateFilter"

function DataTable({ data, timeDate, setTimeDate }) {
  return (
    <div className="flex p-4 gap-[30px] bg-white border-[1px] border-white shadow-sm rounded-t-[12px]">
      
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-[50px]">
            <h3 className="text-lg font-semibold text-[#121212]" >34 Students</h3>
            <div className="flex items-center w-[400px] bg-white gap-[6px]">
                <CiSearch className="text-[28px] cursor-pointer" />
                <input
                    type="text"
                    className="input"
                    placeholder="Search"
                />
            </div>
        </div>

        <div className="">
            <div className="w-full flex">
                <DateFilter setTimeDate={setTimeDate} timeDate={timeDate} />
            </div>
        </div>
      </div>

      <div className="">
        
      </div>

    </div>
  )
}

export default DataTable
