import { useState } from "react";
import Button from "../Helpers/Button";
import { updatePassword } from "../../Helpers/apis";
import toast from "react-hot-toast";

function Password() {
  const [ formData, setFormData ] = useState()
  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const [ loading, setLoading ] = useState(false)
  const handleUpdatePassword = async () => {
    try {
      setLoading(true)
      const res = await updatePassword(formData)
      if(res.success){
        toast.success(res.data)
      } else {
        toast.error(res.data)
      }
    } catch {

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card border-[1px] border-white shadow-sm mb-12">
      
      <div className="flex flex-col gap-6 w-full">

        <div className="flex w-full justify-between items-start">
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold text-[18px] text-gray-900">
              Password
            </h2>
            <p className="font-normal text-[14px] text-gray-600">
              Please enter your current password to change your password.
            </p>
          </div>
        </div>
        <hr />

        <div className="flex flex-col gap-5">
            <div className="flex items-start gap-8">
                <div className="min-w-[280px]">
                    <p className="text-[14px] font-medium text-gray-700">Current Password</p>
                </div>
                <div className="w-[512px] flex items-center gap-6">
                    <input onChange={handleChange} id="currentPassword" placeholder={`******`} type="text" className="input text-[16px] text-gray-900" />
                </div>
            </div>
            <hr />
            <div className="flex items-start gap-8">
                <div className="min-w-[280px]">
                    <p className="text-[14px] font-medium text-gray-700">New Password</p>
                </div>
                <div className="w-[512px]">
                    <input onChange={handleChange} id="password" placeholder={'******'} type="text" className="input text-[16px] text-gray-900 w-full" />
                    <p className="text-gray-600 font-normal text-[14px]">Your new password must be more than 6 characters.</p>
                </div>
            </div>
            <hr />
            <div className="flex items-start gap-8">
                <div className="min-w-[280px]">
                    <p className="text-[14px] font-medium text-gray-700">Confirm Password</p>
                </div>
                <div className="w-[512px]">
                    <input onChange={handleChange} id="confirmPassword" placeholder={'******'} type="text" className="input text-[16px] text-gray-900 w-full" />
                </div>
            </div>
            <hr />
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <div className="">
              <Button text={'Cancel'} style={`bg-transparent hover:bg-transparent border-[1px] !border-[#000000] !text-[#000]`} />
          </div>
          <div className="">
              <Button disabled={loading} onCLick={handleUpdatePassword} text={loading ? 'Updating...' : 'Update Password'} />
          </div>
          </div>

      </div>

    </div>
  );
}

export default Password;
