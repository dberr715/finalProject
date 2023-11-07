import React from "react";

export default function FavoritesButton({
  teamName,
  isFavorite,
  onToggleFavorite,
}) {
  const buttonText = isFavorite ? "Remove from Favorites" : "Add to Favorites";

  return <button onClick={onToggleFavorite}>{buttonText}</button>;
}

// FavoritesButton.js
// import React from "react";

// function FavoritesButton({ isFavorite, onToggleFavorite, teamName }) {
//   return (
//     <div
//       className={`fave-button ${isFavorite ? "favorited" : ""}`}
//       onClick={onToggleFavorite}
//     >
//       <svg
//         className="star-icon"
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 24 24"
//       >
//         <path
//           d="M12 2.29l1.95 4.5h4.77l-3.63 2.97 1.95 4.5-4.98-3.82-4.98 3.82 1.95-4.5-3.63-2.97h4.77z"
//           fill={isFavorite ? "yellow" : "white"}
//         />
//         <path d="M0 0h24v24H0z" fill="none" />
//       </svg>
//     </div>
//   );
// }

// export default FavoritesButton;
