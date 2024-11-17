import { Toaster } from 'react-hot-toast'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signin from './Pages/Signin'
import Dashboard from './Pages/Dashboard'
import Students from './Pages/Student/Students'
import Instructors from './Pages/Instructors/Instructors'
import Organizations from './Pages/Organizations'
import Course from './Pages/Course'
import Messages from './Pages/Messages'
import CMS from './Pages/CMS'
import Advert from './Pages/Advert'
import Settings from './Pages/Settings'
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

function App() {
  const [ selectedCard, setSelectedCard ] = useState(null)
  const [ popupBg, setPopupBg ] = useState(false)

  const renderPopup = () => {
    switch(selectedCard){
      case 'rejectCourseModal' : 
        return (
          <div>
            <RejectCourseModal setSelectedCard={setSelectedCard} />
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
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password-sent' element={<ResetPasswordSent />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />


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
            <Route path='/course' element={<Course />} />
          </Route>
          <Route element={<AuthorizeAdmin />} >
            <Route path='/messages' element={<Messages />} />
          </Route>
          <Route element={<AuthorizeAdmin />} >
            <Route path='/cms' element={<CMS />} />
          </Route>
          <Route element={<AuthorizeAdmin />} >
            <Route path='/advert' element={<Advert />} />
          </Route>
          <Route element={<AuthorizeAdmin />} >
            <Route path='/settings' element={<Settings />} />
          </Route>


        {/**DEMO */}
        <Route path='/demo/chat' element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
