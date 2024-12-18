import { useEffect, useRef, useState } from "react";
import { CiCalendar } from "react-icons/ci"
import { IoClose } from "react-icons/io5"
import { MdOutlineFilterList } from "react-icons/md"
import { dateFilter } from "../../Data/dateFilter";
import { formatDate } from "../../Helpers/formatDate";
import Button from "./Button";

function DateFilter({ setTimeDate, timeDate, showActiveStats }) {
  const datesFilter = dateFilter;
  useEffect(() => {
      setTimeDate(datesFilter[0])
  }, [ datesFilter ])
  const [showFilter, setShowFilter] = useState(false);

    
    // Create refs for both start and end date inputs
    const startDateInputRef = useRef(null);
    const endDateInputRef = useRef(null);

    //Date picker
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    //date error
    const [dateError, setDateError] = useState();

    
  // Handle date range selection
  const handleDateChange = () => {
    if (startDate && endDate) {
      // Check if start date is greater than end date
      if (new Date(startDate) > new Date(endDate)) {
        setDateError(`Start date cannot be greater than the end date.`);
        setTimeout(() => {
          setDateError();
        }, 4000);
        return;
      }

      // Format date range
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);

      // Set timeDate with formatted values
      const dateRange = {
        name: `${formattedStartDate} – ${formattedEndDate}`,
        value: `${formattedStartDate} – ${formattedEndDate}`,
      };
      setTimeDate(dateRange);
      setShowFilter(false);
    }
  };

  // Prevent future dates
  const today = new Date().toISOString().split("T")[0];

  const handleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  const handleTimeDate = (item) => {
    setTimeDate(item);
    setTimeDate(item);
    setShowFilter((prev) => !prev);
  };
  
    return (
    <div className="gap-3 flex items-center ml-auto">
    <div className="card py-2 flex items-center gap-[3px]">
      <MdOutlineFilterList className="text-[18px]" />
      Filters
    </div>

    <div className="card py-2 px-3 relative">
      <p
        onClick={handleFilter}
        className="cursor-pointer flex items-center gap-[2px]"
      >
        <CiCalendar className="text-[20px]" />
        {timeDate?.name}
      </p>

      {/**FILTER CARD */}
      {showFilter && (
        <div className="py-4 shadow rounded-[4px] bg-white z-[999] w-[279px] absolute flex flex-col right-4 top-6">
          <div className="px-4 py-2 flex items-center justify-between pb-5 border-b">
            <h2 className="text-off-black text-[18px] font-semibold">
              Filter
            </h2>

            <div
              onClick={handleFilter}
              className="text-[25px] cursor-pointer"
            >
              <IoClose />
            </div>
          </div>

          <div className="flex flex-col gap-2">

            <div className=" px-4 flex flex-wrap mt-8 gap-4">
              {datesFilter?.map((item) => (
                <div
                  onClick={() => handleTimeDate(item)}
                  className="py-1 px-2 rounded-[4px] bg-[#EFFCF6] cursor-pointer text-[12px] text-[#344054] font-normal"
                >
                  {item?.name}
                </div>
              ))}
            </div>

            <hr className="mt-6 mb-2" />

            <div className="">
              <div className="py-2 px-4 flex gap-2">
                <p className="text-[12px] font-semibold text-[#929292]">Period</p>
              </div>

              <div className="px-4 flex items-center  justify-between">
                <div className="relative gap-[6px] py-1 px-2 border flex items-center">
                  <input
                    ref={startDateInputRef}
                    type="date"
                    value={startDate}
                    max={today}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div
                    onClick={() => startDateInputRef.current.focus()}
                    className=" text-gray-500 text-[12px] font-normal"
                  >
                    Start Date
                  </div>
                  <CiCalendar className="text-[20px] text-gray-500" />
                </div>

                <div className="relative gap-[6px] py-1 px-2 border flex items-center">
                  <input
                    ref={endDateInputRef}
                    type="date"
                    value={endDate}
                    max={today}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onBlur={handleDateChange}
                  />
                  <div
                    onClick={() => endDateInputRef.current.focus()}
                    className=" text-gray-500 text-[12px] font-normal"
                  >
                    End Date
                  </div>
                  <CiCalendar className="text-[20px] text-gray-500" />
                </div>
              </div>
              <p className="text-[12px] text-error ">{dateError}</p>


            </div>
            
            {
              showActiveStats && (
                <div className="flex flex-col gap-[6px]">
                  <div className="py-2 px-4 flex gap-2">
                    <p className="text-[12px] font-semibold text-[#929292]">Status</p>
                  </div>

                  <div className="px-4">
                    <select className="input">
                      <option disabled value="">Select Status</option>
                      <option value="inactive">Inactive</option>
                      <option value="blacklisted">Blascklisted</option>
                      <option value="active">active</option>
                    </select>
                  </div>
                </div>
              )
            }

          </div>

          {/**FILTER BTN */}
          <div className="pt-8 w-full">
              <div className="px-6 pb-6 flex items-center gap-3 w-full">
                <Button onCLick={handleFilter} text={`Clear`} style={`!w-full !bg-transparent !text-[#344054] !border-[#D0D5DD]`} />
                <Button onClick={handleFilter} text={`Filter`} style={`!w-full`} />
              </div>
          </div>

        </div>
      )}
    </div>
  </div>
  )
}

export default DateFilter
