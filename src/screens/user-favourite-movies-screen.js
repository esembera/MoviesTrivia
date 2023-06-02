import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import MovieThumbnail from "../components/movieThumbnail";
import { FavouriteMoviesContext } from "../components/contexts/favouriteMovies.context";
import { getMovies } from "../services/movie.service";
import { colorPalette } from "../../assets/theme/color-palette";
import Icon from "react-native-vector-icons/AntDesign";
import FadeInAnimation from "../../assets/animations/fadeInAnimation";

const UserFavouriteMoviesScreen = ({ navigation }) => {
  const { favouriteMovies } = useContext(FavouriteMoviesContext);
  const [movies, setMovies] = useState([]);

  const screenWidth = Math.round(Dimensions.get("window").width);

  const columnWidth = 133;

  const numColumns = Math.floor(screenWidth / columnWidth);

  useEffect(() => {
    let tempMovies = [];
    const getMovieInfo = async (id) => {
      const response = await getMovies(`/movie/${id}`);
      //   console.log(response);
      tempMovies.push(response);
    };
    // console.log(favouriteMovies);
    favouriteMovies.forEach((movie) => {
      getMovieInfo(movie);
    });
    setMovies(tempMovies);
    // console.log(movies);
  }, []);

  return (
    <View accessible={true}>
      <View>
        <Text style={styles.topText}>Your favourite movies</Text>
      </View>
      {favouriteMovies.length !== 0 && (
        <FlatList
          accessible={true}
          numColumns={numColumns}
          data={movies}
          style={styles.container}
          scrollIndicatorInsets={{ right: 1 }}
          renderItem={({ item }) => (
            <MovieThumbnail
              imageURL={item.backdrop_path}
              movieName={item.title}
              movieId={item.id}
              testID={movies.findIndex((m) => m == item).toString()}
            />
          )}
        ></FlatList>
      )}
      {favouriteMovies.length === 0 && (
        <FadeInAnimation>
          <View style={styles.iconContainer}>
            <View style={styles.iconContainerInner}>
              <Icon
                name="pluscircleo"
                size={40}
                style={styles.plusIcon}
                color={colorPalette.textColor}
                onPress={() => {
                  navigation.reset({
                    index: 1,
                    routes: [{ name: "Home" }, { name: "Discover" }],
                  });
                }}
              />
              <Text style={styles.iconText}>
                You don't have any favourite movies. Add them now to be able to
                play custom quiz!
              </Text>
            </View>
          </View>
        </FadeInAnimation>
      )}
    </View>
  );
};

export default UserFavouriteMoviesScreen;

const styles = StyleSheet.create({
  topText: {
    textAlign: "center",
    fontSize: 20,
    paddingTop: 10,
    fontWeight: "700",
    color: colorPalette.textColor,
  },
  container: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
  },
  iconContainerInner: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  iconText: {
    textAlign: "center",
    fontSize: 18,
    paddingTop: 10,
    fontWeight: "700",
    color: colorPalette.textColor,
    width: "80%",
  },
});
