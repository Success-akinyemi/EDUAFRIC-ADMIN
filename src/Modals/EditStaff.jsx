import { useState } from "react";
import Button from "../Components/Helpers/Button";
import toast from "react-hot-toast";
import Spinner from "../Components/Helpers/Spinner";
import { adminEditStaff } from "../Helpers/apis";
import { fetchStaffs } from "../Helpers/fetch.api";

function EditStaff({ setAdminStaffId, adminStaffId, setSelectedCard }) {
    const { isFetchingStaffsData, staffsData, staffsError } = fetchStaffs(adminStaffId);
    const studentData = staffsData?.data;

    const errorMsg = staffsError?.response?.data?.data || staffsError?.message || 'Failed to fetch data'
    

    const [ formData, setFormData ] = useState({ id: adminStaffId })
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const [ updating, setUpdating ] = useState(false)
    const handleEditAccount = async () => {
        try {
          setUpdating(true)
          const res = await adminEditStaff(formData)
          if(res.success){
            toast.success(res.data)
            window.location.reload()
          } else {
            toast.error(res.data)
          }
        } catch {
    
        } finally {
          setUpdating(false)
        }
      }

      const handleCancel = () => {
        setAdminStaffId()
        setSelectedCard()
      }

  return (
    <div className="flex w-full flex-col gap-5 max-h-[60vh] overflow-y-auto scrollbar-thin">
        <div className="flex items-center justify-center flex-col gap-1">
            <h2 className="text-center text-gray-900 text-lg font-semibold" >
                Edit staff profile
            </h2>
        </div>
        
        <div className="flex flex-col gap-4">
            {
                isFetchingStaffsData ? (
                    <div className="flex items-center justify-center">
                        <Spinner />
                    </div>
                ) : staffsError ? (
                    <p className="text-error text-[19px] text-center">{errorMsg}</p>
                ) : (
                    <>
                        <div className="inputGroup">
                            <label className="label">Name</label>
                            <input type="text" disabled className="input" defaultValue={`${studentData?.firstName} ${studentData?.lastName}`} />
                        </div>
                        <div className="inputGroup">
                            <label className="label">Email</label>
                            <input type="text" disabled className="input" defaultValue={`${studentData?.email}`} />
                        </div>
                        <div className="inputGroup">
                            <label className="label">Email Verification Status</label>
                            <input type="text" disabled className="input" defaultValue={`${studentData?.verified ? 'Email Verified' : 'Email Not Verified'}`} />
                        </div>
                        <p className="text-error font-semibold text-[16px]">Update Staff Role</p>
                        <div className="inputGroup">
                            <label className="label">Select Staff Role</label>
                            <select onChange={handleChange} className="input" id="role" defaultValue={studentData?.role}>
                                <option value="Staff">Staff</option>
                                <option value="Manager">Manager</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>

                                {/**BTN */}
        <div className="flex items-center justify-center gap-3 flex-col w-full">
            <div className="w-full items-center justify-center">
              <Button
                onCLick={handleEditAccount}
                text={updating ? "Updating..." : "Update Account"}
                style={`w-full`}
              />
            </div>
            <div className="w-full items-center justify-center">
              <Button
                onCLick={handleCancel}
                text={"Cancel"}
                style={`bg-transparent hover:bg-transparent border-[1px] border-black text-black w-full`}
              />
            </div>

          </div>
                    </>
                )
            }
        </div>
    </div>
  )
}

export default EditStaff
