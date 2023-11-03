import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "../index.css";

export default function Navigation() {
  const { isAuth } = useAuth();
  const [favorites, setFavorites] = useState([]);

  const fetchFavoriteTeams = async () => {
    if (isAuth) {
      const access_token = localStorage.getItem("access_token");
      const url = "http://localhost:8000/favorite-teams/"; // Correct API endpoint

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Datatata: ", data);
          setFavorites(data);
        } else {
          console.error("Failed to fetch favorite teams.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  // Fetch favorite teams whenever isAuth changes
  useEffect(() => {
    fetchFavoriteTeams();
  }, [isAuth]);

  return (
    <div className="topnav" id="myTopnav">
      <div className="active">
        <Link to="/home">Home</Link>
      </div>
      <div>
        <Link to="/create">Create Account</Link>
      </div>
      <div>
        <Link to="/live">Live</Link>
      </div>
      <div className="dropdown">
        <button className="dropbtn">
          Favorites
          <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
          {favorites.length > 0 ? (
            favorites.map((favorite, index) => (
              <Link key={index} to={`/team/${favorite}`}>
                {favorite}
              </Link>
            ))
          ) : (
            <p>No favorite teams yet</p>
          )}
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
