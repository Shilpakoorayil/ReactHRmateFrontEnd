import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Load payroll data
export const fetchPayrolls = createAsyncThunk("payroll/fetchPayrolls", async () => {
  const res = await fetch("http://localhost:5500/payroll");
  return res.json();
});

export const updatePayrollStatus = createAsyncThunk(
  "payroll/updateStatus",
  async ({ id, status }) => {
    await fetch(`http://localhost:5500/payroll/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    return { id, status }; // return updated values
  }
);

const payrollSlice = createSlice({
  name: "payroll",
  initialState: {
    payrolls: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayrolls.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPayrolls.fulfilled, (state, action) => {
        state.loading = false;
        state.payrolls = action.payload;
      })
      .addCase(updatePayrollStatus.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        const target = state.payrolls.find((p) => p.id === id);
        if (target) target.status = status;
      });
  },
});

export default payrollSlice.reducer;
