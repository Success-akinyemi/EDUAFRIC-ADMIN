import { useState } from "react"

function SalesReport() {
    const timeFrame = [
        {
            name: '12 months',
            value: '12mth'
        },
        {
            name: '3 months',
            value: '3mth'
        },
        {
            name: '30 days',
            value: '30days'
        },
        {
            name: '7 days',
            value: '7days'
        },
        {
            name: '24 hours',
            value: '24hrs'
        }
    ]

    const [ selectedTime, setSelectedTime ] = useState(timeFrame[0]?.value)

    const chooseTime = (item) => {
        setSelectedTime(item)
    }
  return (
    <div className="card flex flex-col">
      <div className="flex gap-5 flex-col">
        <h2 className="text-off-black text-[18px] font-semibold" >Sales Report</h2>
        
        <div className="flex items-center ">
            {
                timeFrame.map((item, idx) => (
                    <div key={idx} className={`cursor-pointer text-[14px] font-medium text-gray-500 py-2 px-3 ${selectedTime === item.value ? 'bg-gray-100' : ''} `}>
                        {item.name}
                    </div>
                ))
            }
        </div>
      </div>

      <div className=""></div>
    </div>
  )
}

export default SalesReport
