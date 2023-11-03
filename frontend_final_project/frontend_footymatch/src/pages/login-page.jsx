import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setIsAuth } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Add error state

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username,
      password,
    };

    try {
      const url = "http://localhost:8000/token/";
      const data = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (data.status === 200) {
        const tokenData = await data.json();
        const { access, refresh, user_id, username } = tokenData; // Fetch and destructure the username

        localStorage.setItem("user_id", user_id);
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
        localStorage.setItem("username", username);

        // Set the username in the context
        setUsername(username);

        setIsAuth(true);
        return navigate(`/home`);
      } else {
        setError("Login failed. Check your credentials.");
      }
    } catch (error) {
      console.error("ERROR: ", error);
      setError("An error occurred.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="login form">
          <header>Login</header>
          <label>
            Username
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChangeUsername}
            />
          </label>
          {error && <p style={{ color: "red" }}>{error}</p>}{" "}
          {/* Display error message in red */}
          <label>
            Password
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChangePassword}
            />
          </label>
          <a href="#">Forgot password?</a>
          <input type="submit" className="button" value="Login" />
        </div>
        <div className="signup">
          <span className="signup1">
            Don't have an account?
            <label className="signup2">
              <br />
              <Link to="/create">Sign Up</Link>
            </label>
          </span>
        </div>
      </form>
    </div>
  );
}
