import { useState } from "react";
import { studentList } from "../../Data/students";
import DataTable from "./DataTable";
import { fetchAllUsers } from "../../Helpers/fetch.api";

function StudentList({ timeDate, setTimeDate }) {
    const { isFetchingUser, userData } = fetchAllUsers();
    const studentData = userData?.data || [];
    const listData = studentList;
    const [cardState, setCardState] = useState(listData[0]?.slug);

    const handleCardChange = (value) => {
        setCardState(value);
    };

    // Filter student data based on the selected cardState
    const filteredData = studentData.filter((student) => {
        if (cardState === 'all') return true;
        if (cardState === 'active') return student.verified === true;
        if (cardState === 'inactive') return student.verified === false;
        if (cardState === 'blacklist') return student.blocked === true;
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

            <div>
                <DataTable data={filteredData} loading={isFetchingUser} timeDate={timeDate} setTimeDate={setTimeDate} />
            </div>
        </div>
    );
}

export default StudentList;
