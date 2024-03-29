import { StyleSheet, View, Text, Dimensions } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { colorPalette } from "../../assets/theme/color-palette";
import { FavouriteMoviesContext } from "../components/contexts/favouriteMovies.context";
import { QuestionsContext } from "../components/contexts/questionsContext";
import { getQuiz } from "../services/movie.service";
import { useToast, Spinner, Button } from "native-base";

const QuizSelection = ({ navigation }) => {
  const { favouriteMovies } = useContext(FavouriteMoviesContext);
  const { setQuestions } = useContext(QuestionsContext);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const screenWidth = Math.round(Dimensions.get("window").width);

  const callBackend = async (path) => {
    setLoading(true);
    let response = null;
    if (path === "/quiz-generator") {
      response = await getQuiz(path, favouriteMovies, 10);
    } else {
      response = await getQuiz(path, null, 10);
    }
    setLoading(false);
    setQuestions(response);
    navigation.navigate("Quiz", { quizType: path.split("/")[1] });
  };
  return (
    <View style={styles.container} accessible={true}>
      <View>
        <Text style={styles.text}>
          Custom quiz generated from the movies from your favourites list:
        </Text>
      </View>
      <View style={styles.topContainer}>
        <View
          style={
            screenWidth > 500
              ? styles.customQuizButtonTablet
              : styles.customQuizButtonMobile
          }
        >
          <Button
            testID="customQuizBtn"
            onPress={() => {
              if (favouriteMovies.length < 3) {
                toast.show({
                  title:
                    "You need at least 3 movies in your favourites list to play a custom quiz",
                  description:
                    "Go to Discover Movies to add movies to your favourites list.",
                  variant: "subtle",
                  placement: "bottom",
                  bg: colorPalette.componentsBackgroundColor,
                });
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
      <View
        style={
          screenWidth > 500 ? styles.hairlineTablet : styles.hairlineMobile
        }
      />
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
            testID="dramaQuizBtn"
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
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => callBackend("/romance")}
            _text={{
              color: colorPalette.componentTextColor,
            }}
            size="lg"
          >
            Romance
          </Button>
        </View>
      </View>
      {loading && (
        <View style={styles.spinnerContainer}>
          <Spinner size="lg" color={colorPalette.textColor} />
        </View>
      )}
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
  customQuizButtonMobile: {
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "15%",
    padding: 10,
  },
  customQuizButtonTablet: {
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
    padding: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: colorPalette.textColor,
    fontWeight: "700",
  },
  hairlineMobile: {
    backgroundColor: colorPalette.componentsBackgroundColor,
    height: 2,
    width: "100%",
    marginTop: "15%",
  },
  hairlineTablet: {
    backgroundColor: colorPalette.componentsBackgroundColor,
    height: 2,
    width: "100%",
    marginTop: "5%",
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
    paddingTop: 10,
  },
  spinnerContainer: {
    position: "absolute",
    top: "80%",
    left: "50%",
    right: "50%",
  },
});
