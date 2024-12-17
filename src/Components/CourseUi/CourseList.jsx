import { courseList } from "../../Data/courses";
import { fetchAllCourse } from "../../Helpers/fetch.api";
import DataTable from "../InstructorsUi/DataTable";
import { useState } from "react";
import CourseTable from "./CourseTable";

function CourseList({ timeDate, setTimeDate }) {
    const { coursesData, isFetchingData } = fetchAllCourse();
    const dataArray = coursesData?.data || [];
    const listData = courseList;
    const [cardState, setCardState] = useState(listData[0]?.slug);

    const handleCardChange = (value) => {
        setCardState(value);
    };

    // Filter instructor data based on the selected cardState
    const filteredData = dataArray.filter((instructor) => {
        if (cardState === 'all') return true;
        if (cardState === 'active') return instructor?.approved?.toLowerCase() === 'approved';
        if (cardState === 'pending') return instructor.approved === 'Pending';
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
                    item?.slug === cardState ? 'border-b-primary-color' : 'border-b-transparent'
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
      <CourseTable data={filteredData} loading={isFetchingData} timeDate={timeDate} setTimeDate={setTimeDate} />
    </div>
</div>
);
}

export default CourseList
