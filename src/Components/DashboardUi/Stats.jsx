import { stats } from "../../Data/stats";
import { FaArrowUp } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";
import { useState } from "react";
import DateFilter from "../Helpers/DateFilter";

function Stats() {
  const [timeDate, setTimeDate] = useState();



  const statsData = stats;


  return (
    <div className="flex flex-col gap-6 text-gray-700">
        <div className="w-full flex">
            <DateFilter setTimeDate={setTimeDate} timeDate={timeDate} />
        </div>

      <div className="grid grid-cols-3 gap-6">
        {statsData?.map((item) => (
          <div key={item.slug} className="card flex flex-col gap-1">
            <p className="text-[14px] font-medium text-gray-500">
              {item.title}
            </p>

            <div className="flex items-center justify-between">
              <h2 className="text-[30px] font-semibold text-gray-900">
                {item.total}
              </h2>

              <span
                className={`rounded-[16px] text-[14px] font-medium py-[2px] px-[9px] flex items-center justify-center ${
                  item?.slug === "positive"
                    ? "bg-success-50 text-primary-color"
                    : "bg-error-50 text-error"
                }`}
              >
                $
                {item?.slug === "positive" ? (
                  <FaArrowUp className="text-[12px]" />
                ) : (
                  <FaArrowDown className="text-[12px]" />
                )}
                {item?.percent}%
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className=""></div>
    </div>
  );
}

export default Stats;
