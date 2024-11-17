import Button from "../Components/Helpers/Button"

function RejectCourseModal({ setSelectedCard }) {
    const loc = window.location.href
    const pathName = loc.split('/')[4]
    
    const handleClosePopup = () => {
        setSelectedCard(null)
    }
  return (
    <div className="flex w-full flex-col gap-5">
        <div className="flex items-center justify-center flex-col gap-1">
            <h2 className="text-center text-gray-900 text-lg font-semibold" >
                Add Reason for Rejecting course
            </h2>

            <p className="text-sm text-gray-600 font-normal text-center">
                This will pop up on the instructor screen for the rejection of the course so he/she can mend the right amendments
            </p>
        </div>

        <div className="flex flex-col gap-[6px]">
            <p className="text-sm font-medium text-gray-700">Reason</p>
        
            <textarea 
                name="" 
                id="reason" 
                className="w-full h-[144px] border-[1px] border-[#D0D5DD] py-[10px] px-[14px] shadow-sm resize-none rounded-[8px]"
                placeholder="Type Reason"
            >

            </textarea>
        </div>

        <div className="mt-[4px] flex flex-col gap-3">
            <Button onCLick={''} text={'Send'}  />

            <Button onCLick={handleClosePopup} text={'Cancel'} style={`bg-transparent text-[#000000] border-[#D0D5DD] hover:bg-[#D0D5DD] hover:text-white`} />
        </div>

    </div>
  )
}

export default RejectCourseModal
