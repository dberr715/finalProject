import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";
export default function LoginPage() {
  const navigate = useNavigate();
  const { setIsAuth } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      }).then((response) => response.json());

      const { access, refresh, userId } = data;

      localStorage.clear();
      localStorage.setItem("user_id", userId);
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      console.log("Logged in successfully!");
      setIsAuth(true);
      return navigate(`/home`);
    } catch (error) {
      console.error("ERROR: ", error);
      return navigate(`/login`, { replace: true });
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
