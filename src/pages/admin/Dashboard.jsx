import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../../components/admin/Sidebar'
import Topbar from '../../components/admin//Topbar'
import Donut from '../../components/admin/Donut'
import { AuthContext } from '../../context/AuthContext'
import AttandanceChart from "../../components/admin/AttandanceChart";
import './Dashboard.css'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);




export default function Dashboard() {
  const { user } = useContext(AuthContext)

  //  NEW — store employees
  const [employees, setEmployees] = useState([]);
  //  Leaves state
const [leaves, setLeaves] = useState([]);


  // Fetch employees from backend
  useEffect(() => {
    loadEmployees();
   loadLeaves();
  }, []);

  const loadEmployees = () => {
    fetch("http://localhost:5500/employees")
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.log("Error loading employees:", err));
  };
  const loadLeaves = () => {
  fetch("http://localhost:5500/leaves")
    .then(res => res.json())
    .then(data => setLeaves(data))
    .catch(err => console.log("Error loading leaves:", err));
};


  //  Dynamic counts
  const totalEmployees = employees.length;
  const newEmployees = employees.filter(e => e.isNew).length;
  const resignedEmployees = employees.filter(e => e.resigned).length;
  // Attandance
  const presentCount = employees.filter(e => e.status === "Present").length;
  const absentCount = employees.filter(e => e.status === "Absent").length;
  //  Approval status counts

 const pendingLeaves = leaves.filter(l => l.status === "pending");
const rejectedLeaves = leaves.filter(l => l.status === "rejected");

 



const updateApprovalStatus = async (id, status) => {
  await fetch(`http://localhost:5500/employees/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ approvalStatus: status })
  });

  // update UI instantly
  setEmployees(prev =>
    prev.map(e =>
      e.id === id ? { ...e, approvalStatus: status } : e
    )
  );
};



  return (
    <div className='app'>
      <Sidebar />
      <div className='main'>
        <Topbar />

        <section className='dashboard'>
          <div className='hero'>
            <div>
              <p className='greet'>
                Welcome Back {user ? ', ' + user.name : ''}!
              </p>
              <h1>Employee Overview</h1>
            </div>
           
          </div>

          {/*  DYNAMIC CARDS */}
          <div className='cards-row'>
            

            {/* TOTAL EMPLOYEES */}
            <div className='card stat'>
              <div className='icon'>👥</div>
              <div className='value'>
                {totalEmployees}
                <span className='muted'>+5.15%</span>
              </div>
              <div className='label'>Total Employees</div>
            </div>

            {/* JOB APPLICANTS - still static */}
            <div className='card stat'>
              <div className='icon'>🧾</div>
              <div className='value'>
                950 <span className='muted'>+2.05%</span>
              </div>
              <div className='label'>Job Applicants</div>
            </div>

            {/* NEW EMPLOYEES */}
            <div className='card stat'>
              <div className='icon'>➕</div>
              <div className='value'>
                {newEmployees}
                <span className='muted red'>-5.15%</span>
              </div>
              <div className='label'>New Employees</div>
            </div>

            {/* RESIGNED EMPLOYEES */}
            <div className='card stat'>
              <div className='icon'>↩️</div>
              <div className='value'>
                {resignedEmployees}
                <span className='muted'>-2.25%</span>
              </div>
              <div className='label'>Resigned Employees</div>
            </div>




          </div>
          {/* ......................Main Grid............................................................... */}
          <div className='main-grid'>
        
{/* PENDING LEAVES COUNT */}
<div className='card stat'>
  <div className='icon'>⏳</div>
  <div className='value'>
    {pendingLeaves.length}
  </div>
  <div className='label'>Pending Leaves</div>
</div>

{/* REJECTED LEAVES COUNT */}
<div className='card stat'>
  <div className='icon'>❌</div>
  <div className='value'>
    {rejectedLeaves.length}
  </div>
  <div className='label'>Rejected Leaves</div>
</div>






          <div className="panel right">
  <AttandanceChart present={presentCount} absent={absentCount} />
</div>

<div className='panel right'>
  <Donut />
</div>


            {/* ..............................Employee lists....................................... */}
            <div className='panel list'>
              <h3>Employee List</h3>

              <ul className='elist'>
                {employees.length === 0 && <p>No employees found.</p>}

                {employees.map(emp => (
                  <li key={emp.id}>
                    <img
                      src={emp.image ? emp.image : `https://i.pravatar.cc/40?u=${emp.email}`}
                      alt={emp.name}
                    />
                    <div>
                      <strong>{emp.name}</strong>
                      <div className='small'>{emp.role}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>



          </div>




        </section>
      </div>
    </div>
  )
}
