import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, AuthContext } from './context/AuthContext'
import Login from './pages/Login'


import Employees from './pages/Employees'
import AddEmployee from './pages/AddEmployee'
import EditEmployee from './pages/EditEmployee'
import Payroll from './pages/Payroll'
import Attendance from './pages/Attendance'
import EmployeeProfile from './pages/EmployeeProfile'
import Settings from './pages/Settings'
import Teams from './pages/Teams'

import Dashboard from './pages/admin/Dashboard'

import EmployeeDashboard from './pages/employee/EmployeeDashboard'
import EmpSettings from './pages/employee/empSettings'
import ApplyLeave from './pages/employee/ApplyLeave'
import EmpAttendance from './components/employee/EmpAttendance'
import EmployeePayroll from './pages/employee/EmployeePayroll'
import AdminLeaveApproval from './pages/admin/AdminLeaveApproval'


function PrivateRoute({ children, roles }) {
  const { user } = useContext(AuthContext)
  if (!user) return <Navigate to='/login' />
  if (roles && roles.length > 0 && !roles.includes(user.role)) return <Navigate to='/' />
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
         

          <Route path='/employees' element={<PrivateRoute roles={['admin', 'hr']}><Employees /></PrivateRoute>} />
          <Route path='/add-employee' element={<PrivateRoute roles={['admin']}><AddEmployee /></PrivateRoute>} />
          <Route path='/edit-employee/:id' element={<PrivateRoute roles={['admin', 'hr']}><EditEmployee /></PrivateRoute>} />
          <Route path='/payroll' element={<PrivateRoute roles={['admin']}><Payroll /></PrivateRoute>} />
          <Route path='/attendance' element={<PrivateRoute><Attendance /></PrivateRoute>} />
          <Route path='/employee/:id' element={<PrivateRoute><EmployeeProfile /></PrivateRoute>} />

          <Route
            path='/teams'
            element={
              <PrivateRoute roles={['admin', 'hr']}>
                <Teams />
              </PrivateRoute>
            }

          />
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute roles={['admin']}>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/hr/hrdashboard"
            element={
              <PrivateRoute roles={['hr']}>
                <Dashboard />

              </PrivateRoute>
            }
          />

          <Route
            path="/employee/employeedashboard"
            element={
              <PrivateRoute roles={['employee']}>
                <EmployeeDashboard />

              </PrivateRoute>
            }
          />
          <Route
            path="/apply-leave"
            element={
              <PrivateRoute roles={["employee"]}>
                <ApplyLeave />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-payroll"
            element={
              <PrivateRoute roles={["employee"]}>
                <EmployeePayroll />
              </PrivateRoute>
            }
          />
          <Route
            path="/leaveapproval"
            element={
              <PrivateRoute roles={["admin", "hr"]}>
                <AdminLeaveApproval />
              </PrivateRoute>
            }
          />



          <Route path='/settings' element={<PrivateRoute roles={['admin', 'hr']}><Settings /></PrivateRoute>} />
          <Route path='/empsettings' element={<PrivateRoute roles={['employee']}><EmpSettings /></PrivateRoute>} />
          <Route path='/employeedashboard' element={<PrivateRoute roles={['employee']}><EmployeeDashboard /></PrivateRoute>} />
          <Route path='/apply-leave' element={<PrivateRoute roles={['employee']}><ApplyLeave /></PrivateRoute>} />
          <Route path='/my-attendance' element={<PrivateRoute roles={['employee']}><EmpAttendance /></PrivateRoute>} />
          <Route path='/my-payroll' element={<PrivateRoute roles={['employee']}><EmployeePayroll /></PrivateRoute>} />
          <Route path='/dashboard' element={<PrivateRoute roles={['admin', 'hr']}><Dashboard /></PrivateRoute>} />
          <Route path='/' element={<Navigate to='/login' />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
