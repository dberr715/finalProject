import { Outlet } from "react-router-dom";
import { AuthProvider } from "../AuthContext";
import Navigation from "../components/navigation";
import HomeText from "../components/HomeText";


export default function Root() {
  return (
    <AuthProvider>
      <Navigation />

      <main>
        <Outlet />
      </main>
    </AuthProvider>
  );
}
