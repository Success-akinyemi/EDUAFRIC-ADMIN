import { useDispatch, useSelector } from "react-redux";
import Button from "../Helpers/Button"
import { useState } from "react";
import ReactQuill from "react-quill";
import { editProfile } from "../../Helpers/apis";
import toast from "react-hot-toast";
import { signInSuccess } from "../../Redux/User/adminSlice";

function MyDetails() {
    const dispatch = useDispatch()
    const { currentAdmin } = useSelector((state) => state.admin);
    const admin = currentAdmin?.data

    const [ formData, setFormData ] = useState({ id: admin._id })
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }
    const handleBioChange = (value) => {
        setFormData({ ...formData, bio: value });
    };

    const [ loading, setLoading ] = useState(false)
    const handleUpdateProfile = async () => {
        try {
            setLoading(true)
            const res = await editProfile(formData)
            if(res.success){
                toast.success(res.msg)
                dispatch(signInSuccess(res?.data))
            }
        } catch { 
            
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className="card px-[28px] py-[28px] border-[1px] border-white shadow-sm max-h-[1026px] mb-12 scrollbar-thin">
      
      <div className="flex flex-col gap-6 w-full">

        <div className="flex w-full justify-between items-start">
            <div className="flex flex-col gap-1">
                <h2 className="font-semibold text-[18px] text-gray-900">Personal info</h2>
                <p className="font-normal text-[14px] text-gray-600">Update your photo and personal details here.</p>
                <p className="text-primary-color font-semibold text-[]">Staff ID: {admin.staffID}</p>
            </div>

            <div className="flex items-center gap-3">
                <div className="">
                    <Button text={'Cancel'} style={`bg-transparent hover:bg-transparent border-[1px] border-[#000000] text-[#000]`} />
                </div>
                <div className="">
                    <Button disabled={loading} onCLick={handleUpdateProfile} text={loading ? 'Uploading...' : 'Save'} />
                </div>
            </div>
        </div>
        <hr />

        <div className="flex flex-col gap-5">
            <div className="flex items-start gap-8">
                <div className="min-w-[280px]flex flex-col">
                    <h3 className="text-[14px] font-medium text-gray-700">Your photo</h3>
                    <p className="text-gray-600 font-normal text-[14px]">This will be displayed on your profile.</p>
                </div>
                <div className=""></div>
            </div>
            <div className="flex items-start gap-8">
                <div className="min-w-[280px]">
                    <p className="text-[14px] font-medium text-gray-700">Name</p>
                </div>
                <div className="w-[512px] flex items-center gap-6">
                    <input onChange={handleChange} id="firstName" defaultValue={admin?.firstName} type="text" className="input text-[16px] text-gray-900" />
                    <input onChange={handleChange} id="lastName" defaultValue={admin?.lastName} type="text" className="input text-[16px] text-gray-900" />
                </div>
            </div>
            <hr />
            <div className="flex items-start gap-8">
                <div className="min-w-[280px]">
                    <p className="text-[14px] font-medium text-gray-700">Email Address</p>
                </div>
                <div className="w-[512px]">
                    <input onChange={handleChange} id="email" defaultValue={admin?.email} type="text" className="input text-[16px] text-gray-900 w-full" />
                </div>
            </div>
            <hr />
            <div className="flex items-start gap-8">
                <div className="min-w-[280px]">
                    <p className="text-[14px] font-medium text-gray-700">Role</p>
                </div>
                <div className="w-[512px]">
                <input disabled defaultValue={admin?.role} type="text" className="input text-[16px] text-gray-900" />
                </div>
            </div>
            <hr />
            <div className="flex items-start gap-8">
                <div className="min-w-[280px]">
                    <p className="text-[14px] font-medium text-gray-700">Country</p>
                </div>
                <div className="w-[512px]">
                    <input onChange={handleChange} id="country" defaultValue={admin?.country} type="text" className="input text-[16px] text-gray-900 w-full" />
                </div>
            </div>
            <hr />
            <div className="flex items-start gap-8">
                <div className="min-w-[280px]">
                    <p className="text-[14px] font-medium text-gray-700">Phone Number</p>
                </div>
                <div className="w-[512px]">
                    <input onChange={handleChange} id="phoneNumber" defaultValue={admin?.phoneNumber} type="text" className="input text-[16px] text-gray-900 w-full" />
                </div>
            </div>
            <hr />
            <div className="flex items-start gap-8">
                <div className="min-w-[280px]">
                    <p className="text-[14px] font-medium text-gray-700">Time Zone</p>
                </div>
                <div className="w-[512px]">

                </div>
            </div>
            <hr />
            <div className="flex items-start gap-8">
                <div className="min-w-[280px]">
                    <p className="text-[14px] font-medium text-gray-700">Bio</p>
                    <p className="text-gray-600 font-normal text-[14px]">Write a short introduction.</p>
                </div>
                {/**
                 * 
                 */}
                <div className="w-[512px] flex flex-col">
                 <p className="" dangerouslySetInnerHTML={{ __html: admin?.bio }}>
 
                 </p>
                    <ReactQuill
                        value={formData.bio}
                        onChange={handleBioChange}
                        defaultValue={formData?.bio}
                        theme="snow"
                        className="w-full h-[200px] mb-[28px]"
                    />
                </div>
            </div>
        </div>

      </div>

    </div>
  )
}

export default MyDetails
