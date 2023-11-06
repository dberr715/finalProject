import React from "react";

export default function FavoritesButton({
  teamName,
  isFavorite,
  onToggleFavorite,
}) {
  const buttonText = isFavorite ? "Remove from Favorites" : "Add to Favorites";

  return <button onClick={onToggleFavorite}>{buttonText}</button>;
}
