import { Link, useNavigate } from "react-router-dom"
import Button from "./Button"
import LoadingBtn from "./LoadingBtn"
import { useState } from "react"
import toast from "react-hot-toast"
import { forgotPassword } from "../../Helpers/apis"

function ForgotPasswordCard({ setErrorCard }) {
    const navigate = useNavigate()
    const [ nameError, setNameError ] = useState()
    const [ loading, setLoading ] = useState(false)
    const [ formData, setFormData ] = useState({})
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value })
    }
  
    const handleForgotPassword = async () => {
      if(!formData.name){
        setNameError('Enter Email or Staff Id')
        setTimeout(() => {
          setNameError()
        }, 2000)
  
        return
      }  
      try {
        setLoading(true)
  
        const res = await forgotPassword(formData)
        if(res.success){
          toast.success(res.msg)
          navigate('/reset-password-sent')
        } else {
          setErrorCard(`${res.data}`)
          setTimeout(() => {
            setErrorCard()
          }, 2000)
        }
      } catch (error) {
        
      } finally {
        setLoading(false)
      }
    }
  
    return (
      <div className="w-[574px] flex flex-col gap-16">
        {/**INTRO */}
        <div className="flex flex-col gap-[10px]">
        <h3 className="text-text-color-1 text-[30px] font-bold">Welcome to EduAfrica</h3>
  
          <p className="text-[16px] font-normal text-text-color-2">Enter Staff ID or Email Address</p>
        </div>
  
        {/**BODY */}
        <div className="flex flex-col gap-5">
          <div className="inputGroup">
            <label className="label">StaffID* or Email*</label>
            <input type="text" id="name" onChange={handleChange} className="input" placeholder="samadopabode@gmail.com" />
            <p className="font-medium text-error text-[13px]">{nameError}</p>
            <Link to={`/`} className="font-medium text-primary-color text-[13px]">Back</Link>
          </div>
        </div>
  
        {/**BUTTON */}
        {
          loading ? (
            <LoadingBtn />
          ) : (
            <Button disabled={loading} onCLick={handleForgotPassword} text={'Submit'} />
          )
        }
  
      </div>
    )
}

export default ForgotPasswordCard
