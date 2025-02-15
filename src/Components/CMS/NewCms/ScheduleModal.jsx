import { useState } from "react";
import Calendar from "react-calendar"; // Import react-calendar
import "react-calendar/dist/Calendar.css"; // Import default styles
import Button from "../../Helpers/Button";
import toast from "react-hot-toast";
import { newCms } from "../../../Helpers/apis";
import LoadingBtn from "../../Helpers/LoadingBtn";

function ScheduleModal({ formData, setFormData, setScheduleModal, setErrorMsg }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [showCalendar, setShowCalendar] = useState(false); // To toggle calendar visibility

  const handleDateChange = (value) => {
    const date = new Date(value); // Date object
    const day = date.toLocaleDateString("en-US", { weekday: "long" });
    const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD

    setSelectedDate(formattedDate);
    setSelectedDay(day);

    // Update formData
    setFormData({
      ...formData,
      date: formattedDate,
      day: day,
    });

    setShowCalendar(false); // Close calendar after selection
  };

  const handleTimeChange = (e) => {
    const value = e.target.value; // Time in "HH:MM" format (24-hour)
  
    // Split hours and minutes
    const [hours, minutes] = value.split(":").map(Number);
  
    // Determine AM or PM
    const period = hours >= 12 ? "PM" : "AM";
  
    // Convert hours to 12-hour format
    const twelveHour = hours % 12 || 12; // Convert 0 to 12 for midnight
  
    // Format the time as "h:mm AM/PM" (no leading zero for single-digit hours)
    const formattedTime = `${twelveHour}:${String(minutes).padStart(2, "0")} ${period}`;
  
    setSelectedTime(formattedTime);
  
    // Update formData
    setFormData({
      ...formData,
      time: formattedTime,
    });
  };
  
  

  const handleCancel = () => {
    setScheduleModal(false);
  };

  const [ loading, setLoading ] = useState(false)
  const handleScheduledCms = async () => {
    console.log('object')
    try {
        setLoading(true)
        const res = await newCms(formData)
        if(res.success){
            toast.success(res.data)
            window.location.reload()
        } else {
            setErrorMsg(res.data)
            setTimeout(() => {
                setErrorMsg()
            }, 2000)
        }
    } catch (error) {
        
    } finally {
        setLoading(false)
    }
  };


  return (
    <div className="popup-overlay z-40 fixed flex items-center justify-center top-0 left-0 w-[100vw] h-[100vh] bg-[#A59B9B4D]">
      <div className={`z-50 w-[695px] bg-white shadow-xl rounded-[12px] p-4`}>
        <div className="w-full flex flex-col gap-[30px] max-h-[60vh] overflow-y-auto scrollbar-thin">
          <div className="flex flex-col gap-1 items-center justify-center">
            <h2 className="text-lg font-semibold text-gray-600">
              Schedule Publish
            </h2>
            <p className="text-sm text-gray-600 font-medium">
              Set document required for your future CMS
            </p>
          </div>

          {/* Date Picker Section */}
          <div className="flex flex-col gap-4 items-center">
            <div className="flex items-start w-full gap-[30px]">
              {/* DATE */}
              <div className="flex-[6] flex flex-col gap-2">
                    <div className="flex items-center justify-center border-none mt-2">
                      <Calendar
                        onChange={handleDateChange}
                        value={selectedDate ? new Date(selectedDate) : null}
                        minDate={new Date()}
                        className={`border-none bg-transparent`}
                      />
                    </div>
              </div>

              <div className="flex-[4] flex flex-col w-full gap-5">
                {/**SELECTED DATE */}
                <div className="">
                    <label
                      htmlFor="date-picker"
                      className="text-sm font-medium text-gray-600"
                    >
                      Select Date
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="date-picker"
                        value={selectedDate}
                        readOnly
                        
                        className="input cursor-pointer"
                        placeholder="Click to select a date"
                      />
                    </div>
                  </div>
                {/* SELECTED DAY */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="selected-day"
                    className="text-sm font-medium text-gray-600"
                  >
                    Selected Day
                  </label>
                  <input
                    type="text"
                    id="selected-day"
                    value={selectedDay}
                    readOnly
                    className="input"
                  />
                </div>
                {/* SELECTED TIME */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="time-picker" className="text-sm font-medium text-gray-600">
                        Select Time: {formData?.time}
                    </label>
                    <input
                        type="time"
                        id="time-picker"
                        value={formData?.time}
                        onChange={handleTimeChange}
                        className="input"
                    />
                    </div>

              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="z-[99999] px-2 mb-8 flex items-center justify-center w-full gap-3 mt-4">
            {
                loading ? (
                    <LoadingBtn style={`w-full`} />
                ) : (
                    <>
                        <div className="flex-1 w-full" onClick={handleCancel}>
                            <Button
                                onClick={handleCancel}
                                text={`Cancel`}
                                style={`flex-1 w-full !bg-white !border-black !text-black !hover:bg-white`}
                            />
                        </div>
                        <div className="flex-1 w-full" onClick={handleScheduledCms}>
                            <Button
                                onClick={handleScheduledCms}
                                text={`Schedule publish`}
                                style={`flex-1 w-full`}
                            />
                        </div>
                    </>
                )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleModal;
