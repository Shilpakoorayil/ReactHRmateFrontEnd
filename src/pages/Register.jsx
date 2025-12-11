import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')
  const [role, setRole] = useState('employee')
  const navigate = useNavigate()

  const handleRegister = async () => {
    const payload = { email, password, role }
    await fetch('http://localhost:5500/users', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(payload)
    })
    alert('Registered. Now login.')
    navigate('/login')
  }

  return (
    <div className='center'>
      <div className='card small'>
        <h2>Register</h2>
        <input placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder='Password' type='password' value={password} onChange={e=>setPass(e.target.value)} />
        <select value={role} onChange={e=>setRole(e.target.value)}>
          <option value='employee'>Employee</option>
          <option value='manager'>Manager</option>
          <option value='admin'>Admin</option>
        </select>
        <button onClick={handleRegister} className='btn primary'>Register</button>
      </div>
    </div>
  )
}
