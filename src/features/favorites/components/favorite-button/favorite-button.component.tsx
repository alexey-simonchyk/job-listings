"use client";

import { useFavorites } from "../../hooks/use-favorites";
import styles from "./favorite-button.module.css";

export function FavoriteButton({ jobId, jobTitle }: { jobId: string; jobTitle: string | null }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(jobId);

  return (
    <button
      type="button"
      className={styles.button}
      aria-label={`Favorite job: ${jobTitle || "Untitled job"}`}
      aria-pressed={favorite}
      onClick={() => toggleFavorite(jobId)}
    >
      <span aria-hidden="true">{favorite ? "★" : "☆"}</span>
      {favorite ? "Saved" : "Save"}
    </button>
  );
}
