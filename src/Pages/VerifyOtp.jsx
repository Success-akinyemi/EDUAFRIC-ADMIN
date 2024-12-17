import { useState } from "react"
import Logo from "../Components/Helpers/Logo"
import PhoneImg from '../assets/images/phone.png'
import ErrorImg from '../assets/images/error.png'
import VerifyOtpCard from "../Components/Helpers/VerifyOtpCard"

function VerifyOtp() {
  const [ errorCard, setErrorCard ] = useState()
  return (
    <div className="relative flex items-center justify-center w-[100vw] h-[100vh]">
      
      <div className="w-[60%] flex items-center justify-center flex-col">
        <div className="w-[574px]">
          <div className="mb-12 w-full">
            <Logo imgStyle={'w-[90px]'} textStyle={`text-primary-color text-[36px]`} />

          </div>
          
          {/**CARD HERE */}
          <VerifyOtpCard setErrorCard={setErrorCard} />
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

export default VerifyOtp
