import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from "../components/admin/Sidebar";
import Topbar from '../components/admin/Topbar'

export default function EmployeeProfile(){
  const { id } = useParams()
  const [emp, setEmp] = useState(null)
  useEffect(()=>{ fetch(`http://localhost:5500/employees/${id}`).then(r=>r.json()).then(setEmp).catch(()=>{}) },[id])
  if(!emp) return <div className='center'><div className='card'>Loading...</div></div>
  return (
    <div className='app'>
      <Sidebar/>
      <div className='main'>
        <Topbar/>
        <div className='card'>
          <h3>{emp.name}</h3>
          <p><strong>Email:</strong> {emp.email}</p>
          <p><strong>Role:</strong> {emp.role}</p>
          <p><strong>Bio:</strong> {emp.bio || '—'}</p>
        </div>
      </div>
    </div>
  )
}
