import React, { useContext } from 'react'

import { AuthContext } from "../../context/AuthContext";

import Topbar from '../../components/admin/Topbar';
import EmpSidebar from '../../components/employee/empSidebar';


export default function EmpSettings(){
  const { dark, toggleDark } = useContext(AuthContext)
  return (
    <div className='app'>
      <EmpSidebar/>
      <div className='main'>
     <Topbar/>
        <div className='card'>
          <h3>Settings</h3>
          <div style={{display:'flex',gap:12,alignItems:'center'}}>
            <label>Dark Mode</label>
            <button className='btn' onClick={toggleDark}>{dark? 'Disable':'Enable'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
