
function Button({ onCLick, style, text, disabled }) {
  return (
    <button onClick={onCLick} disabled={disabled} className={`bg-primary-color cursor-pointer hover:bg-primary-color-2 text-white text-center flex items-center justify-center border-[1px] border-primary-color-2 rounded-[8px] py-[10px] px-[18px] ${style ? style : ''}`}>
      {text}
    </button>
  )
}

export default Button
