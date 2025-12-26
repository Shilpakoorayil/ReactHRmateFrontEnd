import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import EmpSidebar from "../../components/employee/empSidebar";
import Topbar from "../../components/admin/Topbar";
import "./ApplyLeave.css";

export default function ApplyLeave() {
  const { user, dark } = useContext(AuthContext);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState({
    fromDate: "",
    toDate: "",
    reason: "",
    global: "",
  });

  const [form, setForm] = useState({
    fromDate: "",
    toDate: "",
    reason: ""
  });

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    setError({ ...error, [e.target.name]: "", global: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    // Client validations
    if (!form.fromDate) {
      setError((prev) => ({ ...prev, fromDate: "Select From Date" }));
      valid = false;
    }
    if (!form.toDate) {
      setError((prev) => ({ ...prev, toDate: "Select To Date" }));
      valid = false;
    }
    if (!form.reason.trim()) {
      setError((prev) => ({ ...prev, reason: "Reason is required" }));
      valid = false;
    }
    if (!valid) return;

    const start = new Date(form.fromDate);
    const end = new Date(form.toDate);

    if (end < start) {
      setError((prev) => ({ ...prev, global: "To Date cannot be earlier than From Date" }));
      return;
    }

    // Fetch existing leaves to check overlap
    const res = await fetch(
      `http://localhost:5500/leaves?employeeId=${user.id}`
    );
    const existing = await res.json();

    const isOverlap = existing.some((leave) => {
      const lFrom = new Date(leave.fromDate);
      const lTo = new Date(leave.toDate);
      return start <= lTo && end >= lFrom;
    });

    if (isOverlap) {
      setError((prev) => ({
        ...prev,
        global: "You already applied for leave during this period.",
      }));
      return;
    }

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
      body: JSON.stringify(payload),
    });

    setSuccess(true);
    setForm({ fromDate: "", toDate: "", reason: "" });

    setTimeout(() => setSuccess(false), 3000);
  };

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  return (
    <div className="app">
      <EmpSidebar />
      <div className="main">
        <Topbar />

        <div className="leave-container">
          <div className="leave-card">

            {success && (
              <div className="success-msg">
                ✅ Leave submitted successfully!
              </div>
            )}

            <h2>Apply Leave</h2>

            {error.global && <span className="error-msg">{error.global}</span>}

            <form onSubmit={handleSubmit} className="leave-form">
              <div className="form-group">
                <label>From Date</label>
                <input
                  type="date"
                  name="fromDate"
                  min={today}
                  value={form.fromDate}
                  onChange={handleChange}
                />
                {error.fromDate && (
                  <small className="error-text">{error.fromDate}</small>
                )}
              </div>

              <div className="form-group">
                <label>To Date</label>
                <input
                  type="date"
                  name="toDate"
                  min={form.fromDate || today}
                  value={form.toDate}
                  onChange={handleChange}
                />
                {error.toDate && (
                  <small className="error-text">{error.toDate}</small>
                )}
              </div>

              <div className="form-group">
                <label>Reason</label>
                <textarea
                  name="reason"
                  value={form.reason}
                  onChange={handleChange}
                  placeholder="Explain your reason..."
                ></textarea>
                {error.reason && (
                  <small className="error-text">{error.reason}</small>
                )}
              </div>

              <button type="submit" className="submit-btn">
                Submit
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
