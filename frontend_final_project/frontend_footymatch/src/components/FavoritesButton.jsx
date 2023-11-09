import React from "react";

export default function FavoritesButton({ isFavorite, onToggleFavorite }) {
  return (
    // To this ->
    <button
      className={`favebut ${isFavorite ? "remove-favorite" : "add-favorite"}`}
      onClick={() => onToggleFavorite(isFavorite)}
    >
      {isFavorite ? "★ Remove Favorite" : "☆ Add Favorite"}
    </button>
  );
}
