import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, AuthContext } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import AddEmployee from './pages/AddEmployee'
import EditEmployee from './pages/EditEmployee'
import Payroll from './pages/Payroll'
import Attendance from './pages/Attendance'
import EmployeeProfile from './pages/EmployeeProfile'
import Settings from './pages/Settings'

function PrivateRoute({ children, roles }){
  const { user } = useContext(AuthContext)
  if(!user) return <Navigate to='/login' />
  if(roles && roles.length>0 && !roles.includes(user.role)) return <Navigate to='/' />
  return children
}

export default function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
          <Route path='/employees' element={<PrivateRoute roles={['admin','manager']}><Employees/></PrivateRoute>}/>
          <Route path='/add-employee' element={<PrivateRoute roles={['admin']}><AddEmployee/></PrivateRoute>}/>
          <Route path='/edit-employee/:id' element={<PrivateRoute roles={['admin','manager']}><EditEmployee/></PrivateRoute>}/>
          <Route path='/payroll' element={<PrivateRoute roles={['admin']}><Payroll/></PrivateRoute>}/>
          <Route path='/attendance' element={<PrivateRoute><Attendance/></PrivateRoute>}/>
          <Route path='/employee/:id' element={<PrivateRoute><EmployeeProfile/></PrivateRoute>}/>
          <Route path='/settings' element={<PrivateRoute roles={['admin']}><Settings/></PrivateRoute>}/>
          <Route path='/' element={<Navigate to='/dashboard'/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
