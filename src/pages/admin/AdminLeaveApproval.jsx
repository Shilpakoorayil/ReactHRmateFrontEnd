import React, { useEffect, useState } from "react";
import "./AdminLeaveApproval.css";
import Sidebar from '../../components/admin/Sidebar'
import Topbar from '../../components/admin//Topbar'

export default function AdminLeaveApproval() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = async () => {
    const res = await fetch("http://localhost:5500/leaves");
    const data = await res.json();
    setLeaves(data);
  };

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5500/leaves/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    loadLeaves();
  };

  return (
       <div className='app'>
          <Sidebar />
          <div className='main'>
            <Topbar />
    <div className="leave-container">
      <h2>Leave Approval</h2>

      <table className="leave-table">
        <thead>
          <tr>
            <th>Employee</th>
           
            <th>From</th>
            <th>To</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {leaves.map((l) => (
            <tr key={l.id}>
              <td>{l.employeeName}</td>
              
              <td>{l.fromDate}</td>
              <td>{l.toDate}</td>
              <td>{l.reason}</td>
              <td>
                <span className={`status ${l.status}`}>
                  {l.status}
                </span>
              </td>
              <td>
                {l.status === "pending" ? (
                  <>
                    <button
                      className="btn approve"
                      onClick={() => updateStatus(l.id, "approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="btn reject"
                      onClick={() => updateStatus(l.id, "rejected")}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span>Completed</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
     </div>
      </div>
  );
}
