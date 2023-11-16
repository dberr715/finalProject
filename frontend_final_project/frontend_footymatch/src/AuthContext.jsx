import { createContext, useContext, useState, useEffect } from "react";
import "./index.css";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, [isAuth]);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, username }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
