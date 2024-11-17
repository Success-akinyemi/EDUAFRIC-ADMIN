import { useState } from "react"
import toast from "react-hot-toast"
import { useLocation, useNavigate } from "react-router-dom"
import { resetPassword } from "../../Helpers/apis"
import LoadingBtn from "./LoadingBtn"
import Button from "./Button"

function ResetPasswordCard({ setErrorCard }) {
    const navigate = useNavigate()
    const loc = useLocation()
    const pathName = loc.pathname.split('/')[2]
    const [ passwordError, setPasswordError ] = useState()
    const [ confirmPasswordError, setConfirmPasswordError ] = useState()
    const [ showPassword, setShowPassword ] = useState(false)
    const [ showConfirmPassword, setShowConfirmPassword ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ formData, setFormData ] = useState({ token: pathName })
  
    const toggleShowPassword = () => {
      setShowPassword((prev) => !prev)
    }
    
    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword((prev) => !prev)
    }

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value })
    }
  
    const handleResetPassword = async () => {
      if(!formData.password){
        setPasswordError('Enter Password')
        setTimeout(() => {
            setPasswordError()
        }, 2000)
        
        return
      }
      if(!formData.confirmPassword){
        setConfirmPasswordError('Enter Confirm Password')
        setTimeout(() => {
            setConfirmPasswordError()
        }, 2000)
        
        return
      }
  
      try {
        setLoading(true)
  
        const res = await resetPassword(formData)
        if(res.success){
          toast.success(res.data)
          navigate('/')
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
  
          <p className="text-[16px] font-normal text-text-color-2">Sign in with Staff ID or Email Address</p>
        </div>
  
        {/**BODY */}
        <div className="flex flex-col gap-5">
          <div className="inputGroup">
            <label className="label">Password*</label>
            <div className="relative w-full">
              <input type={ showPassword ? 'text' : 'password' } id="password" onChange={handleChange} className="input" placeholder="samamd" />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" onClick={toggleShowPassword}>
                { showPassword ? 'hide' : 'show'}
              </span>
            </div>
            <p className="font-medium text-error text-[13px]">{passwordError}</p>
          </div>

          <div className="inputGroup">
            <label className="label">Confirm Password*</label>
            <div className="relative w-full">
              <input type={ showConfirmPassword ? 'text' : 'password' } id="confirmPassword" onChange={handleChange} className="input" placeholder="samamd" />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" onClick={toggleShowConfirmPassword}>
                { showConfirmPassword ? 'hide' : 'show'}
              </span>
            </div>
            <p className="font-medium text-error text-[13px]">{confirmPasswordError}</p>
          </div>
        </div>
  
        {/**BUTTON */}
        {
          loading ? (
            <LoadingBtn />
          ) : (
            <Button disabled={loading} onCLick={handleResetPassword} text={'Reset Password'} />
          )
        }
  
      </div>
    )
}

export default ResetPasswordCard
