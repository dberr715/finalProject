import React, { useState } from "react";
import AIResponse from "./AIResponse";

export default function HomeText() {
  const [searchedTeam, setSearchedTeam] = useState("");

  const handleSearch = (team) => {
    setSearchedTeam(team);
  };

  const [team, setTeam] = useState("");

  const handleInputChange = (e) => {
    setTeam(e.target.value);
  };

  const handleSearchClick = () => {
    handleSearch(team);
  };

  return (
    <>
      <h1>Welcome to FootyMatch!</h1>

      <h4>⚽️Find your new soccer team to support⚽️</h4>
      <p>Type 1 or more sports teams in to find your soccer team match! </p>
      <AIResponse handleSearch={handleSearch} />
      <br />
      <h4>Already have a team?</h4>
      <p>Search for it below!</p>

      <input
        type="text"
        value={team}
        onChange={handleInputChange}
        placeholder="🔍"
      />
      <button type="submit" onClick={handleSearchClick}>
        Search
      </button>
    </>
  );
}
