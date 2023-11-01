import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/error-page";
// import { Navigate } from "react-router-dom";
import Root from "./routes/root";
// import Home, { loader as homeLoader } from "./pages/home-page";
import Home from "./pages/home-page";
import { redirect } from "react-router-dom";
import LoginPage from "./pages/login-page";
import LogoutPage, { logoutLoader } from "./pages/logout-page";
import CreateAccount from "./pages/create-account-page";
import "./index.css";
import TeamPage from "./pages/team-page";
import LeagueTables from "./pages/league-tables";

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
        path: "table/",
        element: <LeagueTables />,
      },
      {
        path: "team/:teamname",
        // path: "team/",
        element: <TeamPage />,
      },
      {
        path: "logout/",
        element: <LogoutPage />,
        loader: logoutLoader,
      },
      {
        path: "create/",
        element: <CreateAccount />,
      },

      {
        path: "home/",
        element: <Home />,
        // loader: homeLoader,
      },
    ],
  },
  // {
  //   path: "home/",
  //   element: <Home />,
  //   loader: homeLoader,
  //   errorElement: <ErrorPage />,
  // },
]);

if (window.location.pathname === "/") {
  window.location.pathname = "/home/";
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
