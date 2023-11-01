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
          "X-RapidAPI-Key": key,
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();

        // Sort live games by elapsed time in descending order
        const sortedLiveScores = data.response.sort(
          (a, b) => b.fixture.elapsed - a.fixture.elapsed
        );

        // Select the 10 games with the lowest elapsed time (closest to the end of the game)
        const closestToTheEnd = sortedLiveScores.slice(0, 10);

        setLiveScores(closestToTheEnd);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLiveScores();
  }, []);

  return (
    <div>
      <h1>Live Scores</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {liveScores.map((score) => (
          <div
            key={score.fixture.id}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px",
              width: "500px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Link
              to={`/game/${score.fixture.id}`}
              style={{
                textDecoration: "underline",
                color: "black", // Keep the text color black
              }}
            >
              <img
                src={score.teams.home.logo}
                alt={score.teams.home.name}
                style={{ width: "75px", height: "75px" }}
              />
              <div style={{ fontSize: "24px" }}>
                {score.teams.home.name} {score.goals.home} - {score.goals.away}{" "}
                {score.teams.away.name}
              </div>
              <img
                src={score.teams.away.logo}
                alt={score.teams.away.name}
                style={{ width: "75px", height: "75px" }}
              />
              <p style={{ fontSize: "18px" }}></p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
