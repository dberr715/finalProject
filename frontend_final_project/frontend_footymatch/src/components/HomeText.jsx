import "../index.css";
import AIresponse from "./AIResponse";
export default function HomeText() {
  return (
    <>
      <h1>Welcome to FootyMatch!</h1>

      {/* <form>
        <label>
          <input type="text" placeholder="🏀🏈⚾️🎾" />
          <button type="submit">Match!</button>
        </label>
      </form> */}
      <h4>⚽️Find your new soccer team to support⚽️</h4>
      <p>
        Type 1 or more other sports teams you like to figure out which soccer
        team to follow!{" "}
      </p>
      <AIresponse />
      <br/>
      <h4>Already have a team?</h4>
      <h5>Search for it below!</h5>

      <input type="text" placeholder="🔍" />
      <button type="submit">Search</button>
    </>
  );
}
