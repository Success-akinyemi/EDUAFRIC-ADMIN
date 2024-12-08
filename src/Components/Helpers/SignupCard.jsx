import { useState } from "react"
import Button from "./Button"
import { signup } from "../../Helpers/apis"
import LoadingBtn from "./LoadingBtn"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

function SignupCard({ setErrorCard }) {
    const navigate = useNavigate()
    const [ firstNameError, setFirstNameError ] = useState()
    const [ lastNameError, setLastNameError ] = useState()
    const [ emailError, setEmailNameError ] = useState()
    const [ passwordError, setPasswordError ] = useState()
    const [ showPassword, setShowPassword ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ formData, setFormData ] = useState({})

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev)
      }
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value })
    }
  
    const handleSignin = async () => {
      if(!formData.firstName){
        setFirstNameError('Enter First Name')
        setTimeout(() => {
            setFirstNameError()
        }, 2000)
  
        return
      }
      if(!formData.lastName){
        setLastNameError('Enter Last Name')
        setTimeout(() => {
            setLastNameError()
        }, 2000)
        
        return
      }
      if(!formData.email){
        setEmailNameError('Enter Email Address')
        setTimeout(() => {
            setEmailNameError()
        }, 2000)
        
        return
      }
      if(!formData.password){
        setPasswordError('Enter Password')
        setTimeout(() => {
            setPasswordError()
        }, 2000)
        
        return
      }
  
      try {
        setLoading(true)
  
        const res = await signup(formData)
        if(res.success){
          setFormData({})
          toast.success(res.data)
          navigate('/verify-otp')
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
      <div className="w-[574px] flex flex-col gap-4">
        {/**INTRO */}
        <div className="flex flex-col gap-[5px]">
          <h3 className="text-text-color-1 text-[30px] medium-pc:text-[24px] font-bold">
            Create an EduAfrica Admin <br /> account
          </h3>
  
          <p className=" text-[16px] font-normal text-text-color-2">Get started to management of your student, instructor and organization</p>
        </div>
  
        {/**BODY */}
        <div className="flex flex-col gap-[5px]">
          <div className="inputGroup">
            <label className="label">First name*</label>
            <input type="text" id="firstName" onChange={handleChange} className="input" placeholder="samad" />
            <p className="font-medium text-error text-[13px]">{firstNameError}</p>
          </div>
          <div className="inputGroup">
            <label className="label">Last name*</label>
            <input type="text" id="lastName" onChange={handleChange} className="input" placeholder="opabode" />
            <p className="font-medium text-error text-[13px]">{lastNameError}</p>
          </div>
          <div className="inputGroup">
            <label className="label">Email*</label>
            <input type="text" id="email" onChange={handleChange} className="input" placeholder="samadopabode@gmail.com" />
            <p className="font-medium text-error text-[13px]">{emailError}</p>
          </div>
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

        </div>
  
        {/**BUTTON */}
        {
          loading ? (
            <LoadingBtn />
          ) : (
            <Button disabled={loading} onCLick={handleSignin} text={'Get Started'} />
          )
        }
  
  
        <Link to={`/`} className="text-xs font-semibold text-[#4B5565]">Already have an account? <span className="font-bold text-primary-color">Sign in</span></Link>
  
      </div>
    )
}

export default SignupCard
