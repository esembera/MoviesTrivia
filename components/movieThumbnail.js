import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
} from "react-native";
import React, { useContext } from "react";
import { MOVIESDB_IMAGE_URL } from "@env";
import { FavouriteMoviesContext } from "./favouriteMovies.context";

const MovieThumbnail = ({ imageURL, movieName, movieId }) => {
  const { favouriteMovies, updateFavouriteMovies } = useContext(
    FavouriteMoviesContext
  );

  function addOrRemoveFromFavourites(id) {
    let tempFavourites = [];
    let flag = 0;
    favouriteMovies.forEach((movieId) => {
      if (movieId == id) {
        flag = 1;
        return;
      }
      tempFavourites.push(movieId);
    });
    if (flag == 0) {
      tempFavourites.push(id);
    }
    updateFavouriteMovies(tempFavourites);
  }

  function isInFavourites(id) {
    return favouriteMovies.includes(id);
  }

  let sourceURL = `${MOVIESDB_IMAGE_URL}${imageURL}`;

  return (
    <View>
      <TouchableOpacity
        style={styles.movieThumbnail}
        onPress={() => addOrRemoveFromFavourites(movieId)}
      >
        <ImageBackground
          source={{ uri: sourceURL }}
          style={styles.image}
          imageStyle={{ borderRadius: 10, opacity: 0.55 }}
          cache="force-cache"
          progressiveRenderingEnabled={true}
        >
          <Text style={styles.movieTitle}>{movieName}</Text>
          {isInFavourites(movieId) && (
            <Image
              style={styles.favourited}
              source={require("../assets/pictures/yellow_star.png")}
              cache="force-cache"
              progressiveRenderingEnabled={true}
            ></Image>
          )}
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  movieThumbnail: {
    margin: 15,
    borderRadius: 10,
    width: 101,
    height: 153,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  movieTitle: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  favourited: {
    width: 20,
    height: 20,
  },
});

export default MovieThumbnail;
