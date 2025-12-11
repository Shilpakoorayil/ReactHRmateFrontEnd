import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddEmployee(){
  const [form, setForm] = useState({name:'', email:'', role:''})
  const nav = useNavigate()
  const save = async ()=>{
    await fetch('http://localhost:5500/employees',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)})
    nav('/employees')
  }
  return (
    <div className='center'>
      <div className='card small'>
        <h3>Add Employee</h3>
        <input placeholder='Name' value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
        <input placeholder='Email' value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
        <input placeholder='Role' value={form.role} onChange={e=>setForm({...form,role:e.target.value})}/>
        <button className='btn primary' onClick={save}>Save</button>
      </div>
    </div>
  )
}
