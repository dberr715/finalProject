import React from "react";

export default function FavoritesButton({ isFavorite, onToggleFavorite }) {
  console.log({ isFavorite });
  return (
    <button onClick={onToggleFavorite(isFavorite)}>
      {isFavorite ? "★" : "☆"}
    </button>
  );
}
