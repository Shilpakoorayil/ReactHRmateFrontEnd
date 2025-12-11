import React, { useEffect, useState, useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { AuthContext } from '../context/AuthContext'

export default function Attendance(){
  const { user } = useContext(AuthContext)
  const [logs, setLogs] = useState([])
  useEffect(()=>{ fetch('http://localhost:5500/attendance').then(r=>r.json()).then(setLogs).catch(()=>{}) },[])

  const checkIn = async ()=>{
    const payload={ userId: user?.id||0, action:'in', time: new Date().toISOString() }
    await fetch('http://localhost:5500/attendance',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
    setLogs(l=>[...l,payload])
  }

  return (
    <div className='app'>
      <Sidebar/>
      <div className='main'>
        <Topbar/>
        <div className='card'>
          <h3>Attendance</h3>
          <p>Signed in as: {user?.email}</p>
          <button className='btn primary' onClick={checkIn}>Check In</button>
          <table className='table'><thead><tr><th>User</th><th>Action</th><th>Time</th></tr></thead>
            <tbody>{logs.map((l,i)=><tr key={i}><td>{l.userId}</td><td>{l.action}</td><td>{l.time}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
