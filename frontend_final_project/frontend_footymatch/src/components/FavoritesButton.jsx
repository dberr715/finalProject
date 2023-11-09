import React from "react";

export default function FavoritesButton({ isFavorite, onToggleFavorite }) {
  return (
    // To this ->
    <button onClick={() => onToggleFavorite(isFavorite)}>
      {isFavorite ? "★ Remove Favorite" : "☆ Add Favorite"}
    </button>
  );
}
