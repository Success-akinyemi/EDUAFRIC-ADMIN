import SuccessImg from '../../assets/images/success.png'

function SuccessCard({ successMsg, style }) {
  return (
      <div className={`absolute w-[348px] p-6 top-[40px] right-[200px] rounded-[6px] bg-white shadow flex gap-6 items-center ${style}`}>
        <img src={SuccessImg} alt="success" className="w-[44px] h-[44px]" />

        <div className="flex flex-col gap-[1rem]">
          <p className="text-text-color-2 font-semibold text-[16px]">Success</p>

          <p className="text-text-color-2 font-semibold text-[16px] text-primary-color">{successMsg}</p>
        </div>
      </div>
  )
}

export default SuccessCard
