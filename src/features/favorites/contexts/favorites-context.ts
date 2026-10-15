"use client";

import { createContext } from "react";

type FavoritesContextValue = {
  isFavorite: (jobId: string) => boolean;
  toggleFavorite: (jobId: string) => void;
};

export const FavoritesContext = createContext<FavoritesContextValue | null>(null);
