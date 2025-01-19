import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { PiFloppyDisk } from "react-icons/pi";
import ContentForm from "./ContentForm";
import { CiCalendar } from "react-icons/ci";
import { FaRegFileLines } from "react-icons/fa6";
import Button from "../../Helpers/Button";
import { IoClose } from "react-icons/io5";
import ErrorCard from "../../Helpers/ErrorCard";
import { updateCms } from "../../../Helpers/apis";
import toast from "react-hot-toast";
import LoadingBtn from "../../Helpers/LoadingBtn";
import EditScheduleModal from "./EditScheduleModal";

function EditContent({ data }) {
  const statusData = [
    {
      icon: <PiFloppyDisk className="text-[24px]" />,
      text: "Publish",
      status: "Published",
    },
    {
      icon: <CiCalendar className="text-[24px]" />,
      text: "Schedule publish",
      status: "Scheduled",
    },
    {
      icon: <FaRegFileLines className="text-[24px]" />,
      text: "Save as Draft",
      status: "Draft",
    },
  ];

  const currentStatus = statusData.filter((stat) => stat?.status === data?.status)
  console.log('currentStatus', currentStatus[0])

  const [statusState, setStatusState] = useState(currentStatus[0]);
  const [showStatusCard, setShowStatusCard] = useState(false);
  const [users, setUsersArray] = useState([]);
  const [formData, setFormData] = useState(data);
  const [currentEmail, setCurrentEmail] = useState("");

  const handleStatus = (data) => {
    setStatusState(data);
    setFormData((prev) => ({ ...prev, status: data.status }));
    setShowStatusCard(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const addEmail = () => {
    if (currentEmail.trim() && !users.includes(currentEmail)) {
      setUsersArray((prev) => [...prev, currentEmail]);
      setCurrentEmail(""); // Clear input
    }
  };

  const removeEmail = (email) => {
    setUsersArray((prev) => prev.filter((e) => e !== email));
  };

  useEffect(() => {
    setFormData((prev) => ({ ...prev, users }));
  }, [users]);

  useEffect(() => {
    if (formData?.accountType !== "custom") {
      setUsersArray([]);
    }
  }, [formData?.accountType]);

  useEffect(() => {
    console.log("form data", formData);
  }, [formData]);

  const [errorMsg, setErrorMsg] = useState();
  const [ loading, setLoading ] = useState(false)
  const handlePublishedCms = async () => {
    if (!formData?.title) {
      setErrorMsg("Provide a Title");
      setTimeout(() => {
        setErrorMsg();
      }, 2000);
      return;
    }
    if (!formData?.message) {
      setErrorMsg("Provide a message");
      setTimeout(() => {
        setErrorMsg();
      }, 2000);
      return;
    }
    if (!formData?.type) {
        setErrorMsg("Provide a Cms type");
        setTimeout(() => {
          setErrorMsg();
        }, 2000);
        return;
    }
    if (!formData?.accountType) {
        setErrorMsg("Provide Acount Type");
        setTimeout(() => {
          setErrorMsg();
        }, 2000);
        return;
    }
    /**
     * 
    if (formData?.accountType === 'custom' && formData?.users.length < 1) {
        setErrorMsg("Provide at least one user email");
        setTimeout(() => {
          setErrorMsg();
        }, 2000);
        return;
    }
     */
    try {
        setLoading(true)
        const res = await updateCms(formData)
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

  const [ scheduleModal, setScheduleModal ] = useState(false)
  const handleScheduledCms = async () => {
    setScheduleModal((prev) => !prev)
  };

  const handleDraftCms = async () => {
    if (!formData?.title) {
        setErrorMsg("Provide a Title");
        setTimeout(() => {
          setErrorMsg();
        }, 2000);
        return;
      }
    try {
        setLoading(true)
        const res = await updateCms(formData)
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
    <div className="relative card flex flex-col gap-[16px] rounded-none max-h-[1024px] overflow-y-auto border-[1px] border-white rounded-t-[12px] shadow-sm scrollbar-thin">
      {/**ERROR CARD */}
      {errorMsg && (
        <ErrorCard
          errorMsg={errorMsg}
          style={`!fixed right-[40px] top-[40px] z-[999]`}
        />
      )}
      {
        scheduleModal && (
          <EditScheduleModal formData={formData} setFormData={setFormData} setScheduleModal={setScheduleModal} setErrorMsg={setErrorMsg} />
        )
      }
      {/* TOP */}
      <div className="flex items-center justify-between">
        <div className="text-[#14142B] flex items-center gap-3 font-semibold text-[18px]">
          <MdKeyboardArrowLeft className="text-[24px]" />
          Add Content
        </div>

        <div className="relative">
          <div
            onClick={() => setShowStatusCard((prev) => !prev)}
            className="flex items-center gap-2 cursor-pointer bg-primary-color hover:bg-primary-color-2 text-white text-center justify-center border-[1px] border-primary-color-2 rounded-[8px] py-[10px] px-[18px]"
          >
            <div className="flex items-center gap-[8px]">
              {statusState?.icon}
              {statusState?.text}
            </div>
            <div>
              <IoIosArrowDown />
            </div>
          </div>

          {showStatusCard && (
            <div className="absolute right-[2px] top-[48px] rounded-[8px] flex flex-col p-2 bg-white border-[1px] border-[#EAECF0] shadow-lg">
              {statusData
                .filter((item) => item.text !== statusState.text)
                .map((i, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleStatus(i)}
                    className="min-w-[174px] cursor-pointer border-b-[1px] py-[4px] mb-3 flex items-center gap-[10px] text-gray-700 text-[14px] font-medium"
                  >
                    {i.icon}
                    {i.text}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      <hr />

      {/* BODY */}
      <div className="flex">
        <div className="flex-[70] flex flex-col border-r-[1px]">
          <ContentForm
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            setErrorMsg={setErrorMsg}
            data={data}
          />

          {/* Save Button */}
          <div
            onClick={
              formData?.status === "Published"
                ? handlePublishedCms
                : formData?.status === "Scheduled"
                ? handleScheduledCms
                : handleDraftCms
            }
            className="mt-8"
          >
            {
                loading ? (
                    <LoadingBtn />
                ) : (
                    <Button text={"Update"} />
                )
            }
          </div>
        </div>

        <div className="flex-[30] flex flex-col items-center px-5 gap-6">
          <div className="inputGroup">
            <p className="text-error font-semibold">Select CMS Type</p>
            <label className="label">Type</label>
            <select className="input" onChange={handleChange} id="type" defaultValue={data?.type}>
              <option value="">Select Type</option>
              <option value="promotionalmail">Mail</option>
              <option value="pushnotification">Push Notification</option>
            </select>
          </div>
          <div className="inputGroup">
            <label className="label">Account Type</label>
            <select className="input" onChange={handleChange} id="accountType" defaultValue={data?.accountType}>
              <option value="">Select Type</option>
              <option value="student">Student</option>
              <option value="instructor">Instructors</option>
              <option value="organization">Organization</option>
              <option value="allUsers">All Users</option>
              <option value="custom">Custom Users</option>
            </select>
          </div>
          {formData?.accountType === "custom" && (
            <div className="inputGroup flex flex-col w-full">
              <label className="label">Enter Users Email address</label>
              <div className="flex gap-2 w-full">
                <input
                  type="email"
                  value={currentEmail}
                  onChange={(e) => setCurrentEmail(e.target.value)}
                  className="input flex-grow w-full"
                  placeholder="Enter email"
                />
                <button
                  type="button"
                  onClick={addEmail}
                  className="bg-primary-color text-white px-4 py-[2px] rounded"
                >
                  Add
                </button>
              </div>
              {/* Display Email List */}
              <div className="mt-4 space-y-2">
                {users.map((email, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded"
                  >
                    <span className="text-gray-700">{email}</span>
                    <button
                      type="button"
                      onClick={() => removeEmail(email)}
                      className="text-red-500 hover:underline"
                    >
                      <IoClose className="text-[21px]" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditContent;
