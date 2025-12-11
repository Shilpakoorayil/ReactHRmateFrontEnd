import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { AuthContext } from '../context/AuthContext'

export default function Settings(){
  const { dark, toggleDark } = useContext(AuthContext)
  return (
    <div className='app'>
      <Sidebar/>
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
