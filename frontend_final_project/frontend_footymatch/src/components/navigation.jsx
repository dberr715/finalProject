import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "../index.css";

export default function Navigation() {
  const { isAuth } = useAuth();
  return (
    <div className="topnav" id="myTopnav">
      {" "}
      <div className="active">
        <Link to="/home">Home</Link>
      </div>
      {/* Need to link to Favorite dropdown/page here */}
      <div>
        <Link to="/team">TeamPage</Link>
      </div>
      <div>
        <Link to="/create">Create Account</Link>
      </div>
      <div className="dropdown">
        <button className="dropbtn">
          Favorites
          <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
          <Link to="#">Link 1</Link>
          <Link to="#">Link 2</Link>
          <Link to="#">Link 3</Link>
        </div>
      </div>
      <div>
        {isAuth ? (
          <Link to="/logout">Logout</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
}
