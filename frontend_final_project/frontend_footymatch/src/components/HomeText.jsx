import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import AIresponse from "./AIResponse";

export default function HomeText() {
  const navigate = useNavigate();
  const [team, setTeam] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function capitalizeFirstLetter(string) {
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  
const handleInputChange = (event) => {
  const inputValue = event.target.value; // Get the input value
  const capitalizedValue = capitalizeFirstLetter(inputValue); // Capitalize the first letter of each word
  setTeam(capitalizedValue); // Update the state with the capitalized value
  setErrorMessage(""); // Clear any previous error message when input changes
};

const handleSearchClick = async () => {
  setLoading(true);

  try {
    const isValidTeam = await validateTeamName(team);
    if (isValidTeam) {
      // Perform the desired action when it's a valid team (e.g., navigate to the team page)
      navigate(`/team/${team}`, { team });
    } else {
      setErrorMessage("Not a team. Check spelling and try again");
    }
  } catch (error) {
    console.error("Error validating team:", error);
    setErrorMessage("An error occurred while validating the team name");
  } finally {
    setLoading(false);
  }
};

  // Helper function to validate the team name using footballAPI
  const validateTeamName = async (teamName) => {
    try {
      // You can make a fetch request to the footballAPI to check if the team exists
      const response = await fetch(
        `https://api-football-v1.p.rapidapi.com/v3/teams?name=${teamName}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": import.meta.env.VITE_FOOTBALL_API_KEY,
            "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        const teamExists = result.response.length > 0;
        return teamExists;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error validating team name:", error);
      return false;
    }
  };

  return (
    <div className="home-container-outer">
      <img
        src="../../public/newfootymatch.png"
        alt="FootyMatch"
        className="footy"
      />
      <div className="home-container">
        <div className="top-container">
          <div className="intro-container card1">
            <h3>Your Gateway to the World of Soccer.</h3>
            <p>
              Do you love sports like basketball, baseball, or hockey? We'll
              help you discover your perfect soccer team based on the sports you
              already love. Whether you're a die-hard fan or just curious about
              the world of soccer, we've got you covered.
            </p>
            <p>
              Get ready to find your new favorite soccer team and dive into the
              excitement of the beautiful game!
            </p>
            <div className="match-container">
              <div className="match-find-container card1">
                <p>
                  Enter the names of one or more sports teams to discover your
                  ideal soccer team match!
                </p>
                <AIresponse />
              </div>
            </div>
          </div>
          <div className="search-container">
            <div className="card1">
              <p>Already have a team in mind?</p>
                {errorMessage && <p className="error-message" style={{ fontSize: 14, color: "red"}}>{errorMessage}</p>}
              <div className="form__group">
                <input
                  type="text"
                  className="form__input"
                  id="name"
                  value={team}
                  onChange={handleInputChange}
                  placeholder="Soccer Team Name"
                  required=""
                />
                <label htmlFor="name" className="form__label">
                  Soccer Team Name
                </label>
                <button
                  className="match, search, searchbutton"
                  type="submit"
                  onClick={handleSearchClick}
                  disabled={loading}
                >
                  {loading ? "Validating..." : "Find Team"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
