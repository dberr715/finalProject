import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Routes } from "react-router-dom";
import ErrorPage from "./pages/error-page";
import Root from "./routes/root";
import Home from "./pages/home-page";
import LoginPage from "./pages/login-page";
// import LogoutPage, { logoutLoader } from "./pages/logout-page";
import LogoutPage from "./pages/logout-page";
import CreateAccount from "./pages/create-account-page";
import "./index.css";
import TeamPage from "./pages/team-page";
import Live from "./components/Live";
import GameDetails from "./pages/game-details";
// import { PrivateRoute } from "./components/PrivateRoute";
import HomePage from "./pages/home-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login/",
        element: <LoginPage />,
      },
      {
        path: "game/:id",
        element: <GameDetails />,
      },
      {
        path: "live/",
        element: <Live />,
      },
      {
        path: "team/:teamname",
        element: <TeamPage />,
      },
      {
        path: "logout/",
        element: <LogoutPage />,
        // loader: logoutLoader,
      },
      {
        path: "create/",
        element: <CreateAccount />,
      },
      {
        path: "home/",
        element: <HomePage />,
      },

      // {
      //   path: "home/*",
      //   element: <PrivateRoute element={<HomePage />} />,
      // },
    ],
  },
]);

if (window.location.pathname === "/") {
  window.location.pathname = "/login/";
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <Routes />
    </RouterProvider>
  </React.StrictMode>
);
