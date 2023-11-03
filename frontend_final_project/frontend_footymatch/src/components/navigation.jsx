import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "../index.css";

export default function Navigation() {
  const { isAuth } = useAuth();
  const [favorites, setFavorites] = useState([]); // State to store favorite teams

  // Function to update the favorites list
  const updateFavoritesList = (teamNameToAdd) => {
    // Make a copy of the current favorites list and add the new team
    const updatedFavorites = [...favorites, teamNameToAdd];
    setFavorites(updatedFavorites);
  };

  // Fetch favorite teams when the component mounts
  const fetchFavoriteTeams = async () => {
    if (isAuth) {
      const access_token = localStorage.getItem("access_token");
      const url = "http://localhost:8000/api/favorites/";

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
          setFavorites(data.favorites);
        } else {
          console.error("Failed to fetch favorite teams.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  // Fetch favorite teams when the component mounts
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
            // Display favorite teams if there are any
            favorites.map((favorite, index) => (
              <Link key={index} to={`/team/${favorite}`}>
                {favorite}
              </Link>
            ))
          ) : (
            // Display a message if no favorite teams
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
