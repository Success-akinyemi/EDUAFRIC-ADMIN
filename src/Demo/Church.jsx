
function Church() {
  return (
    <div className="bg-white flex flex-col min-h-[100vh]">
      <div className="w-full p-3 mb-4">
        <span className="text-blue-800">Return home</span>
      </div>

      <div className="flex flex-col items-center justify-center gap-3">
        <img />
        <h2 className="uppercase font-semibold text-blue-700">
            Holy Ghost Fraternity prayer movement international
        </h2>
        <p className="uppercase text-blue-600 font-light">
            2025 convention (usa)
        </p>
        <p>
            JUNE - JULY
        </p>

        <h3 className="text-blue-600 border-b-[2px] border-b-blue-600 mt-8 font-semibold">Please fill the form below</h3>
        <form className="w-[550px] border flex flex-col gap-5 p-5">
            <div className="flex items-center gap-2 justify-between w-full phone:flex-col">
                <div className="flex flex-col gap-1">
                    <label className="uppercase label" htmlFor="">Full Name</label>
                    <input type="text" name="fullName" id="fullName" className="input" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="uppercase label" htmlFor="">Mailing Address</label>
                    <input type="text" name="mailingaddress" id="mailingaddress" className="input" />
                </div>
            </div>

            <div className="flex items-center gap-2 justify-between phone:flex-col">
                <div className="flex flex-col gap-1">
                    <label className="uppercase label" htmlFor="">TELEPHONE</label>
                    <input type="number" name="telephone" id="telephone" className="input" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="uppercase label" htmlFor="">volunteer</label>
                    <input type="text" name="volunteer" id="volunteer" className="input" />
                </div>
            </div>

            <div className="flex items-center gap-2 justify-between phone:flex-col">
                <div className="flex flex-col gap-1">
                    <label className="uppercase label" htmlFor="">email</label>
                    <input type="email" name="email" id="email" className="input" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="uppercase label" htmlFor="">profession</label>
                    <input type="text" name="fullName" id="fullName" className="input" />
                </div>
            </div>

            <div className="flex items-center gap-2 justify-between phone:flex-col">
                <div className="flex flex-col gap-1">
                    <label className="uppercase label" htmlFor="">gender</label>
                    <select name="gender" id="gender" className="input w-full">
                        <option value="">-- SELECT GENDER --</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="uppercase label" htmlFor="">convention center</label>
                    <input type="text" name="conventioncenter" id="conventioncenter" className="input" />
                </div>
            </div>

            <div className="flex items-center gap-2 justify-between phone:flex-col">
                <div className="flex flex-col gap-1">
                    <label className="uppercase label" htmlFor="">Date of birth</label>
                    <input type="date" name="" id="dob" className="input" />
                </div>
                <div className="flex flex-col gap-1">

                </div>
            </div>           

            <button className="flex items-center justify-center w-full bg-blue-700 text-white py-[10px] px-[15px] outline-none border-none rounded-2xl">
                Register
            </button>

        </form>

      </div>
    </div>
  )
}

export default Church
