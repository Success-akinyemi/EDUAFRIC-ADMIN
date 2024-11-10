import { Toaster } from 'react-hot-toast'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signin from './Pages/Signin'
import Dashboard from './Pages/Dashboard'
import Students from './Pages/Students'
import Instructors from './Pages/Instructors'
import Organizations from './Pages/Organizations'
import Course from './Pages/Course'
import Messages from './Pages/Messages'
import CMS from './Pages/CMS'
import Advert from './Pages/Advert'
import Settings from './Pages/Settings'
import { AuthorizeAdmin } from './Auth/ProtectRoute'

function App() {
  return (
    <div className="app bg-main-bg">
      <Toaster position='top-center'></Toaster>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signin />} />

          <Route element={<AuthorizeAdmin />} >
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
          <Route element={<AuthorizeAdmin />} >
            <Route path='/students' element={<Students />} />
          </Route>
          <Route element={<AuthorizeAdmin />} >
            <Route path='/instructors' element={<Instructors />} />
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
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
