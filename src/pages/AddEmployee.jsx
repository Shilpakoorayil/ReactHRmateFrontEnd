import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import '../style.css';

export default function AddEmployee() {

  const [form, setForm] = useState({
    name: '',
    email: '',
    designation: '',
    department: '',
    isNew: true,
    resigned: false
  });

  const nav = useNavigate();

  const save = async () => {

    //  NAME VALIDATION (no numbers allowed)
    const nameRegex = /^[A-Za-z ]+$/;
    if (!nameRegex.test(form.name)) {
      alert("Name should contain only letters (no numbers).");
      return;
    }

    // EMAIL VALIDATION
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("Invalid email format.");
      return;
    }

    // Empty validation
    if (!form.name || !form.email || !form.designation) {
      alert("Please fill all required fields.");
      return;
    }

    await fetch('http://localhost:5500/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    nav('/employees');
  }

  return (
    <div className="app">
      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* RIGHT CONTENT */}
      <div className="main">
        {/* TOP BAR */}
        <Topbar />

        <div className='center'>
          <div className='card small'>
            <h3>Add Employee</h3>

            {/* NAME INPUT */}
            <input
              placeholder='Name'
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />

            {/* EMAIL INPUT */}
            <input
              placeholder='Email'
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />

            {/* Designation INPUT */}
            <select
              value={form.designation}
              onChange={e => setForm({ ...form, designation: e.target.value })}
            >
              <option value="">Select Designation</option>
              <option value="HR Manager">HR Manager</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Team Lead">Team Lead</option>
              <option value="Accountant">Accountant</option>
              <option value="Intern">Intern</option>
            </select>


            {/* DEPARTMENT INPUT */}
            <select
              value={form.department}
              onChange={e => setForm({ ...form, department: e.target.value })}

            >
              <option value="">Select Department</option>
              <option value="HR">HR</option>
              <option value="IT">IT</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Operations">Operations</option>
            </select>


            <button className='btn primary' onClick={save}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
