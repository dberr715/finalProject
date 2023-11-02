// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// export default function Live() {
//   const [fixture, setfixture] = useState([]);

//   useEffect(() => {
//     const key = import.meta.env.VITE_FOOTBALL_API_KEY;

//     const fetchfixture = async () => {
//       const url = "https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all";
//       const options = {
//         method: "GET",
//         headers: {
//           "X-RapidAPI-Key": key,
//           "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
//         },
//       };

//       try {
//         const response = await fetch(url, options);
//         const data = await response.json();

//         // Sort live games by elapsed time in descending order
//         const sortedfixture = data.response.sort(
//           (a, b) => b.fixture.elapsed - a.fixture.elapsed
//         );

//         // Select the 10 games with the lowest elapsed time (closest to the end of the game)
//         const closestToTheEnd = sortedfixture.slice(0, 10);

//         setfixture(closestToTheEnd);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchfixture();
//   }, []);

//   return (
//     <div>
//       <h1>Live Scores</h1>
//       <div style={{ display: "flex", flexWrap: "wrap" }}>
//         {fixture.map((score) => (
//           <div
//             key={score.fixture.id}
//             style={{
//               border: "1px solid black",
//               margin: "10px",
//               padding: "10px",
//               width: "500px",
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               textAlign: "center",
//             }}
//           >
//             <Link
//               to={`/game/${score.fixture.id}`}
//               style={{
//                 textDecoration: "underline",
//                 color: "black", // Keep the text color black
//               }}
//             >
//               <img
//                 src={score.teams.home.logo}
//                 alt={score.teams.home.name}
//                 style={{ width: "75px", height: "75px" }}
//               />
//               <div style={{ fontSize: "24px" }}>
//                 {score.teams.home.name} {score.goals.home} - {score.goals.away}{" "}
//                 {score.teams.away.name}
//               </div>
//               <img
//                 src={score.teams.away.logo}
//                 alt={score.teams.away.name}
//                 style={{ width: "75px", height: "75px" }}
//               />
//               <p style={{ fontSize: "18px" }}></p>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

//////////

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function Live() {
  const [fixture, setfixture] = useState([]);

  useEffect(() => {
    const key = import.meta.env.VITE_FOOTBALL_API_KEY;

    const fetchfixture = async () => {
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

        const sortedfixture = data.response.sort(
          (a, b) => b.fixture.elapsed - a.fixture.elapsed
        );

        const closestToTheEnd = sortedfixture.slice(0, 10);

        setfixture(closestToTheEnd);
      } catch (error) {
        console.error(error);
      }
    };

    fetchfixture();
  }, []);

  return (
    <div>
      <h1>Live Scores</h1>
      <div className="live-matches-container">
        {fixture.map((score) => (
          <div key={score.fixture.id} className="match">
            <div className="match-header">
              <div className="match-status">Live</div>
              <div className="match-tournament">
                <img src={score.league.logo} alt="League Logo" />
                {score.league.name}
              </div>
              <div className="match-actions">
               
              </div>
            </div>
            <div className="match-content">
              <div className="column">
                <div className="team team--home">
                  <div className="team-logo">
                    <img
                      src={score.teams.home.logo}
                      alt={score.teams.home.name}
                    />
                  </div>
                  <h2 className="team-name">{score.teams.home.name}</h2>
                </div>
              </div>
              <div className="column">
                <div className="match-details">
                  <div className="match-date">
                    {new Date(score.fixture.date).toLocaleString("en-US", {
                      day: "numeric",
                      month: "short",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </div>
                  <div className="match-score">
                    <span className="match-score-number match-score-number--leading">
                      {score.goals.home}
                    </span>
                    <span className="match-score-divider">:</span>
                    <span className="match-score-number">
                      {score.goals.away}
                    </span>
                  </div>
                  <div className="match-time-lapsed">
                    {score.fixture.status.elapsed}'
                  </div>
                  <div className="match-referee">
                    Referee: <strong>{score.fixture.referee}</strong>
                  </div>
                 
                  
                </div>
              </div>
              <div className="column">
                <div className="team team--away">
                  <div className="team-logo">
                    <img
                      src={score.teams.away.logo}
                      alt={score.teams.away.name}
                    />
                  </div>
                  <h2 className="team-name">{score.teams.away.name}</h2>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
