import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { Link } from 'react-router-dom'

export default function Employees(){
  const [employees, setEmployees] = useState([])

  useEffect(()=>{
    fetch('http://localhost:5500/employees')
      .then(r => r.json())
      .then(setEmployees)
      .catch(()=>{})
  },[])

  return (
    <div className='app'>
      <Sidebar/>
      <div className='main'>
        <Topbar/>

        <div className='card'>
          <h3>Employees</h3>

          <table className='table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {employees.map(e => (
                <tr key={e.id}>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.role}</td>

                  <td>
                    {/* FIXED — no page reload */}
                    <Link to={`/employee/${e.id}`}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  )
}
