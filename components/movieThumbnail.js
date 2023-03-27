import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import React from "react";
import { MOVIESDB_IMAGE_URL } from "@env";

const MovieThumbnail = ({ imageURL, movieName }) => {
  let sourceURL = `${MOVIESDB_IMAGE_URL}${imageURL}`;
  //   console.log(sourceURL);
  return (
    <View>
      <TouchableOpacity style={styles.movieThumbnail}>
        <ImageBackground
          source={{ uri: sourceURL }}
          style={styles.image}
          imageStyle={{ borderRadius: 10, opacity: 0.55 }}
        >
          <Text style={styles.movieTitle}>{movieName}</Text>
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
});

export default MovieThumbnail;
