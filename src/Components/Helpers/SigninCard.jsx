import { useState } from "react"
import Button from "./Button"
import { signin } from "../../Helpers/apis"
import LoadingBtn from "./LoadingBtn"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { signInSuccess } from "../../Redux/User/adminSlice"
import toast from "react-hot-toast"

function SigninCard({ setErrorCard }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [ nameError, setNameError ] = useState()
  const [ authError, setAuthError ] = useState()
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
    if(!formData.name){
      setNameError('Enter Email or Staff Id')
      setTimeout(() => {
        setNameError()
      }, 2000)

      return
    }
    if(!formData.password){
      setAuthError('Enter Password')
      setTimeout(() => {
        setAuthError()
      }, 2000)
      
      return
    }

    try {
      setLoading(true)

      const res = await signin(formData)
      if(res.isVerified === false && res.success === false){
        toast.error(res.data)
        navigate('/verify-otp')
      }
      if(res.success){
        localStorage.setItem('edtechafricauth', res.token)
        dispatch(signInSuccess(res?.data))
        setFormData({})
        navigate('/dashboard')
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

        <p className=" text-[16px] font-normal text-text-color-2">Sign in with Staff ID or Email Address</p>
      </div>

      {/**BODY */}
      <div className="flex flex-col gap-5">
        <div className="inputGroup">
          <label className="label">StaffID* or Email*</label>
          <input type="text" id="name" onChange={handleChange} className="input" placeholder="samadopabode@gmail.com" />
          <p className="font-medium text-error text-[13px]">{nameError}</p>
        </div>
        <div className="inputGroup">
          <label className="label">Password*</label>
          <div className="relative w-full">
            <input type={ showPassword ? 'text' : 'password' } id="password" onChange={handleChange} className="input" placeholder="samamd" />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" onClick={toggleShowPassword}>
              { showPassword ? 'hide' : 'show'}
            </span>
          </div>
          <p className="font-medium text-error text-[13px]">{authError}</p>
          <Link to={`/forgot-password`} className="text-sm font-normal text-error text-[14px]">Forgot password</Link>
        </div>
      </div>

      {/**BUTTON */}
      {
        loading ? (
          <div className="full">
            <LoadingBtn style={`w-full`} />
          </div>
        ) : (
          <Button disabled={loading} onCLick={handleSignin} text={'Sign in'} />
        )
      }


      <Link to={`/signup`} className="text-xs font-semibold text-[#4B5565]">You don’t have an account? <span className="font-bold text-primary-color">Become an EduAfrica Amin</span></Link>

    </div>
  )
}

export default SigninCard
