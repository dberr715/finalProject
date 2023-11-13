import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AIResponse from "./AIResponse";
import ResponseModal from "./ResponseModal";

export default function HomeText() {
  const navigate = useNavigate();
  const [team, setTeam] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalRec, setModalRec] = useState("");

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setTeam(inputValue);
    setErrorMessage("");
  };

  const handleSearchClick = async () => {
    const teamCapitalized =
      team &&
      team
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");

    if (!teamCapitalized) {
      setError("Please enter a team name.");
      return;
    }

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
        const teamExists = result.response.length > 0;

        if (teamExists) {
          navigate(`/team/${teamCapitalized}`);
        } else {
          setError("Team not found. Please try again.");
        }
      } else {
        setError("An error occurred. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="home-container-outer">
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
            <p className="copy">
              Get ready to find your new favorite soccer team and dive into the
              excitement of the beautiful game!
            </p>
            <div className="match-container">
              <AIResponse
                openModal={(rec) => {
                  setModalRec(rec);
                  setIsModalOpen(true);
                }}
              />

              <div className="card1 card2">
                <p id="already">Already have a team in mind?</p>
                {errorMessage && (
                  <p
                    className="error-message"
                    style={{ fontSize: 14, color: "red" }}
                  >
                    {errorMessage}
                  </p>
                )}

                <input
                  type="text"
                  className="form__input searchbars searchboi"
                  value={team}
                  onChange={handleInputChange}
                  placeholder="Soccer Team Name"
                  required=""
                />

                <button
                  className="match, search, searchbutton"
                  type="submit"
                  id="find-team"
                  onClick={handleSearchClick}
                  disabled={loading}
                >
                  {loading ? "Validating..." : "Find Team"}
                </button>
              </div>
            </div>
          </div>
          {isModalOpen && (
            <ResponseModal
              rec={modalRec}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
