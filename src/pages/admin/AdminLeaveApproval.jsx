import React, { useEffect, useState } from "react";
import "./AdminLeaveApproval.css";
import Sidebar from '../../components/admin/Sidebar'
import Topbar from '../../components/admin//Topbar'

export default function AdminLeaveApproval() {
  const [leaves, setLeaves] = useState([]);
  // PAGINATION
  const [visibleCount, setVisibleCount] = useState(5);



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
  const visibleLeaves = leaves.slice(0, visibleCount);



  return (
    <div className='app'>
      <Sidebar />
      <div className='main'>
        <Topbar />
        <h2>Leave Approval</h2>
        <div className="table-wrapper">


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
              {visibleLeaves.map((l) => (
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
          {/* PAGINATION */}
          {visibleCount < leaves.length && (
            <div className="load-more">
              <button onClick={() => setVisibleCount(prev => prev + 5)}>
                Load More
              </button>
            </div>
          )}


        </div>
      </div>
    </div>
  );
}
