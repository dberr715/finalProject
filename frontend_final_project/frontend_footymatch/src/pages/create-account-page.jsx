import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function CreateAccount() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirm_password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        console.log("User registered successfully.");
      } else {
        console.error("Registration failed.");
      }
    } catch (error) {
      console.error("Registration failed.", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="registration form">
      <header>Sign Up</header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a username"
          name="username" // Fix the name attribute
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Create a password"
          name="password" // Fix the name attribute
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Confirm your password"
          name="confirm_password" // Fix the name attribute
          onChange={handleChange}
        />
        <input type="submit" className="button" value="Sign Up" />
      </form>
      <div className="signup">
        <span className="signup">Already have an account?</span>
        <div className="signup">
          <Link to="/login">
            <span className="login1">Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
