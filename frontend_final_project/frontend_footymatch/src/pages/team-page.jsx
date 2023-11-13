import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useAuth } from "../AuthContext";
import Navigation from "../components/Navigation";
import FavoritesButton from "../components/FavoritesButton";
import "../index.css";

export default function TeamPage() {
  const [isAlreadyInFavorites, setIsAlreadyInFavorites] = useState(false);
  const [favoriteMessage, setFavoriteMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [teamName, setTeamName] = useState("");

  const params = useParams();
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const [key, setKey] = useState(0);

  const [logo, setLogo] = useState("");
  const [country, setCountry] = useState("");
  const [stadium, setStadium] = useState("");
  const [stadiumPic, setStadiumPic] = useState("");
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [teamId, setTeamId] = useState("");
  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState("");
  const [time3, setTime3] = useState("");
  const [league1, setLeague1] = useState("");
  const [league2, setLeague2] = useState("");
  const [league3, setLeague3] = useState("");
  const [teamsHomeName1, setTeamsHomeName1] = useState("");
  const [teamsAwayName1, setTeamsAwayName1] = useState("");
  const [teamsHomeName2, setTeamsHomeName2] = useState("");
  const [teamsAwayName2, setTeamsAwayName2] = useState("");
  const [teamsHomeName3, setTeamsHomeName3] = useState("");
  const [teamsAwayName3, setTeamsAwayName3] = useState("");
  const [teamsHomeLogo1, setTeamsHomeLogo1] = useState("");
  const [teamsAwayLogo1, setTeamsAwayLogo1] = useState("");
  const [teamsHomeLogo2, setTeamsHomeLogo2] = useState("");
  const [teamsAwayLogo2, setTeamsAwayLogo2] = useState("");
  const [teamsHomeLogo3, setTeamsHomeLogo3] = useState("");
  const [teamsAwayLogo3, setTeamsAwayLogo3] = useState("");

  function displayPrompt(message) {
    setPromptMessage(message);
    setTimeout(() => setPromptMessage(""), 5000);
  }

  async function fetchData1() {
    // Your existing code for fetching team data
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

      if (response.ok) {
        const result = await response.json();
        const name = result.response[0].team.name;
        const logo = result.response[0].team.logo;
        const stadium = result.response[0].venue.name;
        const stadiumPic = result.response[0].venue.image;
        const country = result.response[0].team.country;
        const teamId = result.response[0].team.id;
        // console.log("RESULT FOR TEAM ID:", result);
        setTeamName(name);
        setLogo(logo);
        setStadium(stadium);
        setStadiumPic(stadiumPic);
        setCountry(country);
        setTeamId(teamId);
        fetchData2(teamId);
      } else {
        setError("Team not found. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setError(
        "That is not a professional soccer team, please check your spelling and try again!"
      );
    }
    // setTeamId(teamId);

    fetchFavoriteTeams();
  }

  async function fetchData2(teamId) {
    // Your existing code for fetching team data
    const key = import.meta.env.VITE_FOOTBALL_API_KEY;

    const idUrl = `https://api-football-v1.p.rapidapi.com/v3/fixtures?team=${teamId}&next=3`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": key,
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(idUrl, options);

      if (response.ok) {
        const result = await response.json();
        const fixtures = result.response;

        // Check if there are 3 or more fixtures
        if (fixtures.length >= 3) {
          const time1 = fixtures[0].fixture.date;
          const time2 = fixtures[1].fixture.date;
          const time3 = fixtures[2].fixture.date;
          const league1 = fixtures[0].league.name;
          const league2 = fixtures[1].league.name;
          const league3 = fixtures[2].league.name;
          const teamsHomeName1 = fixtures[0].teams.home.name;
          const teamsHomeName2 = fixtures[1].teams.home.name;
          const teamsHomeName3 = fixtures[2].teams.home.name;
          const teamsAwayName1 = fixtures[0].teams.away.name;
          const teamsAwayName2 = fixtures[1].teams.away.name;
          const teamsAwayName3 = fixtures[2].teams.away.name;
          const teamsHomeLogo1 = fixtures[0].teams.home.logo;
          const teamsHomeLogo2 = fixtures[1].teams.home.logo;
          const teamsHomeLogo3 = fixtures[2].teams.home.logo;
          const teamsAwayLogo1 = fixtures[0].teams.away.logo;
          const teamsAwayLogo2 = fixtures[1].teams.away.logo;
          const teamsAwayLogo3 = fixtures[2].teams.away.logo;

          setTime1(time1);
          setTime2(time2);
          setTime3(time3);
          setLeague1(league1);
          setLeague2(league2);
          setLeague3(league3);
          setTeamsHomeName1(teamsHomeName1);
          setTeamsHomeName2(teamsHomeName2);
          setTeamsHomeName3(teamsHomeName3);
          setTeamsAwayName1(teamsAwayName1);
          setTeamsAwayName2(teamsAwayName2);
          setTeamsAwayName3(teamsAwayName3);

          setTeamsHomeLogo1(teamsHomeLogo1);
          setTeamsHomeLogo2(teamsHomeLogo2);
          setTeamsHomeLogo3(teamsHomeLogo3);
          setTeamsAwayLogo1(teamsAwayLogo1);
          setTeamsAwayLogo2(teamsAwayLogo2);
          setTeamsAwayLogo3(teamsAwayLogo3);
        } else {
          // Handle the case when there are 1 or 2 upcoming games
          if (fixtures.length >= 1) {
            const time1 = fixtures[0].fixture.date;
            const league1 = fixtures[0].league.name;
            const teamsHomeName1 = fixtures[0].teams.home.name;
            const teamsAwayName1 = fixtures[0].teams.away.name;
            const teamsHomeLogo1 = fixtures[0].teams.home.logo;
            const teamsAwayLogo1 = fixtures[0].teams.away.logo;

            setTime1(time1);
            setLeague1(league1);
            setTeamsHomeName1(teamsHomeName1);
            setTeamsAwayName1(teamsAwayName1);
            setTeamsHomeLogo1(teamsHomeLogo1);
            setTeamsAwayLogo1(teamsAwayLogo1);
          }

          if (fixtures.length >= 2) {
            const time2 = fixtures[1].fixture.date;
            const league2 = fixtures[1].league.name;
            const teamsHomeName2 = fixtures[1].teams.home.name;
            const teamsAwayName2 = fixtures[1].teams.away.name;
            const teamsHomeLogo2 = fixtures[1].teams.home.logo;
            const teamsAwayLogo2 = fixtures[1].teams.away.logo;

            setTime2(time2);
            setLeague2(league2);
            setTeamsHomeName2(teamsHomeName2);
            setTeamsAwayName2(teamsAwayName2);
            setTeamsHomeLogo2(teamsHomeLogo2);
            setTeamsAwayLogo2(teamsAwayLogo2);
          }

          // Clear values for the third game card
          setTime3("");
          setLeague3("");
          setTeamsHomeName3("");
          setTeamsAwayName3("");
          setTeamsHomeLogo3("");
          setTeamsAwayLogo3("");
        }
      } else {
        setError("Team not found. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setError(
        "That is not a professional soccer team, please check your spelling and try again!"
      );
    }

    // After fetching data, check if the team is a favorite
    fetchFavoriteTeams();
  }

  async function handleFavoriteTeam(isFav) {
    const apiUrl = "http://localhost:8000/favorite-teams/"; // Correct API endpoint
    const token = localStorage.getItem("access_token");
    const user_id = localStorage.getItem("user_id");
    const data = { team_name: teamName, user: user_id };

    try {
      if (isFav) {
        const response = await fetch(apiUrl + teamId + "/", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          console.log("Team removed from favorites successfully.");
          setIsFavorite(false);
          setKey((prevKey) => prevKey + 1);
          console.log("Updated key:", key);
        } else {
          console.error("Failed to remove team from favorites.");
        }
      } else {
        console.log("FIRED FAVES");
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          console.log("Team added to favorites successfully.");
          setIsFavorite(true);
          setKey((prevKey) => prevKey + 1);
          console.log("Updated key:", key);
        } else {
          console.error("Failed to add team to favorites.");
        }
      }
      setIsFavorite(!isFav);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  const fetchFavoriteTeams = async () => {
    const access_token = localStorage.getItem("access_token");
    const url = "http://localhost:8000/favorite-teams/";

    try {
      // console.log("TRYING TO GET FAVORITE TEAM");
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
      // console.log("RESPONSE OK?", response.ok);
          if (response.ok) {
            const favoriteTeams = await response.json();
            const isFavorite = favoriteTeams.some(
              (team) =>
                team.team_name.toLowerCase() === params.teamname.toLowerCase()
            );
            setIsFavorite(isFavorite);

            // Grab the favorites for a user by their names
            // Take the array you get back (see Postman) and filter(?) it?
            // teams.filter(team => team.toLower() === teamname.toLower() ? {team_name, team_id: id} : {})
            // Return the ID of the entry based on the above (this should limit to one per user)

            // Take the name from the params, convert it to lowercase, check the database, return True & the ID if found
            // Return False is not found.
            // Converting to lowercase on both the database and URL side will "normalize" the spelling
            // If it does exist, add setTeamId([SOME ID VALUE]), then use `teamId` in your DELETE route API call

            // console.log(favoriteTeams);
            // return setIsFavorite(isFavorite);
          } else {
            console.error("Failed to fetch favorite teams.");
          }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // useEffect(() => {
  //   fetchData1();
  //   fetchFavoriteTeams();
  //   console.log("USE EFFECT RUNNING");
  // }, [key]);

  useEffect(() => {
    fetchData1();
  }, [key]);

  useEffect(() => {
    if (teamId) {
      fetchFavoriteTeams();
    }
  }, [teamId]);

  return (
    <>
      <Navigation isFavorite={isFavorite} currentTeamName={teamName} />
      <div className="teampage123">
        <div>
          {error ? (
            <p className="error-message">{error}</p>
          ) : (
            <>
              <div className="teamContainer">
                <div className="top-row">
                  <div className="team-logo-main">
                    <img src={logo} alt="Team Logo" className="tLogo" />
                  </div>
                  <div className="teamname-main">
                    <h1 className="teamname-inner">{teamName}</h1>
                  </div>
                  <div className="country-div">
                    <h2>{country}</h2>
                  </div>
                </div>
                          <div className="favorites-button-container">
                            {isAuth && (
                              <>
                                <FavoritesButton
                                  teamName={teamName}
                                  isFavorite={isFavorite}
                                  onToggleFavorite={handleFavoriteTeam}
                                />
                                {isFavorite && (
                                  <p style={{ color: "black" }}>{favoriteMessage}</p>
                                )}
                              </>
                            )}
                          </div>
                <h2 className="upcoming">Upcoming Games</h2>
                <div className="next-games">
                  <div className="game-card">
                    {time1 ? (
                      <>
                        <h3>{league1}</h3>
                        <h4>
                          {new Date(time1).toLocaleString("en-US", {
                            day: "numeric",
                            month: "short",
                            hour: "numeric",
                            minute: "numeric",
                          })}
                        </h4>

                        <div className="versus">
                          <img src={teamsHomeLogo1} alt="Home Team Logo" />
                          <h5>{teamsHomeName1}</h5>
                          <h2>V</h2>
                          <h5>{teamsAwayName1}</h5>
                          <img src={teamsAwayLogo1} alt="Away Team Logo" />
                        </div>
                      </>
                    ) : (
                      <p>No upcoming games</p>
                    )}
                  </div>
                  <div className="game-card">
                    {time2 ? (
                      <>
                        <h3>{league2}</h3>
                        <h4>
                          {new Date(time2).toLocaleString("en-US", {
                            day: "numeric",
                            month: "short",
                            hour: "numeric",
                            minute: "numeric",
                          })}
                        </h4>

                        <div className="versus">
                          <img src={teamsHomeLogo2} alt="Home Team Logo" />
                          <h5>{teamsHomeName2}</h5>
                          <h2>V</h2>
                          <h5>{teamsAwayName2}</h5>
                          <img src={teamsAwayLogo2} alt="Away Team Logo" />
                        </div>
                      </>
                    ) : (
                      <p>No upcoming games</p>
                    )}
                  </div>
                  <div className="game-card">
                    {time3 ? (
                      <>
                        <h3>{league3}</h3>
                        <h4>
                          {new Date(time3).toLocaleString("en-US", {
                            day: "numeric",
                            month: "short",
                            hour: "numeric",
                            minute: "numeric",
                          })}
                        </h4>

                        <div className="versus">
                          <img src={teamsHomeLogo3} alt="Home Team Logo" />
                          <h5>{teamsHomeName3}</h5>
                          <h2>V</h2>
                          <h5>{teamsAwayName3}</h5>
                          <img src={teamsAwayLogo3} alt="Away Team Logo" />
                        </div>
                      </>
                    ) : (
                      <p>No upcoming games</p>
                    )}
                  </div>
                </div>
                <div className="team-images">
                  <figure>
                    <figcaption>{stadium}</figcaption>
                    <img
                      src={stadiumPic}
                      alt="Stadium Pic"
                      className="stadium"
                    />
                  </figure>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
