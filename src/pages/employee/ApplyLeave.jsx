import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import EmpSidebar from "../../components/employee/empSidebar";
import Topbar from "../../components/admin/Topbar";
import "./ApplyLeave.css";

export default function ApplyLeave() {
    const { user } = useContext(AuthContext);
    //   success mesg for leave
    const [success, setSuccess] = useState(false);


    const [form, setForm] = useState({
        fromDate: "",
        toDate: "",
        reason: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            employeeId: user.id,
            employeeName: user.name,
            fromDate: form.fromDate,
            toDate: form.toDate,
            reason: form.reason,
            status: "Pending"
        };

        await fetch("http://localhost:5500/leaves", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        setSuccess(true);
        setForm({ fromDate: "", toDate: "", reason: "" });

        // Auto hide after 3 seconds
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
                        <p className="sub-text">
                            Fill the form below to request leave
                        </p>

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
                                    placeholder="Enter leave reason..."
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
