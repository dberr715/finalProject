import React from "react";
import { Link } from "react-router-dom";
export default function CreateAccount() {
  return (
    <div className="registration form">
      <header>Sign Up</header>
      <form action="#">
        <input type="text" placeholder="Enter a username" id="email" />
        <input type="password" placeholder="Create a password" id="password" />
        <input
          type="password"
          placeholder="Confirm your password"
          id="confirmPassword"
        />
        <input type="submit" className="button" value="Sign Up" />
      </form>
      <div className="signup">
        <span className="signup">Already have an account?</span>
        <div className="signup">
          <Link to="/login"><span className="login1">Login</span></Link>
        </div>
      </div>
    </div>
  );
}
