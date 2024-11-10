import { useState } from "react";
import Navbar from "../Components/Helpers/Navbar"
import Sidebar from "../Components/Helpers/Sidebar"
import Stats from "../Components/StudentUi/Stats"
import StudentList from "../Components/StudentUi/StudentList"

function Students() {
  const [timeDate, setTimeDate] = useState();

    return (
        <div className="page relative">
          <div className="fixed w-[257px] h-[100vh] left-0 top-0">
            <Sidebar />
          </div>
    
          <div className="section ml-auto">
            <Navbar />
    
            <div className="w-[97%] m-auto mt-4 tablet:w-full">
              <h2 className="text-off-black text-[30px] font-semibold" >Students</h2>

              <div className="mt-8 mb-[30px]">
                <Stats />
              </div>

              <StudentList timeDate={timeDate} setTimeDate={setTimeDate} />
    
            </div>
    
    
          </div>
    
        </div>
      )
}

export default Students
