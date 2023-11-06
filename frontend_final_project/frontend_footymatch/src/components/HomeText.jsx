import "../index.css";
import AIresponse from "./AIResponse";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeText() {
  const navigate = useNavigate();
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
    navigate(`/team/${team}`, { team });
  };

  return (
    <div className="main-container">
      <div className="maincopy">
        <img
          src="../../public/footymatch.png"
          alt="FootyMatch"
          className="footy"
        />
        <h1>Welcome to FootyMatch!</h1>
        <h3>Your Gateway to the World of Soccer.</h3>

        <p className="kalyn">
          Do you love sports like basketball, baseball, or hockey? We'll help
          you discover your perfect soccer team based on the sports you already
          love. Whether you're a die-hard fan or just curious about the world of
          soccer, we've got you covered.
        </p>
        <p className="kalyn">
          Get ready to find your new favorite soccer team and dive into the
          excitement of the beautiful game!
        </p>
        <div className="card-container">
          <div className="card">
            <p>
              Enter the names of one or more sports teams to discover your ideal
              soccer team match!
            </p>
            <AIresponse />
          </div>
          <div className="search-container">
            <div className="card smaller-card">
              <p>Already have a team in mind?</p>
              <input
                className="search"
                type="text"
                value={team}
                onChange={handleInputChange}
                placeholder="Enter Team"
              />
              <button
                className="match, search"
                type="submit"
                onClick={handleSearchClick}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
