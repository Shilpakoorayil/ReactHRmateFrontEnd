import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const [dark, setDark] = useState(false)

  useEffect(()=>{
    const u = localStorage.getItem('loggedInUser')
    const d = localStorage.getItem('hrmate_dark')
    if(u) setUser(JSON.parse(u))
    if(d==='1') setDark(true)
  },[])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('loggedInUser', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('loggedInUser')
  }

  const toggleDark = () => {
    setDark(v=>{ const nv=!v; localStorage.setItem('hrmate_dark', nv? '1':'0'); return nv })
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, dark, toggleDark }}>
      {children}
    </AuthContext.Provider>
  )
}
