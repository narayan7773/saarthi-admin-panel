import Tickets from "./pages/Tickets";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import "./App.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (
      email === "admin@saarthi.com" &&
      password === "admin123"
    ) {
      onLogin();
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Saarthi & Shikshak</h1>
        <p>Admin Panel</p>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={
          loggedIn ? (
            <Navigate to="/dashboard" />
          ) : (
            <Login onLogin={() => setLoggedIn(true)} />
          )
        }
      />

      <Route
        path="/dashboard"
        element={
          loggedIn ? (
            <Dashboard />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
  path="/tickets"
  element={
    loggedIn ? (
      <Tickets />
    ) : (
      <Navigate to="/" />
    )
  }
/>
    </Routes>
  );
}

export default App;