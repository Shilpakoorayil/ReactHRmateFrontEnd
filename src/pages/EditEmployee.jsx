import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function EditEmployee(){
  const { id } = useParams()
  const nav = useNavigate()
  const [form, setForm] = useState({name:'', email:'', role:''})
  useEffect(()=>{ fetch(`http://localhost:5500/employees/${id}`).then(r=>r.json()).then(setForm).catch(()=>{}) },[id])
  const save = async ()=>{ await fetch(`http://localhost:5500/employees/${id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(form) }); nav('/employees') }
  return (
    <div className='center'>
      <div className='card small'>
        <h3>Edit Employee</h3>
        <input placeholder='Name' value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
        <input placeholder='Email' value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
        <input placeholder='Role' value={form.role} onChange={e=>setForm({...form,role:e.target.value})}/>
        <button className='btn primary' onClick={save}>Save</button>
      </div>
    </div>
  )
}
