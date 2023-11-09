import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
// import "../styles/live.css"; // Import your CSS file

export default function Live() {
  const [fixtures, setFixtures] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [leagues, setLeagues] = useState([]);

  const filteredFixtures = selectedLeague
    ? fixtures.filter((fixture) => fixture.league.name === selectedLeague)
    : fixtures;

  useEffect(() => {
    const key = import.meta.env.VITE_FOOTBALL_API_KEY;

    const fetchFixtures = async () => {
      const pageSize = 10;
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      const url = "https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": key,
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();

        const sortedFixtures = data.response.sort(
          (a, b) => b.fixture.elapsed - a.fixture.elapsed
        );

        const fixturesToDisplay = sortedFixtures.slice(startIndex, endIndex);

        setFixtures(fixturesToDisplay);

        const uniqueLeagues = [
          ...new Set(sortedFixtures.map((fixture) => fixture.league.name)),
        ];
        setLeagues(uniqueLeagues);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFixtures();
  }, [currentPage]);

  const handleLeagueFilter = (league) => {
    if (league === selectedLeague) {
      setSelectedLeague(null);
    } else {
      setSelectedLeague(league);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = fixtures.length < 10;

  const createNoGamesCard = () => (
    <div className="no-games-card">
      <h3>No current games with this filter!</h3>
      <p>Check back later for updates or try a different filter.</p>
    </div>
  );

  return (
    <>
      <Navigation />
      <div className="livepage">
        <img
          src="../../public/newfootymatch.png"
          alt="FootyMatch"
          className="footy"
        />
        <h1 className="livegames">Live Games</h1>
        <div className="league-filter-bar">
          <button
            className={`league-button   ${selectedLeague ? "" : "selected"}`}
            onClick={() => handleLeagueFilter(null)}
          >
            All Leagues
          </button>
          {leagues.length > 0 && (
            <select
              className="league-dropdown"
              onChange={(e) => handleLeagueFilter(e.target.value)}
            >
              <option value="">All Leagues</option>
              {leagues.map((league) => (
                <option key={league} value={league}>
                  {league}
                </option>
              ))}
            </select>
          )}
        </div>
        {filteredFixtures.length === 0 ? (
          <div className="live-matches-container">{createNoGamesCard()}</div>
        ) : (
          <>
            <div className="live-matches-container">
              {filteredFixtures.map((score) => (
                <div key={score.fixture.id} className="match">
                  <div className="match-header">
                    <div className="match-tournament">
                      <div className="tournament-info">
                        <img src={score.league.logo} alt="League Logo" />
                        <div className="league-name">{score.league.name}</div>
                      </div>
                    </div>
                    <div className="match-actions"></div>
                  </div>
                  <div className="match-content">
                    <div className="column">
                      <div className="team team--home">
                        <div className="team-logo">
                          <img
                            src={score.teams.home.logo}
                            alt={score.teams.home.name}
                          />
                        </div>
                        <h2 className="team-name">{score.teams.home.name}</h2>
                      </div>
                    </div>
                    <div className="column">
                      <div className="match-details">
                        <div className="match-date">
                          {new Date(score.fixture.date).toLocaleString(
                            "en-US",
                            {
                              day: "numeric",
                              month: "short",
                              hour: "numeric",
                              minute: "numeric",
                            }
                          )}
                        </div>
                        <div className="match-score">
                          <span className="match-score-number match-score-number--leading">
                            {score.goals.home}
                          </span>
                          <span className="match-score-divider">:</span>
                          <span className="match-score-number">
                            {score.goals.away}
                          </span>
                        </div>
                        <div className="match-time-lapsed">
                          {score.fixture.status.elapsed}'
                        </div>
                        <div className="match-referee">
                          Referee: <strong>{score.fixture.referee}</strong>
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <div className="team team--away">
                        <div className="team-logo">
                          <img
                            src={score.teams.away.logo}
                            alt={score.teams.away.name}
                          />
                        </div>
                        <h2 className="team-name">{score.teams.away.name}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pagination-buttons">
              <button
                className={`prev-next-button  ${isFirstPage ? "disabled" : ""}`}
                type="submit"
                onClick={handlePreviousPage}
                disabled={isFirstPage}
              >
                Previous Page
              </button>
              <button
                className={`prev-next-button  ${isLastPage ? "disabled" : ""}`}
                type="submit"
                onClick={handleNextPage}
                disabled={isLastPage}
              >
                Next Page
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
