import { Link } from "react-router-dom";
import HomeText from "../components/HomeText";
import React from "react";
import Navigation from "../components/PrimaryNavigation";

import { useAuth } from "../AuthContext";

export default function HomePage() {
  const { isAuth } = useAuth();

  return (
    <>
      <Navigation />
      <div>
        {isAuth ? (
          <HomeText />
        ) : (
          <div>
            <h1>You must log in first</h1>
            <Link to="/login">
              <span className="login1">Login</span>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
