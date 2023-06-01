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
import FadeInFadeOutAnimation from "../../assets/animations/fadeInFadeOutAnimation";

export const AddedOrRemovedContext = createContext(false);

const MovieThumbnail = ({ imageURL, movieName, movieId, testID }) => {
  const { favouriteMovies, updateFavouriteMovies } = useContext(
    FavouriteMoviesContext
  );

  const [isAdded, setIsAdded] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  //function which on click of a movie thumbnail adds or removes movie from favourites, and the action
  //is decided by looking up in the favouriteMovies array and looking if the clicked movie is already inside
  function addOrRemoveFromFavourites(id) {
    // console.log(typeof testID);
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

  //function that checks whether the movies is in favourites or not
  function isInFavourites(id) {
    return favouriteMovies.includes(id);
  }
  //source url for movie thumbnail
  let sourceURL = `${MOVIESDB_IMAGE_URL}${imageURL}`;

  // console.log(`${movieName} - ${sourceURL}`);

  return (
    <AddedOrRemovedContext.Provider
      value={{ isAdded, setIsAdded, isRemoved, setIsRemoved }}
    >
      <View accessible={true}>
        <TouchableOpacity
          style={styles.movieThumbnail}
          onPress={() => addOrRemoveFromFavourites(movieId)}
          testID={testID}
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
                source={require("../../assets/pictures/yellow_star.png")}
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
                  source={require("../../assets/pictures/checkmark.png")}
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
                  source={require("../../assets/pictures/crossmark.png")}
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
