import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { getMovies } from "../services/movie.service";
import { genres } from "../statics/genres.json";
import {
  FlatList,
  Avatar,
  HStack,
  Text,
  Box,
  VStack,
  Spacer,
} from "native-base";

import { MOVIESDB_IMAGE_URL } from "@env";

const DiscoverScreen = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getDiscoverMovies = async () => {
      const response = await getMovies(
        "/discover/movie",
        "&sort_by=popularity.desc"
      );
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
      setMovies(response.results);

      const images = response.results.map((data) => {
        `${MOVIESDB_IMAGE_URL}${data.backdrop_path}`;
      });
    };
    getDiscoverMovies();
  }, []);

  return (
    <View>
      <Text style={styles.topText}>Featured movies</Text>

      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: "muted.50",
            }}
            borderColor="muted.800"
            pl={["2", "4"]}
            pr={["2", "4"]}
            py="4"
          >
            <HStack space={[1, 4]} justifyContent="space-between">
              <Avatar
                size="64px"
                source={{
                  uri: `${MOVIESDB_IMAGE_URL}${item.backdrop_path}`,
                }}
              />
              <VStack>
                <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item.title}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  {" "}
                  Genre: {item.genre_ids.join(", ")}
                </Text>
              </VStack>
              <Spacer />
              <Text
                fontSize="xs"
                _dark={{
                  color: "warmGray.50",
                }}
                color="coolGray.800"
                alignSelf="flex-start"
              >
                {item.release_date}
              </Text>
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topText: {
    textAlign: "center",
    fontSize: 30,
    paddingTop: 10,
  },
});

export default DiscoverScreen;
