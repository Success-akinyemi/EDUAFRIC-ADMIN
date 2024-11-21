import { instructorsList } from "../../Data/Instructors";
import { fetchAllInstructors } from "../../Helpers/fetch.api";
import DataTable from "./DataTable";
import { useState } from "react";


function InstructorsList({ timeDate, setTimeDate }) {
    const { instructorsData: data, isFetchingInstructor } = fetchAllInstructors();
    const instructorsData = data?.data || [];
    const listData = instructorsList;
    const [cardState, setCardState] = useState(listData[0]?.slug);

    const handleCardChange = (value) => {
        setCardState(value);
    };

    // Filter instructor data based on the selected cardState
    const filteredData = instructorsData.filter((instructor) => {
        if (cardState === 'all') return true;
        if (cardState === 'active') return instructor.verified === true;
        if (cardState === 'inactive') return instructor.verified === false;
        if (cardState === 'blacklist') return instructor.blocked === true;
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

            <div>
                <DataTable data={filteredData} loading={isFetchingInstructor} timeDate={timeDate} setTimeDate={setTimeDate} />
            </div>
        </div>
    );
}

export default InstructorsList
