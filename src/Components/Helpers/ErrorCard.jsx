import ErrorImg from '../../assets/images/error.png'

function ErrorCard({ errorMsg, style }) {
  return (
      <div className={`absolute w-[348px] p-6 top-[40px] right-[200px] rounded-[6px] bg-white shadow flex gap-6 items-center ${style}`}>
        <img src={ErrorImg} alt="error" className="w-[44px] h-[44px]" />

        <div className="flex flex-col gap-[1rem]">
          <p className="text-text-color-2 font-semibold text-[16px]">Error</p>

          <p className="text-text-color-2 font-semibold text-[16px] text-error">{errorMsg}</p>
        </div>
      </div>
  )
}

export default ErrorCard
