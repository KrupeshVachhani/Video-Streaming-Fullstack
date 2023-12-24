import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../../styles/login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const handleLogin = () => {
    if (email.trim() === "" || password.trim() === "" || name.trim() === "") {
      setLoginError(true);
    } else {
      setLoginError(false);

      // Make the POST request to the server
      fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then(() => {
            // If user is successfully added, redirect to homepage
            alert("Logged in successfully!");
            window.location.href = "/"; // Redirect to homepage
          
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <section className="login">
      <motion.button initial={{ y: "-100vh" }} animate={{ y: 0 }}>
        <div className="auth-container">
          <div className="auth-box login-box">
            <h2>Log In</h2>
            {loginError && (
              <p className="auth-error-message">
                Please fill in all fields correctly.
              </p>
            )}
            <input
              className="auth-input"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="auth-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="auth-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="auth-button" onClick={handleLogin}>
              Log In
            </button>
          </div>
        </div>
      </motion.button>
    </section>
  );
};

export default Login;
