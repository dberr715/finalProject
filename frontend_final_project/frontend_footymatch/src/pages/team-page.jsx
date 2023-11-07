import React, { useState, useEffect } from "react";
import { useParams, useNavigate, redirect } from "react-router-dom";
import { useRevalidator } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Navigation from "../components/Navigation";
import FavoritesButton from "../components/FavoritesButton"; // Correct import path
import "../index.css";

export default function TeamPage() {
  const revalidator = useRevalidator();
  const params = useParams();
  const { isAuth } = useAuth();
  const [teamName, setTeamName] = useState("");
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
        console.log("RESULT FOR TEAM ID:", result);
        setTeamName(name);
        setLogo(logo);
        setStadium(stadium);
        setStadiumPic(stadiumPic);
        setCountry(country);
        setTeamId(teamId);
        console.log("FIRST FETCH:", teamId);
        fetchData2(teamId);
        console.log({ teamName });
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

  async function fetchData2(teamId) {
    // Your existing code for fetching team data
    const key = import.meta.env.VITE_FOOTBALL_API_KEY;

    const idUrl = `https://api-football-v1.p.rapidapi.com/v3/fixtures?team=${teamId}&next=3`;
    //  const nameUrl = `https://api-football-v1.p.rapidapi.com/v3/teams?name=${params.teamname}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": key,
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(idUrl, options);
      console.log("RESPONSE:", response);
      if (response.ok) {
        const result = await response.json();
        console.log("RESULT:", result.response);
        const time1 = result.response[0].fixture.date;
        const time2 = result.response[1].fixture.date;
        const time3 = result.response[0].fixture.date;
        const league1 = result.response[0].league.name;
        const league2 = result.response[1].league.name;
        const league3 = result.response[2].league.name;
        const teamsHomeName1 = result.response[0].teams.home.name;
        const teamsHomeName2 = result.response[1].teams.home.name;
        const teamsHomeName3 = result.response[2].teams.home.name;
        const teamsAwayName1 = result.response[0].teams.away.name;
        const teamsAwayName2 = result.response[1].teams.away.name;
        const teamsAwayName3 = result.response[2].teams.away.name;
        const teamsHomeLogo1 = result.response[0].teams.home.logo;
        const teamsHomeLogo2 = result.response[1].teams.home.logo;
        const teamsHomeLogo3 = result.response[2].teams.home.logo;
        const teamsAwayLogo1 = result.response[0].teams.away.logo;
        const teamsAwayLogo2 = result.response[1].teams.away.logo;
        const teamsAwayLogo3 = result.response[2].teams.away.logo;

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
  console.log("Time1: ", time1);
  console.log("Time2: ", time2);
  console.log("Time3: ", time3);
  // Function to add or remove a team from favorites
  async function handleFavoriteTeam() {
    const apiUrl = "http://localhost:8000/favorite-teams/"; // Correct API endpoint
    const token = localStorage.getItem("access_token");
    const user_id = localStorage.getItem("user_id");
    const data = { team_name: teamName, user: user_id };

    try {
      if (isFavorite) {
        // Remove from favorites
        const response = await fetch(apiUrl + teamName + "/", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          console.log("Team removed from favorites successfully.");
          setIsFavorite(false);
          revalidator.revalidate();
        } else {
          console.error("Failed to remove team from favorites.");
        }
      } else {
        // Add to favorites
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
        } else {
          console.error("Failed to add team to favorites.");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  // console.log({ isFavorite });
  console.log({ params });
  // Fetch the user's favorite teams and check if the current team is a favorite
  const fetchFavoriteTeams = async () => {
    console.log("FETCHING FAVORITE TEAM");

    const access_token = localStorage.getItem("access_token");
    const url = "http://localhost:8000/favorite-teams/";

    try {
      console.log("TRYING TO GET FAVORITE TEAM");
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log("RESPONSE OK?", response.ok);
      if (response.ok) {
        console.log("INSIDE");
        const favoriteTeams = await response.json();
        const isFavorite = favoriteTeams.some(
          (team) => team.team_name === params.teamname
        );

        console.log(favoriteTeams);
        return setIsFavorite(isFavorite);
      } else {
        console.error("Failed to fetch favorite teams.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData1();
    fetchFavoriteTeams();
    console.log("HERE");
  }, []);

  return (
    <>
      <Navigation />
      <div>
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <>
            <div className="teamContainer">
              <div className="top-row">
                <div className="teamname-main">
                  <h1>{teamName}</h1>
                  <p>{country}</p>
                </div>
                <div className="team-logo-main">
                  <img src={logo} alt="Team Logo" />
                </div>

                <div className="fave-button">
                  {" "}
                  {isAuth && (
                    <FavoritesButton
                      teamName={teamName}
                      isFavorite={isFavorite}
                      onToggleFavorite={() => handleFavoriteTeam()}
                    />
                  )}
                </div>
              </div>
              <div className="team-images">
                <figure>
                  <figcaption>{stadium}</figcaption>
                  <img src={stadiumPic} alt="Stadium Pic" />
                </figure>
              </div>
              <h2 className="upcoming">Upcoming Games</h2>
              <div className="next-games">
                <div className="game-card">
                  <h3>{league1}</h3>
                  <h4>{time1}</h4>
                  <div className="versus">
                    <img src={teamsHomeLogo1} alt="Home Team Logo" />
                    <h5>{teamsHomeName1}</h5>
                    <h2> V</h2>
                    <h5>{teamsAwayName1}</h5>
                    <img src={teamsAwayLogo1} alt="Home Team Logo" />
                  </div>
                </div>
                <div className="game-card">
                  <h3>{league2}</h3>
                  <h4>{time2}</h4>
                  <div className="versus">
                    <img src={teamsHomeLogo2} alt="Home Team Logo" />
                    <h5>{teamsHomeName2}</h5>
                    <h2>V</h2>
                    <h5>{teamsAwayName2}</h5>
                    <img src={teamsAwayLogo2} alt="Home Team Logo" />
                  </div>
                </div>
                <div className="game-card">
                  <h3>{league3}</h3>
                  <h4>{time3}</h4>
                  <div className="versus">
                    <img src={teamsHomeLogo3} alt="Home Team Logo" />
                    <h5>{teamsHomeName3}</h5>
                    <h2>V</h2>
                    <h5>{teamsAwayName3}</h5>
                    <img src={teamsAwayLogo3} alt="Home Team Logo" />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

//   return (
//     <>
//       <Navigation />
//       <div>
//         {error ? (
//           <p className="error-message">{error}</p>
//         ) : (
//           <>
//             <p>Team ID: {teamId}</p>
//             <p>Country: {country}</p>
//             <p>Team Name: {teamName}</p>
//             <img src={logo} alt="Team Logo" />

//             <p>Stadium Name: {stadium}</p>
//             <img src={stadiumPic} alt="Stadium Pic" />
//             {isAuth && (
//               <FavoritesButton
//                 teamName={teamName} // Pass the teamName as a prop
//                 isFavorite={isFavorite} // Pass isFavorite as a prop
//                 onToggleFavorite={() => handleFavoriteTeam()} // Pass the function to toggle favorite as a prop
//               />
//             )}
//             <h2>Next Games</h2>
//             <h3>League:{league1}</h3>
//             <h4>Time: {time1}</h4>
//             <img src={teamsHomeLogo1} alt="Home Team Logo" />
//             <p>Home:{teamsHomeName1}</p>
//             <p>vs.</p>
//             <p>Away: {teamsAwayName1}</p>
//             <img src={teamsAwayLogo1} alt="Away Team Logo" />
//             <h3>League:{league2}</h3>
//             <h4>Time: {time2}</h4>
//             <img src={teamsHomeLogo2} alt="Home Team Logo" />
//             <p>Home:{teamsHomeName2}</p>
//             <p>vs.</p>
//             <p>Away: {teamsAwayName2}</p>
//             <img src={teamsAwayLogo2} alt="Away Team Logo" />
//             <h3>League:{league3}</h3>
//             <h4>Time: {time3}</h4>
//             <img src={teamsHomeLogo3} alt="Home Team Logo" />
//             <p>Home:{teamsHomeName3}</p>
//             <p>vs.</p>
//             <p>Away: {teamsAwayName3}</p>
//             <img src={teamsAwayLogo3} alt="Away Team Logo" />
//           </>
//         )}
//       </div>
//     </>
//   );
// }
