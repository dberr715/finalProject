import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setIsAuth } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
      const url = "https://footymatch1.onrender.com/token/";
      // const url = "https://localhost/token/";

      const data = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (data.status === 200) {
        const tokenData = await data.json();
        const { access, refresh, user_id, username } = tokenData;

        localStorage.setItem("user_id", user_id);
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
        localStorage.setItem("username", username);

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
    <div className="login-container">
      <div className="login-head">
        <img src="../newfootymatch.png" alt="FootyMatch" className="footy" />
        <h3>Your Gateway to the World of Soccer.</h3>
        <p>
          For sports fans looking to explore soccer, we've got you covered. Find
          your perfect team and dive into the beautiful game!
        </p>
        <p>Minimal input needed!</p>
        <p>Free Sign Up!</p>
      </div>
      <form onSubmit={handleSubmit} className="login-box">
        <div className="login form">
          <header className="apple">Login</header>
          <label className="apple">
            Username
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChangeUsername}
            />
          </label>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <label className="apple">
            Password
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChangePassword}
            />
          </label>
          <input type="submit" className="prev-next-button " value="Login" />
          <div className="signup">
            <span className="signup1">
              Don't have an account? <br />
              <label className="signup2">
                <Link to="/create" className="signup123">
                  Sign Up
                </Link>
              </label>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
