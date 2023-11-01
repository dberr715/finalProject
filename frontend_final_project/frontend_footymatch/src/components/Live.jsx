import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Live() {
  const [liveScores, setLiveScores] = useState([]);

  useEffect(() => {
    const key = import.meta.env.VITE_FOOTBALL_API_KEY;
    const fetchLiveScores = async () => {
      const url = "https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            key,
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();

        // Filter the live games to get the first 10 elements
        setLiveScores(data.response.slice(0, 10));
      } catch (error) {
        console.error(error);
      }
    };

    fetchLiveScores();
  }, []);

  return (
    <div>
      <h1>Live Scores</h1>
      <ul>
        {liveScores.map((score) => (
          <li key={score.fixture.id}>
            <Link to={`/game/${score.fixture.id}`}>
              <img src={score.teams.home.logo} alt={score.teams.home.name} />
              {score.teams.home.name} {score.goals.home} - {score.goals.away}{" "}
              {score.teams.away.name}
              <img src={score.teams.away.logo} alt={score.teams.away.name} />
              <br />
              <br />
              <br />
              <br />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
