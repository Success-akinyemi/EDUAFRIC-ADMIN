import { useState } from "react"
import Button from "../Components/Helpers/Button"
import LoadingBtn from "../Components/Helpers/LoadingBtn"
import { rejectCourse } from "../Helpers/apis"
import toast from "react-hot-toast"

function BlockCourseModal({ setSelectedCard }) {
    const loc = window.location.href
    const pathName = loc.split('/')[4]
    const [ formData, setFormData ] = useState({ id: pathName, block: true })
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value})
    }
    const handleClosePopup = () => {
        setSelectedCard(null)
    }

    const [ blockingCourse, setBlockingCourse ] = useState(false)
    const handleRejectCourse = async () => {
        try {
          setBlockingCourse(true)
          console.log('object', formData)
          const res = await rejectCourse(formData)
          if(res.success){
            toast.success(res.data)
            window.location.reload()
          } else{
            toast.error(res.data)
          }
        } catch (error) {
          
        } finally {
          setBlockingCourse(false)
        }
      }

  return (
    <div className="flex w-full flex-col gap-5">
        <div className="flex items-center justify-center flex-col gap-1">
            <h2 className="text-center text-gray-900 text-lg font-semibold" >
                Add Blocking for Rejecting course
            </h2>

            <p className="text-sm text-gray-600 font-normal text-center">
                This will pop up on the instructor screen for blocked courses so he/she can mend the right amendments
            </p>
        </div>

        <div className="flex flex-col gap-[6px]">
            <p className="text-sm font-medium text-gray-700">Reason</p>
        
            <textarea 
                name="" 
                id="reason" 
                onChange={handleChange}
                className="w-full h-[144px] border-[1px] border-[#D0D5DD] py-[10px] px-[14px] shadow-sm resize-none rounded-[8px]"
                placeholder="Type Reason"
            >

            </textarea>
        </div>

        <div className="mt-[4px] flex flex-col gap-3">
            {
                blockingCourse ? (
                    <LoadingBtn style={`bg-red-500 border-none`} />
                ) : (
                    <>
                        <Button onCLick={handleRejectCourse} text={'Block'} style={`bg-red-500 border-none hover:bg-red-600 text-white`}  />
            
                        <Button onCLick={handleClosePopup} text={'Cancel'} style={`bg-transparent text-[#000000] border-[#D0D5DD] hover:bg-[#D0D5DD] hover:text-white`} />
                    </>
                )
            }
        </div>

    </div>
  )
}

export default BlockCourseModal
