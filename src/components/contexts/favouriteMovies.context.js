import React, { createContext, useState, useMemo } from "react";
import { db } from "../../../firebase";
import { auth } from "../../../firebase";

//context is used for allowing the data to be accessed from any of the app components
export const FavouriteMoviesContext = createContext([]);

function FavouriteMoviesContextProvider({ children }) {
  const user = auth.currentUser;
  const [favouriteMovies, setFavouriteMovies] = useState([]);

  function updateFavouriteMovies(newFavourites) {
    setFavouriteMovies([]);
    setFavouriteMovies(newFavourites);
    const docRef = db.collection("users").doc(`${user?.uid}`);
    docRef.get().then((doc) => {
      if (doc.exists) {
        docRef.update({ favMovies: newFavourites });
      }
    });
    // console.log(favouriteMovies);
  }

  function resetFavouriteMoviesAfterLogOut() {
    setFavouriteMovies([]);
    // console.log(favouriteMovies);
  }

  return (
    <FavouriteMoviesContext.Provider
      value={useMemo(
        () => ({
          favouriteMovies,
          updateFavouriteMovies,
          setFavouriteMovies,
          resetFavouriteMoviesAfterLogOut,
        }),
        [favouriteMovies, updateFavouriteMovies]
      )}
    >
      {children}
    </FavouriteMoviesContext.Provider>
  );
}

export default FavouriteMoviesContextProvider;
