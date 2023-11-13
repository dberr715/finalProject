import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "./Navigation";

export default function GameDetails() {
  const { id } = useParams();
  const [fixtureDetails, setFixtureDetails] = useState(null);
  const [homeTeamEvents, setHomeTeamEvents] = useState([]);
  const [awayTeamEvents, setAwayTeamEvents] = useState([]);
  const [homeLogo, setHomeLogo] = useState(null);
  const [awayLogo, setAwayLogo] = useState(null);
  const [homeTeamName, setHomeTeamName] = useState(null);
  const [awayTeamName, setAwayTeamName] = useState(null);
  const [homeScore, setHomeScore] = useState(null);
  const [awayScore, setAwayScore] = useState(null);
//   const [totalScore, setTotalScore] = useState(null);

  const navigate = useNavigate();

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

          // Find unique home and away team names
          const uniqueTeamNames = [
            ...new Set(events.map((event) => event.team.name)),
          ];
          const homeTeamName = uniqueTeamNames[0] || "Home Team";
          const awayTeamName = uniqueTeamNames[1] || "Away Team";
          const homeLogo = events.find(
            (event) => event.team.name === homeTeamName
          )?.team.logo;
          const awayLogo = events.find(
            (event) => event.team.name === awayTeamName
          )?.team.logo;

          setHomeLogo(homeLogo);
          setAwayLogo(awayLogo);
          setHomeTeamName(homeTeamName);
          setAwayTeamName(awayTeamName);

          // Filter events for home and away teams
          const homeEvents = events.filter(
            (event) => event.team.name === homeTeamName
          );
          const awayEvents = events.filter(
            (event) => event.team.name === awayTeamName
          );

          // Find home and away scores
          const homeScore = homeEvents.filter(
            (event) => event.type === "Goal"
          ).length;
          const awayScore = awayEvents.filter(
            (event) => event.type === "Goal"
          ).length;

          setHomeScore(homeScore);
          setAwayScore(awayScore);

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

  const handleBackButtonClick = () => {
    // Go back to the previous page using useNavigate
    navigate(-1);
  };

   return (
     <>
       <Navigation />
       <div className="card1 card3">
         <button
           className="back-button more-info-button"
           onClick={handleBackButtonClick}
         >
           Back
         </button>
         {fixtureDetails && (
           <div className="soccer-scoring-card">
             <h1 className="league-name">Match Events</h1>
             <div className="teams-container">
               <div className="team">
                 <div className="team-logo">
                   <img src={awayLogo} alt="away team logo" />
                 </div>
                 <div className="team-details">
                   <h2 className="team-name">{awayTeamName}</h2>
                 </div>
                 <div className="events-container">
                   {awayTeamEvents.length === 0 && (
                     <div className="placeholder-message">
                       No match events yet
                     </div>
                   )}
                   {awayTeamEvents.map((event, index) => (
                     <div key={index} className="match-event">
                       <div className="event-details">
                         <div className="event-time smaller ">
                           {event.time.elapsed} min &nbsp;
                         </div>
                         <div className="event-type-icon">
                           {event.detail === "Red Card" && (
                             <img
                               src="../../public/redcard.png"
                               alt="Red Card"
                               className="small-icon"
                             />
                           )}
                           {event.detail === "Yellow Card" && (
                             <img
                               src="../../public/yellowcard.png"
                               alt="Yellow Card"
                               className="small-icon"
                             />
                           )}
                           {event.detail.startsWith("Substitution") && (
                             <img
                               src="../../public/substitution.png"
                               alt={`Substitution ${event.detail.charAt(13)}`}
                               className="small-icon"
                             />
                           )}
                           {event.detail === "Normal Goal" && (
                             <img
                               src="../../public/soccerballicon.png"
                               alt="Goal"
                               className="small-icon"
                             />
                           )}
                         </div>
                         <div className="event-type smaller">
                           &nbsp; {event.type} &nbsp;
                         </div>
                         <div className="player-name smaller bold">
                           &nbsp;{event.player.name} &nbsp;{" "}
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
               <div className="vertical-line"></div>
               <div className="score-column">
                 <div className="match-score">
                   <span className="match-score-number match-score-number--leading">
                     {awayScore}
                   </span>
                   <span className="match-score-divider">:</span>
                   <span className="match-score-number">{homeScore}</span>
                 </div>
               </div>
               <div className="vertical-line"></div>
               <div className="team">
                 <div className="team-logo">
                   <img src={homeLogo} alt="home Team Logo" />
                 </div>
                 <div className="team-details">
                   <h2 className="team-name">{homeTeamName}</h2>
                 </div>
                 <div className="events-container">
                   {homeTeamEvents.length === 0 && (
                     <div className="placeholder-message">
                       No match events yet
                     </div>
                   )}
                   {homeTeamEvents.map((event, index) => (
                     <div key={index} className="match-event">
                       <div className="event-details">
                         <div className="event-time smaller ">
                           {event.time.elapsed} min &nbsp;
                         </div>
                         <div className="event-type-icon">
                           {event.detail === "Red Card" && (
                             <img
                               src="../../public/redcard.png"
                               alt="Red Card"
                               className="small-icon"
                             />
                           )}
                           {event.detail === "Yellow Card" && (
                             <img
                               src="../../public/yellowcard.png"
                               alt="Yellow Card"
                               className="small-icon"
                             />
                           )}
                           {event.detail.startsWith("Substitution") && (
                             <img
                               src="../../public/substitution.png"
                               alt={`Substitution ${event.detail.charAt(13)}`}
                               className="small-icon"
                             />
                           )}
                           {event.detail === "Normal Goal" && (
                             <img
                               src="../../public/soccerballicon.png"
                               alt="Goal"
                               className="small-icon"
                             />
                           )}
                         </div>
                         <div className="event-type smaller">
                           &nbsp;{event.type}&nbsp;
                         </div>
                         <div className="player-name smaller bold">
                           &nbsp; {event.player.name} &nbsp;
                         </div>
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
