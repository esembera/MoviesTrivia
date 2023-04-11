import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Button } from "native-base";
import { colorPalette } from "../../assets/theme/color-palette";
import { auth } from "../../firebase";
import { FavouriteMoviesContext } from "../components/contexts/favouriteMovies.context";
import { getQuiz } from "../services/movie.service";
import { QuestionsContext } from "../components/contexts/questionsContext";

const HomeScreen = ({ navigation }) => {
  const { favouriteMovies, resetFavouriteMoviesAfterLogOut } = useContext(
    FavouriteMoviesContext
  );

  const { setQuestions } = useContext(QuestionsContext);

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
      resetFavouriteMoviesAfterLogOut();
    });
  };

  const callBackend = async () => {
    const response = await getQuiz("/quiz-generator", favouriteMovies, 10);
    setQuestions(response);
    navigation.navigate("Quiz");
    // response.forEach((question) => {
    //   console.log(question);
    // });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome {auth.currentUser?.email}</Text>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => callBackend()}
          _text={{
            color: colorPalette.componentTextColor,
          }}
          size="lg"
        >
          Backend Test Button
        </Button>
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
          onPress={() => callBackend()}
          _text={{
            color: colorPalette.componentTextColor,
          }}
          disabled={favouriteMovies.length < 3}
          size="lg"
        >
          Start your custom quiz
        </Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigation.replace("Quiz")}
          _text={{
            color: colorPalette.componentTextColor,
          }}
          size="lg"
        >
          View leaderboard
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
});
