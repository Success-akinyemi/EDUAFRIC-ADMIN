import { useState } from "react"
import Button from "../Components/Helpers/Button"
import LoadingBtn from "../Components/Helpers/LoadingBtn"
import toast from "react-hot-toast"
import { createCoupon } from "../Helpers/apis"

function AddCouponCode({ setSelectedCard }) {
    const loc = window.location.href
    const pathName = loc.split('/')[4]

    const [ loading, setLoading ] =  useState(false)
    const [ formData, setFormData ] = useState({ id: pathName })
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleNewCouponCode = async () => {
        try {
            setLoading(true)
            const res = await createCoupon(formData)
            if(res.success){
                toast.success(res.data)
                window.location.reload()
            } else {
                toast.error(res.data)
            }
        } catch (error) {
            
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = () => {
        setSelectedCard()
    }

  return (
    <div className="flex w-full flex-col gap-5 max-h-[60vh] overflow-y-auto scrollbar-thin">
        <div className="flex items-center justify-center flex-col gap-1">
            <h2 className="text-center text-gray-900 text-lg font-semibold" >
                Add a coupon code to course for student to use
            </h2>
        </div>

        <div className="flex items-center flex-col gap-5">
            <div className="inputGroup">
                <label className="label">Text</label>
                <input type="text" id="text" onChange={handleChange} className="input" />
            </div>

            <div className="inputGroup">
                <label className="label">Enter Percentage Discount</label>
                <input type="percentageOff" onChange={handleChange} className="input" placeholder="Discount e.g 1 - 100%" />
            </div>

            <div className="inputGroup">
                <label className="label">Max Number of Student</label>
                <input type="text" id="maxNumber" className="input" placeholder="1000" />
            </div>

        </div>

        <div className="flex items-center gap-4">
            {
                loading ? (
                    <LoadingBtn style={`w-full`} />
                ) : (
                    <>
                        <Button onCLick={handleCancel} text={'Cancel'} style={`flex-1 w-full !border-black bg-white !text-black !hover:bg-white`}/>
                        <Button onCLick={handleNewCouponCode} style={`flex-1 flex`} text={`Create`} />
                    </>
                )
            }
        </div>
    </div>
  )
}

export default AddCouponCode
