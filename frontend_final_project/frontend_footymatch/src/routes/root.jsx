import { AuthProvider } from "../AuthContext";
import Navigation from "../components/Navigation";
import React, { useState } from "react";

import { Outlet } from "react-router";
import "../index.css";

export default function Root() {
  return (
    <AuthProvider>
      <main>
        <Outlet />
      </main>
    </AuthProvider>
  );
}
