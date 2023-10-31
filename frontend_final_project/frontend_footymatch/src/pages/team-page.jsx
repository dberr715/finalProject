// TeamPage.js
import React, { useState, useEffect } from "react";
import "../index.css";
import { useParams } from "react-router-dom";
// import HomeText from "../components/HomeText";

export default function TeamPage(props) {
  const params = useParams();
  console.log(params);
  const [teamName, setTeamName] = useState("");
  const [logo, setLogo] = useState("");
  const [country, setCountry] = useState("");
  const [stadium, setStadium] = useState("");
  const [stadiumPic, setStadiumPic] = useState("");

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
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData1();
  }, [props.team]);

  return (
    <div>
      <p>Country: {country}</p>
      <p>Team Name: {teamName}</p>
      <img src={logo} alt="Team Logo" />
      <p>Stadium Name: {stadium}</p>
      <img src={stadiumPic} alt="Stadium Pic" />
    </div>
  );
}
