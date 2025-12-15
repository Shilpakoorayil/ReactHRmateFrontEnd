import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import { FaUser, FaEnvelope, FaPhone, FaUsers } from "react-icons/fa";
import '../../../src/style.css';



export default function EmpSidebar() {
  const { user } = useContext(AuthContext);

  return (
    <div className="sidebar">

      {/* ⭐ USER PROFILE BOX */}
      <div className="sidebar-user">
        <img
          src={user?.image ? user.image : `https://i.pravatar.cc/60?u=${user?.email}`}
          alt="profile"
          className="sidebar-avatar"
        />

     
<div className="sidebar-user-info">

  {/* NAME */}
  <div className="info-item">
    <FaUser className="icon" />
    <span className="tooltip">{user?.name || "User Name"}</span>
  </div>

  {/* EMAIL */}
  <div className="info-item">
    <FaEnvelope className="icon" />
    <span className="tooltip">{user?.email}</span>
  </div>

  {/* PHONE */}
  <div className="info-item">
    <FaPhone className="icon" />
    <span className="tooltip">{user?.phone || "No Phone"}</span>
  </div>

  {/* TEAM */}
 <div className="info-item">
   <Link to="/teams">
  <FaUsers className="icon" />
 
    <span className="tooltip">{user?.team || user?.department || "Team"}</span>
  </Link>
</div>


</div>




      </div>

      {/*  MENU ITEMS */}
     <ul className="sidebar-menu">
  <li><Link to="/employeedashboard">Dashboard</Link></li>
  <li><Link to="/employees">Employees</Link></li>
  <li><Link to="/attendance">Attendance</Link></li>
  <li><Link to="/payroll">Payroll</Link></li>
  
  <li><Link to="/empsettings">Settings</Link></li>
</ul>


    </div>
  );
}
