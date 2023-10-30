import React from "react";
import { Link } from "react-router-dom";
export default function CreateAccount() {
  return (
    <div className="registration form">
      <header>Signup</header>
      <form action="#">
        <input type="text" placeholder="Enter your email" id="email" />
        <input type="password" placeholder="Create a password" id="password" />
        <input
          type="password"
          placeholder="Confirm your password"
          id="confirmPassword"
        />
        <input type="submit" class="button" value="Signup" />
      </form>
      <div className="signup">
        <span className="signup">Already have an account?</span>
        <div>
          <Link to="/login"><span>Login</span></Link>
        </div>
      </div>
    </div>
  );
}
