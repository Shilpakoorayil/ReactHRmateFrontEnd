import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import EmpSidebar from "../../components/employee/empSidebar";
import Topbar from "../../components/admin/Topbar";
import "./ApplyLeave.css";

export default function ApplyLeave() {
  const { user } = useContext(AuthContext);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    fromDate: "",
    toDate: "",
    reason: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const newFrom = new Date(form.fromDate);
    const newTo = new Date(form.toDate);

    // ✅ Validation 1: Date order
    if (newTo < newFrom) {
      setError("To Date cannot be earlier than From Date.");
      return;
    }

    // Fetch existing leaves
    const res = await fetch(
      `http://localhost:5500/leaves?employeeId=${user.id}`
    );
    const existingLeaves = await res.json();

    // ✅ Validation 2: Overlap
    const isOverlap = existingLeaves.some((leave) => {
      const existingFrom = new Date(leave.fromDate);
      const existingTo = new Date(leave.toDate);

      return newFrom <= existingTo && newTo >= existingFrom;
    });

    if (isOverlap) {
      setError(
        "You have already applied for leave on this date. Please select another date."
      );
      return;
    }

    // Submit leave
    const payload = {
      employeeId: user.id,
      employeeName: user.name,
      fromDate: form.fromDate,
      toDate: form.toDate,
      reason: form.reason,
      status: "pending"
    };

    await fetch("http://localhost:5500/leaves", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setSuccess(true);
    setForm({ fromDate: "", toDate: "", reason: "" });

    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="app">
      <EmpSidebar />
      <div className="main">
        <Topbar />

        <div className="leave-container">
          <div className="leave-card">

            {success && (
              <div className="success-msg">
                ✅ Your leave request has been submitted successfully
              </div>
            )}

            <h2>Apply Leave</h2>
            <p className="sub-text">Fill the form below to request leave</p>

            {error && <span className="error-msg">{error}</span>}

            <form onSubmit={handleSubmit} className="leave-form">
              <div className="form-group">
                <label>From Date</label>
                <input
                  type="date"
                  name="fromDate"
                  value={form.fromDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>To Date</label>
                <input
                  type="date"
                  name="toDate"
                  value={form.toDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Reason</label>
                <textarea
                  name="reason"
                  value={form.reason}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="submit-btn">
                Submit Leave Request
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
