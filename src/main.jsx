import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './style.css'
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ReactDOM from "react-dom/client";

// createRoot(document.getElementById('root')).render(<App />)



ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
