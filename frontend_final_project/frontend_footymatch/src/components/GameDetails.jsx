import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navigation from "./Navigation";

export default function GameDetails() {
  const { id } = useParams();
  const [fixtureDetails, setFixtureDetails] = useState(null);
  const [playerName, setPlayerName] = useState(null);

  useEffect(() => {
    const key = import.meta.env.VITE_FOOTBALL_API_KEY;

    const fetchDetails = async () => {
      const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures/events?fixture=${id}`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": key,
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);

        if (response.ok) {
          const result = await response.json();
          const events = result.response;

          // Assuming the response contains fixture details
          setFixtureDetails(result);

          // Accessing player name from the first event
        } else {
          console.error("Failed to fetch details");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, [id]);

  return (
    <>
      <Navigation />
      <div className="card1 card2">
        <h1>Game Details for Game ID: {id}</h1>
        {fixtureDetails && (
          <div className="soccer-scoring-card">
            <div className="league-name">League Name</div>
            <div className="teams-container">
              <div className="team">
                <div className="team-logo">
                  {/* <img
                  src={fixtureDetails.teams.home.logo}
                  alt="home Team Logo"
                /> */}
                </div>
                <div className="team-details">
                  <h2 className="team-name">Home team name</h2>
                  {/* Additional home team details can be added here */}
                </div>
              </div>
              <div className="team">
                <div className="team-logo">
                  {/* <img
                  src={fixtureDetails.teams.away.logo}
                  alt="away team log"
                /> */}
                </div>
                <div className="team-details">
                  <h2 className="team-name">away team name</h2>
                  {/* Additional away team details can be added here */}
                </div>
              </div>
            </div>
            <div className="events-container">
              <h3 className="events-header">Events</h3>
              <div className="match-event">
                <div className="event-details home-team-event">
                  <div className="player-name">Player</div>
                  {/* Additional home team event details can be added here */}
                </div>
                <div className="event-details away-team-event">
                  {/* Assuming away team details are available in the event object */}
                  <div className="player-name">Player2</div>
                  {/* Additional away team event details can be added here */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
