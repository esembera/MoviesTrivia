import { View, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { getMovies } from "../services/movie.service";
import { genres } from "../statics/genres.json";
import { Text } from "native-base";
import { MOVIESDB_IMAGE_URL } from "@env";
import MovieThumbnail from "../components/movieThumbnail";

const DiscoverScreen = () => {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const getDiscoverMovies = async () => {
      const response = await getMovies(
        "/discover/movie",
        "&sort_by=popularity.desc"
      );
      let tempMovies = [];
      setMovie(response.results[0]);
      response.results.forEach((movie) => {
        let genreNames = [];
        movie.genre_ids.forEach((genreId) => {
          genres.forEach((id) => {
            if (genreId == id.id) {
              genreNames.push(id.name);
            }
          });
          movie.genre_ids = genreNames;
        });
      });
      for (i = 0; i < 18; i++) {
        tempMovies.push(response.results[i]);
      }
      setMovies(tempMovies);

      const images = response.results.map((data) => {
        `${MOVIESDB_IMAGE_URL}${data.backdrop_path}`;
      });
    };
    getDiscoverMovies();
  }, []);
  // movies.forEach((movie) => {
  //   console.log(movie);
  // });

  return (
    <View>
      <Text style={styles.topText}>Currently popular movies</Text>
      <FlatList
        numColumns={3}
        data={movies}
        style={styles.container}
        scrollIndicatorInsets={{ right: 1 }}
        renderItem={({ item }) => (
          <MovieThumbnail
            imageURL={item.backdrop_path}
            movieName={item.title}
          />
        )}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  topText: {
    textAlign: "center",
    fontSize: 25,
    paddingTop: 10,
  },
  container: {
    margin: 7.5,
  },
});

export default DiscoverScreen;
