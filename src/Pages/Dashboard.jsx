import SalesReport from "../Components/DashboardUi/SalesReport"
import Stats from "../Components/DashboardUi/Stats"
import TopCourse from "../Components/DashboardUi/TopCourse"
import Navbar from "../Components/Helpers/Navbar"
import Sidebar from "../Components/Helpers/Sidebar"

function Dashboard() {
  return (
    <div className="page relative">
      <div className="fixed w-[257px] h-[100vh] left-0 top-0">
        <Sidebar />
      </div>

      <div className="section ml-auto">
        <Navbar />

        <div className="w-[97%] m-auto mt-4 tablet:w-full flex flex-col gap-[30px]">
          <h2 className="text-off-black text-[30px] font-semibold" >Dashboard</h2>

          <div className="flex flex-col gap-6">
            <Stats />

            <SalesReport />
          </div>

          <TopCourse />


        </div>


      </div>

    </div>
  )
}

export default Dashboard
