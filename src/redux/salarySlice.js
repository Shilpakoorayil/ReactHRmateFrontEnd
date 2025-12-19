import { createSlice } from "@reduxjs/toolkit";

const salarySlice = createSlice({
  name: "salary",
  initialState: {
    employee: null,
    attendance: [],
    salaryDetails: {}
  },

  reducers: {
    setEmployee(state, action) {
      state.employee = action.payload;
    },

    setAttendance(state, action) {
      state.attendance = action.payload;
    },

    calculateSalary(state) {
      const totalDays = 30;
      const presentDays = state.attendance.filter(
        a => a.status === "Present"
      ).length;

      const basic = state.employee.salary;
      const perDaySalary = basic / totalDays;
      const earnedSalary = perDaySalary * presentDays;

      const pf = earnedSalary * 0.12;
      const tax = earnedSalary * 0.1;
      const netSalary = earnedSalary - pf - tax;

      state.salaryDetails = {
        totalDays,
        presentDays,
        earnedSalary,
        pf,
        tax,
        netSalary
      };
    }
  }
});

export const {
  setEmployee,
  setAttendance,
  calculateSalary
} = salarySlice.actions;

export default salarySlice.reducer;
