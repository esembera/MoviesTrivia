import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { colorPalette } from "../../assets/theme/color-palette";
import { getMovies } from "../services/movie.service";

const SearchBar = ({ handleSearchParent }) => {
  const [query, setQuery] = useState("");

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
    <View style={styles.searchBar}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search movies..."
        style={styles.input}
      />
    </View>
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
    borderWidth: 2,
    borderRadius: 5,
    height: 30,
  },
});
