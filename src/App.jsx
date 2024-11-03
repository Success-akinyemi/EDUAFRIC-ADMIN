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

function App() {
  return (
    <div className="app bg-main-bg">
      <Toaster position='top-center'></Toaster>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signin />} />

          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/students' element={<Students />} />
          <Route path='/instructors' element={<Instructors />} />
          <Route path='/Organizations' element={<Organizations />} />
          <Route path='/course' element={<Course />} />
          <Route path='/messages' element={<Messages />} />
          <Route path='/cms' element={<CMS />} />
          <Route path='/advert' element={<Advert />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
