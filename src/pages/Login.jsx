import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!email && !password) {
      setError("Email and Password are required");
      return;
    }else if(!email) {
      setError("Email is required");
      return;
    }else if(!password) {
      setError("Password is required");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5500/users?email=${email}`
      );
      const data = await res.json();

      if (data.length > 0 && data[0].password === password) {
        login(data[0]);

        if (data[0].role === "admin") navigate("/dashboard");
        else if (data[0].role === "hr") navigate("/dashboard");
        else navigate("/employeedashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Server not running. Please start DB server.");
    }
  };

  return (
    <div className="login-page">
      <form className="login-card fade-in" onSubmit={handleLogin}>
        <h1 className="title">Welcome to <span>HRMatrix</span></h1>
        <p className="subtitle">Login to continue</p>

        {error && <p className="error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
