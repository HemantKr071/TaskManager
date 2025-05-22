import { useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import './App.css'
import { UserDashboard } from './pages/User/UserDashboard'
import TaskDetails from './components/TaskDetails'

function App() {


  return (
    <>
     
      <BrowserRouter>
         <Routes>
           
           <Route path = '/login' element={<Login/>} />
           <Route path = '/signup' element={<SignUp/>} />
          
           <Route path = '/' element={<UserDashboard/>} />
          <Route path="/tasks/:id" element={<TaskDetails />} />

         </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App
