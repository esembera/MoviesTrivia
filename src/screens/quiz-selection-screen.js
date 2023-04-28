import { StyleSheet, View } from "react-native";
import { Button } from "native-base";
import React from "react";
import { colorPalette } from "../../assets/theme/color-palette";
import { useContext } from "react";
import { FavouriteMoviesContext } from "../components/contexts/favouriteMovies.context";
import { QuestionsContext } from "../components/contexts/questionsContext";
import Toast from "react-native-root-toast";

const QuizSelection = ({ navigation }) => {
  const { favouriteMovies } = useContext(FavouriteMoviesContext);
  const { setQuestions } = useContext(QuestionsContext);

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
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => {
            if (favouriteMovies.length < 3) {
              Toast.show(
                "To access custom quiz you need to have at least 3 movies in your favourites list.",
                {
                  duration: Toast.durations.SHORT,
                  position: Toast.positions.CENTER,
                  shadow: true,
                  animation: true,
                  hideOnPress: true,
                  delay: 0,
                }
              );
            } else {
              callBackend();
            }
          }}
          _text={{
            color: colorPalette.componentTextColor,
          }}
          size="lg"
        >
          Start your custom quiz
        </Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => callBackend()}
          _text={{
            color: colorPalette.componentTextColor,
          }}
          size="lg"
        >
          Horror
        </Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => callBackend()}
          _text={{
            color: colorPalette.componentTextColor,
          }}
          size="lg"
        >
          Action
        </Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => callBackend()}
          _text={{
            color: colorPalette.componentTextColor,
          }}
          size="lg"
        >
          Drama
        </Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => callBackend()}
          _text={{
            color: colorPalette.componentTextColor,
          }}
          size="lg"
        >
          Thriller
        </Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => callBackend()}
          _text={{
            color: colorPalette.componentTextColor,
          }}
          size="lg"
        >
          Animation
        </Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => callBackend()}
          _text={{
            color: colorPalette.componentTextColor,
          }}
          size="lg"
        >
          Fantasy
        </Button>
      </View>
    </View>
  );
};

export default QuizSelection;

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
