import { useState } from "react"
import { studentList } from "../../Data/students"
import DataTable from "./DataTable"

function StudentList({ timeDate, setTimeDate }) {
    const listData = studentList
    const [ cardState, setCardState ] = useState(listData[0]?.slug)

    const handleCardChange = (value) => {
        setCardState(value)
    }
  return (
    <div className="flex flex-col gap-[30px]">
      
      <div className="flex items-center border-b-[1px] border-b-[#D9DBE9] gap-4">
            {
                listData.map((item, idx) => (
                    <div onClick={() => handleCardChange(item?.slug)} className={`pt-[1px] pb-[11px] px-[4px] cursor-pointer border-b-[2px] ${item?.slug === cardState ? 'border-b-primary-color' : 'border-b-[#D9DBE9]' } `}>
                        <p className={`text-[14px] font-semibold ${item?.slug === cardState ? 'text-primary-color' : 'text-[#364152]' }`}>
                            {item.name}
                        </p>
                    </div>
                ))
            }
      </div>

      <div>
        <DataTable timeDate={timeDate} setTimeDate={setTimeDate} />
      </div>


    </div>
  )
}

export default StudentList
