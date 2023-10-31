import "../index.css";
import AIresponse from "./AIResponse";
import React, { useState } from "react";
export default function HomeText() {
  const [team, setTeam] = useState("");
  const handleInputChange = (e) => {
    setTeam(e.target.value);
  };
  return (
    <>
      <h1>Welcome to FootyMatch!</h1>

      {/* <form>
        <label>
          <input type="text" placeholder="🏀🏈⚾️🎾" />
          <button type="submit">Match!</button>
        </label>
      </form> */}
      <h4>⚽️Find your new soccer team to support⚽️</h4>
      <p>Type 1 or more sports teams in to find your soccer team match! </p>
      <AIresponse />
      <br />
      <h4>Already have a team?</h4>
      <p>Search for it below!</p>

      <input type="text" value={team} onChange={handleInputChange} placeholder="🔍" />
      <button type="submit">Search</button>
    </>
  );
}
