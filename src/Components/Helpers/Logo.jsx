import LogoImg from '../../assets/images/logo.png'
function Logo({ imgStyle, textStyle, style }) {
  return (
    <div className={`flex items-center gap-[25.05px] ${style}`}>
      <img alt='logo' src={LogoImg} className={`w-[102.59px] ${imgStyle}`} />
      <h1 className={` font-bold ${textStyle ? textStyle : `text-[36px]` }`}>EduAfrica</h1>
    </div>
  )
}

export default Logo
