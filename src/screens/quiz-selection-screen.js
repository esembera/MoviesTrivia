import { StyleSheet, View, Text } from "react-native";
import { Button } from "native-base";
import React from "react";
import { colorPalette } from "../../assets/theme/color-palette";
import { useContext } from "react";
import { FavouriteMoviesContext } from "../components/contexts/favouriteMovies.context";
import { QuestionsContext } from "../components/contexts/questionsContext";
import Toast from "react-native-root-toast";
import { getQuiz } from "../services/movie.service";

const QuizSelection = ({ navigation }) => {
  const { favouriteMovies } = useContext(FavouriteMoviesContext);
  const { setQuestions } = useContext(QuestionsContext);

  const callBackend = async (path) => {
    let response = null;
    if (path === "/quiz-generator") {
      response = await getQuiz(path, favouriteMovies, 10);
    } else {
      response = await getQuiz(path, null, 10);
    }
    setQuestions(response);
    navigation.navigate("Quiz");
    // response.forEach((question) => {
    //   console.log(question);
    // });
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>
          Custom quiz generated from the movies from your favourites list:
        </Text>
      </View>
      <View style={styles.topContainer}>
        <View style={styles.customQuizButton}>
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
                callBackend("/quiz-generator");
              }
            }}
            _text={{
              color: colorPalette.componentTextColor,
            }}
            size="lg"
          >
            Custom quiz
          </Button>
        </View>
      </View>
      <View style={styles.hairline} />
      <View>
        <Text style={styles.text}>Genre quizzes made by us:</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => callBackend("/horror")}
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
            onPress={() => callBackend("/action")}
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
            onPress={() => callBackend("/drama")}
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
            onPress={() => callBackend("/thriller")}
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
            onPress={() => callBackend("/animation")}
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
            onPress={() => callBackend("/fantasy")}
            _text={{
              color: colorPalette.componentTextColor,
            }}
            size="lg"
          >
            Fantasy
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => callBackend("/comedy")}
            _text={{
              color: colorPalette.componentTextColor,
            }}
            size="lg"
          >
            Comedy
          </Button>
        </View>
      </View>
    </View>
  );
};

export default QuizSelection;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: colorPalette.textColor,
    fontWeight: "700",
    textAlign: "center",
    padding: 10,
  },
  container: {
    flex: 1,
  },
  buttonContainer: {
    width: "40%",
    justifyContent: "space-between",
    padding: 10,
  },
  customQuizButton: {
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
    padding: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: colorPalette.textColor,
    fontWeight: "700",
  },
  hairline: {
    backgroundColor: colorPalette.componentsBackgroundColor,
    height: 2,
    width: "100%",
    marginTop: "15%",
  },
  topContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
});
