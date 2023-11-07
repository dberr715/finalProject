import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResponseModal({ rec, onClose }) {
  const navigate = useNavigate();
  const [team, setTeam] = useState("");
  const [teamName, setTeamName] = useState("");
  const [logo, setLogo] = useState("");
  const [country, setCountry] = useState("");
  const [stadium, setStadium] = useState("");
  const [stadiumPic, setStadiumPic] = useState("");
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setTeam(e.target.value);
  };

  const handleSearchClick = async () => {
    // API fetch logic
    const key = import.meta.env.VITE_FOOTBALL_API_KEY;
    const nameUrl = `https://api-football-v1.p.rapidapi.com/v3/teams?name=${team}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": key,
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(nameUrl, options);

      if (response.ok) {
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

        navigate(`/team/${team}`);
      } else {
        setError("Team not found. Please try again.");
      }
    } catch (error) {
      setError(
        "That is not a professional soccer team. Please check your spelling and try again."
      );
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Your FootyMatch: </h2>
        <p>{rec}</p>

        <div className="form__group">
          <input
            type="text"
            className="form__input"
            id="name"
            value={team}
            onChange={handleInputChange}
            placeholder="Enter FootyMatch Team"
            required=""
          />
          <label for="name" className="form__label">
            Enter FootyMatch Team
          </label>
          <button
            className="match, search"
            id="modal-search-button"
            type="submit"
            onClick={handleSearchClick}
          >
            Search and Learn!
          </button>
        </div>
      </div>
      {error && (
        // Display the error message if an error occurred
        <p className="error-message">{error}</p>
      )}
    </div>
  );
}
