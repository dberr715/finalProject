import { Outlet } from "react-router-dom";
import { AuthProvider } from "../AuthContext";
import Navigation from "../components/navigation";
import React, { useState } from "react";
import HomeText from "../components/HomeText";
import TeamPage from "../pages/team-page";


export default function Root() {
  const [searchedTeam, setSearchedTeam] = useState("");
  const handleSearch = (team) => {
    setSearchedTeam(team);
  };
  return (
    
    <AuthProvider>
      <main>
      <Navigation />
      <HomeText onSearch={handleSearch} />
      <TeamPage team={searchedTeam} />
      
        {/* <Outlet /> */}
      </main>
    </AuthProvider>
  );
}
