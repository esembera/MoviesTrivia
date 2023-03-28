import { createContext, useState, useMemo } from "react";
import React from "react";

export const FavouriteMoviesContext = createContext([]);

function FavouriteMoviesContextProvider({ children }) {
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  function updateFavouriteMovies(newFavourites) {
    setFavouriteMovies([]);
    setFavouriteMovies(newFavourites);
  }

  return (
    <FavouriteMoviesContext.Provider
      value={useMemo(
        () => ({ favouriteMovies, updateFavouriteMovies }),
        [favouriteMovies, updateFavouriteMovies]
      )}
    >
      {children}
    </FavouriteMoviesContext.Provider>
  );
}

export default FavouriteMoviesContextProvider;
