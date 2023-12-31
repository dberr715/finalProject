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

  function capitalizeFirstLetter(string) {
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  const handleInputChange = (e) => {
    setTeam(e.target.value);
    setError(null); // Clear error when the input changes
  };

  const handleSearchClick = async () => {
    const teamCapitalized = capitalizeFirstLetter(team);
    const key = import.meta.env.VITE_FOOTBALL_API_KEY;
    const nameUrl = `https://api-football-v1.p.rapidapi.com/v3/teams?name=${teamCapitalized}`;
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

        navigate(`/team/${teamCapitalized}`);
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
            className="form__input searchbars"
            id="find-team"
            value={team}
            onChange={handleInputChange}
            placeholder="Enter FootyMatch Team"
            required=""
          />

          <button
            className="prev-next-button"
            type="submit"
            id="blacktext"
            onClick={handleSearchClick}
          >
            Search and Learn!
          </button>

          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
}
