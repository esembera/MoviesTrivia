import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
} from "react-native";
import React, { useContext, useState, createContext } from "react";
import { MOVIESDB_IMAGE_URL } from "@env";
import { FavouriteMoviesContext } from "./contexts/favouriteMovies.context";
import FadeInFadeOutAnimation from "../assets/animations/fadeInFadeOutAnimation";

export const AddedOrRemovedContext = createContext(false);

const MovieThumbnail = ({ imageURL, movieName, movieId }) => {
  const { favouriteMovies, updateFavouriteMovies } = useContext(
    FavouriteMoviesContext
  );

  const [isAdded, setIsAdded] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  function addOrRemoveFromFavourites(id) {
    let tempFavourites = [];
    let flag = 0;
    favouriteMovies.forEach((movieId) => {
      if (movieId == id) {
        setIsRemoved(true);
        setIsAdded(false);
        flag = 1;
        return;
      }
      tempFavourites.push(movieId);
    });
    if (flag == 0) {
      setIsAdded(true);
      setIsRemoved(false);
      tempFavourites.push(id);
    }
    updateFavouriteMovies(tempFavourites);
  }

  function isInFavourites(id) {
    return favouriteMovies.includes(id);
  }

  let sourceURL = `${MOVIESDB_IMAGE_URL}${imageURL}`;

  return (
    <AddedOrRemovedContext.Provider
      value={{ isAdded, setIsAdded, isRemoved, setIsRemoved }}
    >
      <View>
        <TouchableOpacity
          style={styles.movieThumbnail}
          onPress={() => addOrRemoveFromFavourites(movieId)}
        >
          <ImageBackground
            source={{ uri: sourceURL }}
            style={styles.image}
            imageStyle={{ borderRadius: 10, opacity: 0.5 }}
            cache="force-cache"
            progressiveRenderingEnabled={true}
          >
            {isInFavourites(movieId) && (
              <Image
                style={styles.favourited}
                source={require("../assets/pictures/yellow_star.png")}
                cache="force-cache"
                progressiveRenderingEnabled={true}
              ></Image>
            )}
            {!isAdded && !isRemoved && (
              <Text style={styles.movieTitle}>{movieName}</Text>
            )}
            {isAdded && (
              <FadeInFadeOutAnimation>
                <Image
                  style={styles.mark}
                  source={require("../assets/pictures/checkmark.png")}
                  cache="force-cache"
                  progressiveRenderingEnabled={true}
                />
                <Text style={styles.markText}>Added to favourites</Text>
              </FadeInFadeOutAnimation>
            )}
            {isRemoved && (
              <FadeInFadeOutAnimation>
                <Image
                  style={styles.mark}
                  source={require("../assets/pictures/crossmark.png")}
                  cache="force-cache"
                  progressiveRenderingEnabled={true}
                />
                <Text style={styles.markText}>Removed from favourites</Text>
              </FadeInFadeOutAnimation>
            )}
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </AddedOrRemovedContext.Provider>
  );
};

const styles = StyleSheet.create({
  movieThumbnail: {
    margin: 14,
    borderRadius: 10,
    width: 105,
    height: 155,
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
    position: "absolute",
    left: 10,
    top: 10,
  },
  mark: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 40,
    height: 40,
  },
  markText: {
    textAlign: "center",
  },
});

export default MovieThumbnail;
