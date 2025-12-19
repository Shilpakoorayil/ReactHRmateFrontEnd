import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmployee,
  setAttendance,
  calculateSalary
} from "../redux/salarySlice";

export default function SalaryCalculation() {
  const dispatch = useDispatch();
  const { employee, salaryDetails } = useSelector(state => state.salary);

  useEffect(() => {
    async function loadData() {
      const emp = await fetch("http://localhost:5500/employees/3")
        .then(r => r.json());

      const att = await fetch(
        "http://localhost:5500/attendance?employeeId=3"
      ).then(r => r.json());

      dispatch(setEmployee(emp));
      dispatch(setAttendance(att));
      dispatch(calculateSalary());
    }

    loadData();
  }, [dispatch]);

  if (!employee) return <p>Loading...</p>;

  return (
    <div className="card">
      <h3>Salary Calculation</h3>

      <p><b>Employee:</b> {employee.name}</p>
      <p><b>Basic Salary:</b> ₹{employee.salary}</p>

      <hr />

      <p>Total Days: {salaryDetails.totalDays}</p>
      <p>Present Days: {salaryDetails.presentDays}</p>
      <p>Earned Salary: ₹{salaryDetails.earnedSalary}</p>
      <p>PF (12%): ₹{salaryDetails.pf}</p>
      <p>Tax (10%): ₹{salaryDetails.tax}</p>

      <h3>Net Salary: ₹{salaryDetails.netSalary}</h3>
    </div>
  );
}
