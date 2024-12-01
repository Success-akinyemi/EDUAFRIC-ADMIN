import { Toaster } from 'react-hot-toast'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signin from './Pages/Signin'
import Dashboard from './Pages/Dashboard'
import Students from './Pages/Student/Students'
import Instructors from './Pages/Instructors/Instructors'
import Organizations from './Pages/Organizations/Organizations'
import Course from './Pages/Course/Course'
import Messages from './Pages/Messages'
import CMS from './Pages/CMS/CMS'
import Advert from './Pages/Advert'
import Profile from './Pages/Profile'
import { AuthorizeAdmin } from './Auth/ProtectRoute'
import StudentDetails from './Pages/Student/StudentDetails'
import Chat from './Demo/Chat'
import OrderInfo from './Pages/Student/OrderInfo'
import InstructorDetails from './Pages/Instructors/InstructorDetails'
import CourseInfo from './Pages/Instructors/CourseInfo'
import ForgotPassword from './Pages/ForgotPassword'
import ResetPassword from './Pages/ResetPassword'
import ResetPasswordSent from './Pages/ResetPasswordSent'
import { useEffect, useState } from 'react'
import RejectCourseModal from './Modals/RejectCourseModal'
import BlockCourseModal from './Modals/BlockCourseModal'
import FileUpload from './Demo/FileUpload'
import PasswordSuccess from './Pages/PasswordSuccess'
import Signup from './Pages/Signup'
import VerifyOtp from './Pages/VerifyOtp'
import OrganizationDetails from './Pages/Organizations/OrganizationDetails'
import OrganizationCourseInfo from './Pages/Organizations/OrganizationCourseInfo'
import CoursesInfo from './Pages/Course/CoursesInfo'
import Staffs from './Pages/Staffs/Staffs'
import Settings from './Pages/Settings'
import UpdateCountry from './Modals/UpdateCountry'
import StaffInfo from './Pages/Staffs/StaffInfo'
import ApproveAdmin from './Modals/ApproveAdmin'
import EditStaff from './Modals/EditStaff'
import EditCMS from './Pages/CMS/EditCMS'
import DeleteCms from './Modals/DeleteCms'
import AddCouponCode from './Modals/AddCouponCode'

function App() {
  const [ selectedCard, setSelectedCard ] = useState(null)
  const [ countryId, setCountryId ] = useState()
  const [ adminStaffId, setAdminStaffId ] = useState()
  const [ cmsId, setCmsId ] = useState()

  const renderPopup = () => {
    switch(selectedCard){
      case 'rejectCourseModal' : 
        return (
          <div>
            <RejectCourseModal setSelectedCard={setSelectedCard} />
          </div>
        ) 
      case 'blockCourseModal':
        return (
          <div>
            <BlockCourseModal setSelectedCard={setSelectedCard} />
          </div>
        )
      case 'updateCountry': 
        return (
          <div>
            <UpdateCountry countryId={countryId} setCountryId={setCountryId} setSelectedCard={setSelectedCard} />
          </div>
        )
      case 'approveAdmin':
        return (
          <div>
            <ApproveAdmin setAdminStaffId={setAdminStaffId} adminStaffId={adminStaffId} setSelectedCard={setSelectedCard} />
          </div>
        )
      case 'editStaff': 
        return (
          <div>
            <EditStaff setAdminStaffId={setAdminStaffId} adminStaffId={adminStaffId} setSelectedCard={setSelectedCard} />
          </div>
        )
      case 'deleteCms':
        return (
          <div>
            <DeleteCms cmsId={cmsId} setCmsId={setCmsId} setSelectedCard={setSelectedCard} />
          </div>
        )
      case 'addCouponCode':
        return (
          <div>
            <AddCouponCode />
          </div>
        )
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains('popup-overlay')) {
        setSelectedCard(null);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const closePopup = () => {
    setSelectedCard(null);
  };

  return (
    <div className="app bg-main-bg">
                {
            selectedCard && (
              <>
                <div className='popup-overlay z-40 fixed flex items-center justify-center top-0 left-0 w-[100vw] h-[100vh] bg-[#A59B9B4D] '>
                  <div className={`z-50 w-[551px] bg-white shadow-xl rounded-[12px] p-4`}>
                    <div className='w-full'>
                        {renderPopup()}
                    </div>
                  </div>
                </div>
              </>
            )
          }
      <Toaster position='top-center'></Toaster>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/verify-otp' element={<VerifyOtp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password-sent' element={<ResetPasswordSent />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />
          <Route path='/success' element={<PasswordSuccess />} />

          <Route element={<AuthorizeAdmin />} >
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
          <Route element={<AuthorizeAdmin />} >
            <Route path='/students' element={<Students />} />
          </Route>
          <Route element={<AuthorizeAdmin />} >
            <Route path='/student/:id' element={<StudentDetails />} />
          </Route>
          <Route element={<AuthorizeAdmin />} >
            <Route path='/order/:id' element={<OrderInfo />} />
          </Route>
          <Route element={<AuthorizeAdmin />} >
            <Route path='/instructors' element={<Instructors />} />
          </Route>
          <Route element={<AuthorizeAdmin />} >
            <Route path='/instructor/:id' element={<InstructorDetails />} />
          </Route>
          <Route element={<AuthorizeAdmin />} >
            <Route path='/instructor-course-info/:id' element={<CourseInfo setSelectedCard={setSelectedCard} />} />
          </Route>
          <Route element={<AuthorizeAdmin />} >
            <Route path='/Organizations' element={<Organizations />} />
          </Route>
          <Route element={<AuthorizeAdmin />} >
            <Route path='/organizations/:id' element={<OrganizationDetails />} />
          </Route>
          <Route element={<AuthorizeAdmin />} >
            <Route path='/organization-course-info/:id' element={<OrganizationCourseInfo setSelectedCard={setSelectedCard} />} />
          </Route>
          <Route element={<AuthorizeAdmin />} >
            <Route path='/course' element={<Course />} />
          </Route>
          <Route element={<AuthorizeAdmin />} >
            <Route path='/course-info/:id' element={<CoursesInfo setSelectedCard={setSelectedCard} />} />
          </Route>
          <Route element={<AuthorizeAdmin />} >
            <Route path='/messages' element={<Messages />} />
          </Route>
          <Route element={<AuthorizeAdmin />} >
            <Route path='/cms' element={<CMS setSelectedCard={setSelectedCard} setCmsId={setCmsId} />} />
          </Route>
          <Route element={<AuthorizeAdmin />} >
            <Route path='/edit-cms/:id' element={<EditCMS />} />
          </Route>
          <Route element={<AuthorizeAdmin />} >
            <Route path='/advert' element={<Advert />} />
          </Route>
          <Route element={<AuthorizeAdmin />} >
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route element={<AuthorizeAdmin />} >
            <Route path='/staffs' element={<Staffs setSelectedCard={setSelectedCard} setAdminStaffId={setAdminStaffId} />} />
          </Route>
          <Route element={<AuthorizeAdmin />} >
            <Route path='/staff-info/:id' element={<StaffInfo setSelectedCard={setSelectedCard} setAdminStaffId={setAdminStaffId} />} />
          </Route>
          <Route element={<AuthorizeAdmin />} >
            <Route path='/settings' element={<Settings setCountryId={setCountryId} setSelectedCard={setSelectedCard} />} />
          </Route>


        {/**DEMO */}
        <Route path='/demo/chat' element={<Chat />} />
        <Route path='/demo/file-upload' element={<FileUpload />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
