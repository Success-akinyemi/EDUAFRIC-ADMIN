import { useState } from "react";
import { staffList } from "../../Data/staffs";
import StaffTable from "./StaffTable";
import { fetchStaffs } from "../../Helpers/fetch.api";

function StaffList() {
    const { isFetchingStaffsData, staffsData } = fetchStaffs();
    const dataArray = staffsData?.data || [];
    const listData = staffList;
    const [cardState, setCardState] = useState(listData[0]?.slug);

    const handleCardChange = (value) => {
        setCardState(value);
    };

    // Filter instructor data based on the selected cardState
    const filteredData = dataArray.filter((instructor) => {
        if (cardState === 'all') return true;
        if (cardState === 'active') return instructor?.approved?.toLowerCase() === 'approved';
        if (cardState === 'inactive') return instructor.approved === 'Rejected';
        if (cardState === 'blacklist') return instructor.isBlocked === true;
        return true;
    });

  return (
    <div className="flex flex-col gap-[30px]">
    <div className="flex items-center border-b-[1px] border-b-[#D9DBE9] gap-4">
        {listData.map((item, idx) => (
            <div
                key={idx}
                onClick={() => handleCardChange(item?.slug)}
                className={`pt-[1px] pb-[11px] px-[4px] cursor-pointer border-b-[2px] min-w-[102px] flex items-center justify-center ${
                    item?.slug === cardState ? 'border-b-primary-color' : 'border-b-[#D9DBE9]'
                }`}
            >
                <p
                    className={`text-[14px] font-semibold ${
                        item?.slug === cardState ? 'text-primary-color' : 'text-[#364152]'
                    }`}
                >
                    {item.name}
                </p>
            </div>
        ))}
    </div>

    <div className="card">
      <StaffTable data={filteredData} loading={isFetchingStaffsData}  />
    </div>
      
    </div>
  )
}

export default StaffList
