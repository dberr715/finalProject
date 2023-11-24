import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function LogoutPage() {
  const { setIsAuth } = useAuth();
  const navigate = useNavigate();

  const performLogout = async () => {
    const url = "https://footymatch1.onrender.com/logout/";
    // const url = "https://localhost/logout/";

    const refresh_token = localStorage.getItem("refresh_token");
    const access_token = localStorage.getItem("access_token");

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({ refresh_token }),
      });

      if (response.status === 205) {
        localStorage.clear();
        setIsAuth(false);
        navigate(`/login`);
      } else {
        console.error("ERROR", response.status, response.statusText);
        navigate(`/login`);
      }
    } catch (error) {
      console.error("ERROR", error);
      navigate(`/login`);
    }
  };

  useEffect(() => {
    performLogout();
  }, [navigate, setIsAuth]);

  return <div>Logging out...</div>;
}
