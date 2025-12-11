import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

export default function Payroll(){
  const [runs, setRuns] = useState([])
  useEffect(()=>{ fetch('http://localhost:5500/payrolls').then(r=>r.json()).then(setRuns).catch(()=>{}) },[])
  return (
    <div className='app'>
      <Sidebar/>
      <div className='main'>
        <Topbar/>
        <div className='card'>
          <h3>Payroll Runs</h3>
          <table className='table'>
            <thead><tr><th>Run</th><th>Date</th><th>Status</th></tr></thead>
            <tbody>{runs.map(r=> <tr key={r.id}><td>{r.name}</td><td>{r.date}</td><td>{r.status}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
