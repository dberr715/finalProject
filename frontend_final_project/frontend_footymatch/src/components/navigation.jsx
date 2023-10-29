import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "../index.css";

export default function Navigation() {
  const { isAuth } = useAuth();
  return (
    <div>
      <div>
        <Link to="/">Home</Link>
        {/* {isAuth ? <Link to="/">Home</Link> : null} */}
      </div>

      {/* Need to link to Favorite dropdown/page here */}
      <div>Favorites</div>
      <div>
        {" "}
        {isAuth ? (
          <Link to="/login">Login</Link>
        ) : (
          <Link to="/logout">Logout</Link>
        )}
      </div>
      <div>
        <Link to="/create">Create Account</Link>
      </div>
    </div>
  );
}
