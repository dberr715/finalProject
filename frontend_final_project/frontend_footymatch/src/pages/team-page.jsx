import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Navigation from "../components/Navigation";
import "../index.css";

export default function TeamPage() {
  const params = useParams();
  const { isAuth } = useAuth();
  const [teamName, setTeamName] = useState("");
  const [logo, setLogo] = useState("");
  const [country, setCountry] = useState("");
  const [stadium, setStadium] = useState("");
  const [stadiumPic, setStadiumPic] = useState("");
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  async function fetchData1() {
    // Your existing code for fetching team data
    const key = import.meta.env.VITE_FOOTBALL_API_KEY;
    const nameUrl = `https://api-football-v1.p.rapidapi.com/v3/teams?name=${params.teamname}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": key,
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(nameUrl, options);

      if (response.ok) {
        const result = await response.json();
        const name = result.response[0].team.name;
        const logo = result.response[0].team.logo;
        const stadium = result.response[0].venue.name;
        const stadiumPic = result.response[0].venue.image;
        const country = result.response[0].team.country;
        setTeamName(name);
        setLogo(logo);
        setStadium(stadium);
        setStadiumPic(stadiumPic);
        setCountry(country);
      } else {
        setError("Team not found. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setError(
        "That is not a professional soccer team, please check your spelling and try again!"
      );
    }

    // After fetching data, check if the team is a favorite
    fetchFavoriteTeams();
  }

  // Function to add or remove a team from favorites
  async function handleFavoriteTeam() {
    const apiUrl = "http://localhost:8000/favorite-teams/"; // Correct API endpoint
    const token = localStorage.getItem("access_token");
    const user_id = localStorage.getItem("user_id");
    const data = { team_name: teamName, user: user_id };

    try {
      if (isFavorite) {
        // Remove from favorites
        const response = await fetch(apiUrl, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          console.log("Team removed from favorites successfully.");
          setIsFavorite(false);
        } else {
          console.error("Failed to remove team from favorites.");
        }
      } else {
        // Add to favorites
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          console.log("Team added to favorites successfully.");
          setIsFavorite(true);
        } else {
          console.error("Failed to add team to favorites.");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  // Fetch the user's favorite teams and check if the current team is a favorite
  const fetchFavoriteTeams = async () => {
    if (isAuth) {
      const access_token = localStorage.getItem("access_token");
      const url = "http://localhost:8000/favorite-teams/";

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        });

        if (response.ok) {
          const favoriteTeams = await response.json();
          const isFavorite = favoriteTeams.some(
            (team) => team.team_name === teamName
          );
          setIsFavorite(isFavorite);
        } else {
          console.error("Failed to fetch favorite teams.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    fetchData1();
  }, [params.teamname]);

  return (
    <>
      <Navigation />
      <div>
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <>
            <p>Country: {country}</p>
            <p>Team Name: {teamName}</p>
            <img src={logo} alt="Team Logo" />

            <p>Stadium Name: {stadium}</p>
            <img src={stadiumPic} alt="Stadium Pic" />
            {isAuth && (
              <button onClick={() => handleFavoriteTeam()}>
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}
