import React from "react";

export default function FavoritesButton({ isFavorite, onToggleFavorite }) {
  return <button onClick={onToggleFavorite}>{isFavorite ? "★" : "☆"}</button>;
}
