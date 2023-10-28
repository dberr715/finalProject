import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "../index.css";

export default function Navigation() {
  const { isAuth } = useAuth();
  return (
    <div className="navigation">
      <div className="active" href="#home">
        {isAuth ? <Link to="/">Home</Link> : null}
      </div>



{/* Need to link to Favorite dropdown/page here */}
      <div href="#Favorites">Favorites</div> 
      <div href="#Log-in">
        {" "}
        {isAuth ? (
          <Link to="/login">Login</Link>
        ) : (
          <Link to="/logout">Logout</Link>
        )}
      </div>
    </div>
  );
}
