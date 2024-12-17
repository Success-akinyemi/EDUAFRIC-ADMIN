import { useState } from "react"
import Logo from "../Components/Helpers/Logo"
import PhoneImg from '../assets/images/phone.png'
import ErrorImg from '../assets/images/error.png'

function ResetPasswordSent() {
    const [ errorCard, setErrorCard ] = useState()
    return (
      <div className="relative flex items-center justify-center w-[100vw] h-[100vh]">
        
        <div className="w-[60%] flex items-center justify-center flex-col gap-32">
          <div className="w-[574px]">
              <div className="mb-12 w-full">
              <Logo imgStyle={'w-[90px]'} textStyle={`text-primary-color text-[36px]`} />
      
              </div>

                <div className="w-[574px] flex flex-col gap-16">
                    {/**INTRO */}
                    <div className="flex flex-col gap-[10px]">
                        <h3 className="text-text-color-1 text-[30px] font-bold">Reset Password Email Sent</h3>

                        <p className="text-[16px] font-normal text-text-color-2">
                            Reset password link sent to email address. <br />
                            check email address.
                        </p>
                    </div>
                </div>
          
          </div>

        </div>
  
        <div className="w-[40%] h-full flex items-center justify-center bg-gradient-to-bl from-[#FFE500] to-[#00BF63]">
  
          <img alt="signin page" src={PhoneImg} className="w-[45%]" />
  
        </div>
  
        {/**Error Card */}
        {
          errorCard && (
            <div className="absolute w-[348px] p-6 top-[40px] right-[200px] rounded-[6px] bg-white shadow flex gap-6 items-center">
              <img src={ErrorImg} alt="error" className="w-[44px] h-[44px]" />
  
              <div className="flex flex-col gap-[1rem]">
                <p className="text-text-color-2 font-semibold text-[16px]">Error</p>
  
                <p className="text-text-color-2 font-semibold text-[16px]">{errorCard}</p>
              </div>
            </div>
          )
        }
  
      </div>
    )
}

export default ResetPasswordSent
