"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { FavoritesContext } from "@/features/favorites/contexts/favorites-context";

const STORAGE_KEY = "coople:favorite-job-ids";

function readFavoriteIds(): string[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");

    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[] | null>(null);

  useEffect(() => {
    // Read browser storage after hydration to keep server and client markup consistent.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFavoriteIds(readFavoriteIds());
  }, []);

  useEffect(() => {
    if (favoriteIds === null) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch {
      return;
    }
  }, [favoriteIds]);

  const isFavorite = useCallback((jobId: string) => {
    return favoriteIds?.includes(jobId) ?? false;
  }, [favoriteIds]);

  const toggleFavorite = useCallback((jobId: string) => {
    setFavoriteIds((currentIds) => {
      if (currentIds === null) return currentIds;

      return currentIds.includes(jobId)
        ? currentIds.filter((id) => id !== jobId)
        : [...currentIds, jobId];
    });
  }, []);

  return <FavoritesContext value={{ isFavorite, toggleFavorite }}>{children}</FavoritesContext>;
}
