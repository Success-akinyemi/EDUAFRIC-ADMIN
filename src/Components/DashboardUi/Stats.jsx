import { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import DateFilter from "../Helpers/DateFilter";
import { fetchDashboardStats } from "../../Helpers/fetch.api";
import Spinner from "../Helpers/Spinner";

function Stats() {
  const [timeDate, setTimeDate] = useState(null);
  const { isFetchingStats, statsData, statsDataStatus, statsDataServerError } = fetchDashboardStats(timeDate?.value);

  useEffect(() => {
    if (statsDataStatus === 200) {
      // Handle the success case here if necessary
      console.log("Fetched data successfully", statsData?.data);
    } else if (statsDataServerError) {
      // Handle the error case here if necessary
      console.log("Error fetching data", statsDataServerError);
    }
    console.log('isFetchingStats', isFetchingStats)
  }, [statsData, statsDataStatus, statsDataServerError, isFetchingStats]);

  return (
    <div className="flex flex-col gap-6 text-gray-700">
      <div className="w-full flex">
        <DateFilter setTimeDate={setTimeDate} timeDate={timeDate} />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {isFetchingStats ? (
          <div className="flex items-center justify-center w-full">
            <Spinner />
          </div>
        ) : (
          statsData?.data?.map((item) => (
            <div key={item?._id} className="card flex flex-col gap-1">
              <p className="text-[14px] font-medium text-gray-500">{item?.title}</p>
              <div className="flex items-center justify-between">
                <h2 className="text-[30px] font-semibold text-gray-900">{item?.total?.toLocaleString()}</h2>
                <span
                  className={`rounded-[16px] text-[14px] font-medium py-[2px] px-[9px] flex items-center justify-center ${
                    item?.slug === "positive"
                      ? "bg-success-50 text-primary-color"
                      : "bg-error-50 text-error"
                  }`}
                >
                  $
                  {item.slug === "positive" ? (
                    <FaArrowUp className="text-[12px]" />
                  ) : (
                    <FaArrowDown className="text-[12px]" />
                  )}
                  {item?.percent}%
                </span>
              </div>
            </div>
          ))
        )
        }
      </div>
    </div>
  );
}

export default Stats;
