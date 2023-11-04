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

  async function fetchData1() {
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
  }

  async function addFavoriteTeam(teamName) {
    const apiUrl = " http://localhost:8000/favorite-teams/ "; // Correct API endpoint

    // console.log("Tokenhere:  ", token);
    const token = localStorage.getItem("access_token");
    const user_id = localStorage.getItem("user_id");
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ team_name: teamName, user: user_id }),
      });

      if (response.ok) {
        console.log("Team added to favorites successfully.");
      } else {
        console.error("Failed to add team to favorites.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  useEffect(() => {
    fetchData1();
  }, [params.teamname]);
  // console.log("Tokenhere:  ", token);
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
            <h2>Add to Favorites</h2>
            <p>Stadium Name: {stadium}</p>
            <img src={stadiumPic} alt="Stadium Pic" />
            {isAuth && (
              <button onClick={() => addFavoriteTeam(teamName)}>
                Add to Favorites
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}
