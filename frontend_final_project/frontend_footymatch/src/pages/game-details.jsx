import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function GameDetails() {
  const { id } = useParams();
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    const key = import.meta.env.VITE_FOOTBALL_API_KEY;
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(
          `https://api-football-v1.p.rapidapi.com/v3/fixtures?id=${id}`,
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key": key,
              "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setGameData(data);
        } else {
          // Handle API error here
          console.error("API request failed");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchGameDetails();
  }, [id]);

  return (
    <div>
      {gameData ? (
        <div>
          <p>Elapsed: {gameData.elapsed}</p>
          <p>Extra: {gameData.extra}</p>
          <h1>Game Details</h1>
          <p>Game ID: {gameData.fixture.id}</p>
          <p>Event Date: {gameData.fixture.event_date}</p>
          <p>Home Team: {gameData.teams.home.name}</p>
          <p>Away Team: {gameData.teams.away.name}</p>
          <p>
            Home Team Logo:{" "}
            <img src={gameData.teams.home.logo} alt="Home Team Logo" />
          </p>
          <p>
            Away Team Logo:{" "}
            <img src={gameData.teams.away.logo} alt="Away Team Logo" />
          </p>
          <p>Home Team Score: {gameData.goals.home}</p>
          <p>Away Team Score: {gameData.goals.away}</p>

          {/* Display game events as needed */}
          <h2>Game Events</h2>
          <ul>
            {gameData.events.map((event, index) => (
              <li key={index}>
                Event Type: {event.type}
                <br />
                Event Time: {event.time}
                <br />
                Event Description: {event.detail}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
