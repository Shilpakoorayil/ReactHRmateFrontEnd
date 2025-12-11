import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Topbar(){
  const { user, logout, dark } = useContext(AuthContext)
  useEffect(()=>{
    if(dark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  },[dark])
  return (
    <header className='topbar'>
      <div className='left'>HRMate Advanced</div>
      <div className='right'>
        {user ? <><span className='muted'>{user.email}</span><button className='btn' onClick={logout}>Logout</button></> : null}
      </div>
    </header>
  )
}
