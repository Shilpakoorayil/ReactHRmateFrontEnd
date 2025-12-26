import React, { useContext, useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUsers,
  FaBars,
  FaTimes
} from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar() {
  const { user,dark } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
   useEffect(()=>{
      if(dark) document.documentElement.classList.add('dark')
      else document.documentElement.classList.remove('dark')
    },[dark])

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
              <FaUser />
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

            <Link to="/teams" className="icon-box">
              <FaUsers />
              <span className="hover-text">
                {user?.team || user?.department || "Team"}
              </span>
            </Link>

          </div>
        </div>




        {/* MENU */}
        <ul className="sidebar-menu">
          <li><Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link></li>
          <li><Link to="/employees" onClick={() => setOpen(false)}>Employees</Link></li>
          <li><Link to="/attendance" onClick={() => setOpen(false)}>Attendance</Link></li>
          <li><Link to="/leaveapproval" onClick={() => setOpen(false)}>Leave</Link></li>


          {user?.role === "admin" && (
            <li><Link to="/payroll" onClick={() => setOpen(false)}>Payroll</Link></li>

          )}
         {user?.role === "admin" && (
            <li><Link to="/settings" onClick={() => setOpen(false)}>Settings</Link></li>

          )}




        </ul>
      </div>
    </>
  );
}
