import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { getMovies } from "../services/movie.service";
import { genres } from "../components/statics/genres.json";
import { Text } from "native-base";
import MovieThumbnail from "../components/movieThumbnail";
import SearchBar from "../components/searchBar";
import Icon from "react-native-vector-icons/FontAwesome";

const DiscoverScreen = () => {
  const [movies, setMovies] = useState([]);
  const [isSearchVisible, setSearchVisible] = useState(false);

  const screenWidth = Math.round(Dimensions.get("window").width);

  const screenHeight = Math.round(Dimensions.get("window").height);

  columnHeight = 183;

  const columnWidth = 133;

  var numColumns = Math.floor(screenWidth / columnWidth);

  numColumns = numColumns >= 3 ? numColumns : 3;

  const numRows = Math.floor(screenHeight / columnHeight);

  const numPopoularMoviesShown =
    numColumns * numRows > 12 ? numColumns * numRows : 12;

  // console.log(genres);

  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
  };

  //this triggers on rendering the discover movies screen, and it gets the movies from tmdb api and puts 18 of them
  //in our own movies array which we can manipulate then
  useEffect(() => {
    const getDiscoverMovies = async () => {
      const response = await getMovies(
        "/discover/movie",
        "&sort_by=popularity.desc"
      );
      let tempMovies = [];
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
      const max =
        response.results.length > numPopoularMoviesShown
          ? numPopoularMoviesShown
          : response.results.length;
      for (i = 0; i < max; i++) {
        tempMovies.push(response.results[i]);
      }
      setMovies(tempMovies);
    };
    getDiscoverMovies();
  }, []);

  const getPopularMovies = async () => {
    const response = await getMovies(
      "/discover/movie",
      "&sort_by=popularity.desc"
    );
    let tempMovies = [];
    const max =
      response.results.length > numPopoularMoviesShown
        ? numPopoularMoviesShown
        : response.results.length;
    for (i = 0; i < max; i++) {
      tempMovies.push(response.results[i]);
    }
    setMovies(tempMovies);
  };

  const handleSearchParent = (searchedMovies) => {
    if (searchedMovies.length == 0) {
      getPopularMovies();
    } else {
      let tempMovies = [];
      const max =
        searchedMovies.length > numPopoularMoviesShown
          ? numPopoularMoviesShown
          : searchedMovies.length;
      for (i = 0; i < max; i++) {
        tempMovies.push(searchedMovies[i]);
      }
      setMovies(tempMovies);
    }
  };

  // console.log(
  //   movies.forEach((m1) => console.log(movies.findIndex((m2) => m1 == m2)))
  // );

  return (
    <View accessible={true}>
      <View style={styles.topContainer}>
        <Text style={styles.topText}>Find your favourite movies</Text>
        <Icon
          name="search"
          onPress={toggleSearch}
          size={20}
          style={styles.topSearchIcon}
        />
      </View>
      {isSearchVisible && <SearchBar handleSearchParent={handleSearchParent} />}
      <FlatList
        accessible={true}
        numColumns={numColumns}
        data={movies}
        style={styles.container}
        scrollIndicatorInsets={{ right: 1 }}
        renderItem={({ item }) => (
          <MovieThumbnail
            testID={movies.findIndex((m) => m == item).toString()}
            imageURL={item.backdrop_path}
            movieName={item.title}
            movieId={item.id}
          />
        )}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  topText: {
    textAlign: "center",
    fontSize: 20,
    paddingTop: 10,
    paddingRight: 40,
    fontWeight: "700",
  },
  container: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  topContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  topSearchIcon: {
    paddingTop: 9,
  },
});

export default DiscoverScreen;
