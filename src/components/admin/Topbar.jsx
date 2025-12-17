import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import './Topbar.css'

export default function Topbar(){
  const { user, logout, dark } = useContext(AuthContext)
  useEffect(()=>{
    if(dark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  },[dark])
  return (


    <header className="topbar">
  <div className="left">
    <span className="logo" >  HRMatrix</span>
  </div>

  <div className="right">
    {user && (
      <>
        <span className="user-email">{user.email}</span>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </>
    )}
  </div>
</header>

  )
}
