import Navbar from "../../Components/Helpers/Navbar"
import Sidebar from "../../Components/Helpers/Sidebar"
import StaffList from "../../Components/StaffUi/StaffList"

function Staffs() {
    return (
        <div className="page relative">
          <div className="fixed w-[257px] h-[100vh] left-0 top-0">
            <Sidebar />
          </div>
    
          <div className="section ml-auto">
            <Navbar />
    
            <div className="w-[97%] m-auto mt-4 tablet:w-full">
              <h2 className="text-off-black text-[30px] font-semibold" >Staffs</h2>

            </div>

            <div className="mt-8 mb-[30px]">
              
            </div>

              <StaffList /> 
    
          </div>
    
        </div>
      )
}

export default Staffs
