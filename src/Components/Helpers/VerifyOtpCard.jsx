import { useState, useRef } from "react";
import LoadingBtn from "./LoadingBtn";
import Button from "./Button";
import { verifyOtp } from "../../Helpers/apis";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function VerifyOtpCard({ setErrorCard }) {
    const navigate = useNavigate()
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [isCompleted, setIsCompleted] = useState(false);
    const inputRefs = useRef([]);
  
    const handleChange = (value, index) => {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
  
      if (value.length === 1 && index < 5) {
        // Move to the next input
        inputRefs.current[index + 1].focus();
      }
  
      // Check if all fields are filled
      setIsCompleted(newOtp.every((digit) => digit !== ""));
    };
  
    const handleKeyDown = (e, index) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
  
        if (index > 0) {
          // Move to the previous input
          inputRefs.current[index - 1].focus();
        }
        setIsCompleted(false);
      }
    };
  
    const handlePaste = (e) => {
      const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
      const newOtp = [...otp];
      pastedData.forEach((char, index) => {
        if (index < 6) {
          newOtp[index] = char;
        }
      });
      setOtp(newOtp);
  
      if (pastedData.length === 6) {
        setIsCompleted(true);
      }
    };

    const [ loading, setLoading ] = useState(false)
  
    const handleSubmit = async () => {
      if(!isCompleted){
        setErrorCard('Enter correct code')
        setTimeout(() => {
            setErrorCard()
        }, 2000)

        return
      }

      try {
            setLoading(true)
          const res = await verifyOtp({ otp: `${otp.join("")}` })
          if(res.success){
            toast.success(res.data)
            navigate('/success')
          } else {
            toast.error(res.data)
          }
      } catch (error) {
        
      } finally {
        setLoading(false)
      }
    };

  return (
    <div className="w-[574px] flex flex-col gap-16">
      {/**INTRO */}
      <div className="flex flex-col gap-[10px]">
        <h3 className="text-text-color-1 text-[30px] font-bold">Please enter your verification code</h3>

        <p className=" text-[16px] font-normal text-text-color-2">A 4 digit code has been sent to your email address and phone number. Enter the code to continue</p>
      </div>

      {/**BODY */}
      <div className="flex flex-col gap-5 justify-center items-center">
      <div className="flex gap-2">
        {otp.map((value, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            ref={(el) => (inputRefs.current[index] = el)}
            className={`w-16 h-16 py-[2px] px-[8px] bg-white text-center border-2 text-lg font-semibold rounded-lg focus:outline-none ${
              isCompleted
                ? "border-primary-color"
                : value
                ? "border-error"
                : "border-gray-300"
            }`}
          />
        ))}
      </div>


        {/**BUTTON */}
        {
            loading ? (
                <LoadingBtn />
            ) : (
                <Button onCLick={handleSubmit} disabled={``} text={`Verify`} style={`w-full`} />
            )
        }

      </div>

    </div>
  )
}

export default VerifyOtpCard
