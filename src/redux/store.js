import { configureStore } from "@reduxjs/toolkit";
import payrollReducer from "./payrollslie";

export const store = configureStore({
  reducer: {
    payroll: payrollReducer,
  },
});
