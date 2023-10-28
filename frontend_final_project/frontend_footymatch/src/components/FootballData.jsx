// import React, { useState, useEffect } from "react";
// import "../index.css";

// export function FootballData() {
//   const [leagueName, setLeagueName] = useState(""); // Initialize state to store the league name

//   useEffect(() => {
//     async function fetchData() {
//       const key = import.meta.env.VITE_FOOTBALL_API_KEY;
//       const url =
//         "https://api-football-v1.p.rapidapi.com/v3/leagues?country=England";
//       const options = {
//         method: "GET",
//         headers: {
//           "X-RapidAPI-Key": key, // No need for string interpolation here
//           "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
//         },
//       };

//       try {
//         const response = await fetch(url, options);
//         const result = await response.json();
//         const name = result.response[0].league.name;
//         console.log("RESULTS:", name);
//         setLeagueName(name); // Update the state with the league name
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     fetchData(); // Call the async function when the component mounts
//   }, []); // The empty dependency array ensures it runs only once

//   return (
//     <div>
//       <p>League Name: {leagueName}</p>
//     </div>
//   );
// }
