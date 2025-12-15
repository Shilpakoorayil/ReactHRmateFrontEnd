import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Login() {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    console.log('test');

    try {
      console.log('test2');
      // const handleLogin = async () => {
        const res = await fetch(`http://localhost:5500/users?email=${email}`);

        const data = await res.json();
        console.log("res", data)

        if (data.length > 0 && data[0].password === password) {
          login(data[0]); // save user in context

          if (data[0].role === "admin") navigate("/admin/dashboard");
          else if (data[0].role === "hr") navigate("/hr/hrdashboard");
          else navigate("/employee/employeedashboard");

        } else {
          alert("Invalid credentials");
        }
      }catch (e) {
      console.error(e)
      alert('Server not running (run: npm run start:json)')
    }
  }

  return (
    <div className='center'>
      <div className='card small'>
        <h2>Login</h2>
        <input placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder='Password' type='password' value={password} onChange={e => setPass(e.target.value)} />
        <button onClick={handleLogin} className='btn primary'>Login</button>
      </div>
    </div>
  )
}
