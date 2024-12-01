import { useState } from "react";
import { deleteCms } from "../Helpers/apis";
import Button from "../Components/Helpers/Button";
import LoadingBtn from "../Components/Helpers/LoadingBtn";
import Delete from '../assets/images/deleteBin.png'
import toast from "react-hot-toast";

function DeleteCms({ cmsId, setCmsId, setSelectedCard }) {
    const [ blacklisting, setBlacklisting ] = useState(false)
    const handleDeleteCms = async (value) => {
        try {
          setBlacklisting(true)
          const res = await deleteCms({ id: cmsId })
          if(res.success){
            toast.success(res.data)
            window.location.reload()
          } else {
            toast.error(res.data)
          }
        } catch {
    
        } finally {
          setBlacklisting(false)
        }
      };

      const handleCancel = () => {
        setCmsId()
        setSelectedCard()
      }

  return (
    <div className="flex w-full flex-col gap-5 max-h-[60vh] rounded-[12px] overflow-y-auto scrollbar-thin">
        <div className="flex items-center justify-center flex-col gap-1">
            <img src={Delete} alt="bin" className="w-[48px] h-[48px]"/>
            <h2 className="text-center text-gray-900 text-lg font-semibold" >
                Delete content post
            </h2>
            <p className="text-[14px] font-medium text-gray-600 text-sm text-center">
                Are you sure you want to delete this post? This <br /> action cannot be undone.
            </p>
        </div>

        <div className="flex items-center gap-3 w-full mt-3">
            {
                blacklisting ? (
                    <LoadingBtn style={`w-full !bg-error !hover:bg-error !border-error`} />
                ) : (
                    <>
                        <Button onCLick={handleCancel} text={'Cancel'} style={`flex-1 w-full !border-black bg-white !text-black !hover:bg-white`}/>
                        <Button onCLick={handleDeleteCms} text={`Delete`} style={`flex-1 w-full !bg-error !hover:bg-red-700 !border-error`}/>
                    </>
                )
            }
        </div>
    </div>
  )
}

export default DeleteCms
