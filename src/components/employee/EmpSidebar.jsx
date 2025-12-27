import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBars,
  FaTimes
} from "react-icons/fa";
import "./EmpSidebar.css";

export default function EmpSidebar() {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <>
        {/* Hamburger Button (Mobile) */}
        <button className="hamburger" onClick={() => setOpen(!open)}>
          {open ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`sidebar ${open ? "open" : ""}`}>
          {/* USER PROFILE */}
         <div className="sidebar-user">
         
           {/* PROFILE IMAGE */}
           <img
             src={user?.image || `https://i.pravatar.cc/80?u=${user?.email}`}
             alt="profile"
             className="sidebar-avatar"
           />
         
           {/* ICON ROW */}
           <div className="icon-row">
         
             <div className="icon-box">
               <FaUser/>
               <span className="hover-text">{user?.name || "User Name"}</span>
             </div>
         
             <div className="icon-box">
               <FaEnvelope />
               <span className="hover-text">{user?.email}</span>
             </div>
         
             <div className="icon-box">
               <FaPhone />
               <span className="hover-text">{user?.phone || "No Phone"}</span>
             </div>
         
          
         
           </div>
         </div>

        {/* MENU */}
        <ul className="sidebar-menu">
          <li><Link to="/employeedashboard" onClick={() => setOpen(false)}>Dashboard</Link></li>
          <li><Link to="/apply-leave" onClick={() => setOpen(false)}>Apply Leave</Link></li>
          <li><Link to="/my-attendance" onClick={() => setOpen(false)}>My Attendance</Link></li>
          <li><Link to="/my-payroll" onClick={() => setOpen(false)}>My Payroll</Link></li>
          
         
        </ul>
      </div>
    </>
  );
}
