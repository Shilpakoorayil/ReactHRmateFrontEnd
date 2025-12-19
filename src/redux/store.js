import { configureStore } from "@reduxjs/toolkit";
import salaryReducer from "./salarySlice";

export const store = configureStore({
  reducer: {
    salary: salaryReducer
  }
});
