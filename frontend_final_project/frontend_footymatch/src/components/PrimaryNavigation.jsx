import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "../index.css";

export default function Navigation({ isFavorite }) {
  const { isAuth, username } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  const fetchFavoriteTeams = async () => {
    if (isAuth) {
      const access_token = localStorage.getItem("access_token");
      // const url = "https://footymatch1.onrender.com/favorite-teams/";
      const url = "https://localhost/favorite-teams/";

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
          setFavorites(data);
        } else {
          console.error("Failed to fetch favorite teams.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    fetchFavoriteTeams();
  }, [isAuth, isFavorite]);

  return (
    <div className="sticky-topnav">
      <div className="topnav" id="myTopnav">
        <div className="active">
          <Link to="/home">Home</Link>
        </div>
        <div>
          <Link to="/live">Live Games</Link>
        </div>
        <div className="dropdown">
          <button className="dropbtn">
            My Favorites
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            {favorites && favorites.length > 0 ? (
              favorites.map((favorite, index) => (
                <Link
                  key={index}
                  to={`/team/${favorite.team_name}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/team/${favorite.team_name}`);
                  }}
                >
                  {favorite.team_name}
                </Link>
              ))
            ) : (
              <p>No favorite teams yet</p>
            )}
          </div>
        </div>
        <div>
          {isAuth ? (
            <>
              <div>
                <Link to="/logout">Logout</Link>
              </div>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
        <div className="logo-container">
          <img
            src="../../newfootymatch.png" 
            alt="Company Logo"
            className="company-logo"
          />
        </div>
        <div className="username">{username}</div>
      </div>
    </div>
  );
}
