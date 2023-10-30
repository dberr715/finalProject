import React, { useState, useEffect } from "react";
import "../index.css";
export default function TeamPage() {
  const [teamName, setTeamName] = useState("");

  const [logo, setLogo] = useState("");
  const [country, setCountry] = useState("");
  // const [fixtures, setfixtures] = useState("");
  // const [table, setTable] = useState("");
  const [stadium, setStadium] = useState("");
  const [stadiumPic, setStadiumPic] = useState("");

  async function fetchData1() {
    const key = import.meta.env.VITE_FOOTBALL_API_KEY;
    const nameUrl =
      "https://api-football-v1.p.rapidapi.com/v3/teams?name=manchester%20city";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": key,
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(nameUrl, options);
      const result = await response.json();
      const name = result.response[0].team.name;
      const logo = result.response[0].team.logo;
      const stadium = result.response[0].venue.name;
      const stadiumPic = result.response[0].venue.image;
      const country = result.response[0].team.country;
      console.log("RESULTS:", name);
      setTeamName(name);
      setLogo(logo);
      setStadium(stadium);
      setStadiumPic(stadiumPic);
      setCountry(country);
    } catch (error) {
      console.error(error);
    }
  }
  // Uncomment when ready to run//////
  //  fetchData1();

  return (
    <div>
      <p>Country: {country}</p>
      <p>Team Name: {teamName}</p>
      <img src={logo} alt="Team Logo" />
      {/* <p>Table: {table}</p>
      <p>Fixtures: {fixtures}</p> */}
      <p>Stadium Name: {stadium}</p>
      <img src={stadiumPic} alt="Stadium Pic" />
    </div>
  );
}
