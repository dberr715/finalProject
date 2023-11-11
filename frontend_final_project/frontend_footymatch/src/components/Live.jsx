import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navigation from "./Navigation";

export default function GameDetails() {
  const { id } = useParams();
  const [fixtureDetails, setFixtureDetails] = useState(null);
  const [homeTeamEvents, setHomeTeamEvents] = useState([]);
  const [awayTeamEvents, setAwayTeamEvents] = useState([]);
  const [leagueName, setLeagueName] = useState(null);
  const [homeTeamName, setHomeTeamName] = useState(null);
  const [awayTeamName, setAwayTeamName] = useState(null);
  const [homeTeamLogo, setHomeTeamLogo] = useState(null);
  const [awayTeamLogo, setAwayTeamLogo] = useState(null);

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

          // Set league name
          setLeagueName(result.response[0]?.league.name);

          // Find home and away team names dynamically
          const homeTeamNameResponse = result.response[0]?.team.name; // Assuming the first event has team information
          const awayTeamNameResponse = result.response[1]?.team.name; // Assuming the second event has team information

          // Set home and away team names
          setHomeTeamName(homeTeamNameResponse);
          setAwayTeamName(awayTeamNameResponse);

          // Set home and away team logos
          setHomeTeamLogo(result.response[0]?.team.logo);
          setAwayTeamLogo(result.response[1]?.team.logo);

          // Filter events for home and away teams
          const homeEvents = events.filter(
            (event) => event.team.name === homeTeamNameResponse
          );
          const awayEvents = events.filter(
            (event) => event.team.name === awayTeamNameResponse
          );

          // Set home and away team events
          setHomeTeamEvents(homeEvents);
          setAwayTeamEvents(awayEvents);
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
            <div className="league-name">{leagueName}</div>
            <div className="teams-container">
              <div className="team">
                <div className="team-logo">
                  <img src={homeTeamLogo} alt="home Team Logo" />
                </div>
                <div className="team-details">
                  <h2 className="team-name">{homeTeamName}</h2>
                  {/* Additional home team details can be added here */}
                </div>
                <div className="events-container">
                  <h3 className="events-header">Events</h3>
                  {homeTeamEvents.map((event, index) => (
                    <div key={index} className="match-event">
                      <div className="event-details">
                        <div className="event-time">{event.time.elapsed}</div>
                        <div className="event-type">{event.type}</div>
                        <div className="player-name">{event.player.name}</div>
                        <div className="event-detail">{event.detail}</div>
                        {/* Additional home team event details can be added here */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="team">
                <div className="team-logo">
                  <img src={awayTeamLogo} alt="away team log" />
                </div>
                <div className="team-details">
                  <h2 className="team-name">{awayTeamName}</h2>
                  {/* Additional away team details can be added here */}
                </div>
                <div className="events-container">
                  <h3 className="events-header">Events</h3>
                  {awayTeamEvents.map((event, index) => (
                    <div key={index} className="match-event">
                      <div className="event-details">
                        <div className="event-time">{event.time.elapsed}</div>
                        <div className="event-type">{event.type}</div>
                        <div className="player-name">{event.player.name}</div>
                        <div className="event-detail">{event.detail}</div>
                        {/* Additional away team event details can be added here */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
