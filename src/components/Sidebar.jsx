import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar(){
  return (
    <aside className='sidebar'>
      <div className='brand'>
        <div className='logo'>HRMate</div>
      </div>

      <nav>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/employees'>Employees</Link>
        <Link to='/attendance'>Attendance</Link>
        <Link to='/payroll'>Payroll</Link>
        <Link to='/settings'>Settings</Link>
      </nav>
    </aside>
  )
}
