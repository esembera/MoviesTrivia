import { StyleSheet, View, TextInput, Animated } from "react-native";
import React, { useEffect, useState } from "react";
import { colorPalette } from "../../assets/theme/color-palette";
import { getMovies } from "../services/movie.service";

const SearchBar = ({ handleSearchParent, isSearchVisible, isClicked }) => {
  const [query, setQuery] = useState("");

  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isSearchVisible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500, // Adjust the duration as per your preference
        useNativeDriver: true,
      }).start();
    }
  }, [isSearchVisible]);
  useEffect(() => {
    if (isClicked) {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500, // Adjust the duration as per your preference
        useNativeDriver: true,
      }).start();
    }
  }, [isClicked]);

  useEffect(() => {
    const handleSearch = async () => {
      const response = await getMovies("/search/movie", `&query=${query}`);
      if (response.results) {
        handleSearchParent(response.results);
      }
    };
    handleSearch();
  }, [query]);

  return (
    <Animated.View style={{ opacity }}>
      <View style={styles.searchBar}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search movies..."
          style={styles.input}
        />
      </View>
    </Animated.View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    margin: 10,
    borderColor: colorPalette.textColor,
    backgroundColor: colorPalette.textColor,
    borderWidth: 2,
    borderRadius: 5,
    height: 30,
  },
});
