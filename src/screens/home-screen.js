import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Button } from "native-base";
import { colorPalette } from "../../assets/theme/color-palette";
import { auth } from "../../firebase";
import { FavouriteMoviesContext } from "../components/contexts/favouriteMovies.context";
import { AuthContext } from "../components/contexts/auth.context";

const HomeScreen = ({ navigation }) => {
  const { resetFavouriteMoviesAfterLogOut } = useContext(
    FavouriteMoviesContext
  );

  const { currentUsername, setCurrentUsername } = useContext(AuthContext);

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
      resetFavouriteMoviesAfterLogOut();
      setCurrentUsername("");
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.insideContainerTop}>
        <Text style={styles.welcomeText}>Welcome {currentUsername}!</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigation.navigate("Discover")}
          _text={{
            color: colorPalette.componentTextColor,
          }}
          size="lg"
        >
          Discover Movies
        </Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigation.navigate("QuizSelection")}
          _text={{
            color: colorPalette.componentTextColor,
          }}
          size="lg"
        >
          Play quiz
        </Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigation.navigate("Leaderboard")}
          _text={{
            color: colorPalette.componentTextColor,
          }}
          size="lg"
        >
          Leaderboard
        </Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigation.navigate("Favourites")}
          _text={{
            color: colorPalette.componentTextColor,
          }}
          size="lg"
        >
          Your favourite movies
        </Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={handleSignOut}
          _text={{
            color: colorPalette.componentTextColor,
          }}
          size="lg"
        >
          Log out
        </Button>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    margin: 15,
    width: "85%",
  },
  welcomeText: {
    fontSize: 16,
    color: colorPalette.textColor,
    fontWeight: "700",
  },
  insideContainerTop: {
    height: "20%",
    marginVertical: 10,
  },
});
