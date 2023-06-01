import { StyleSheet, Text, SafeAreaView, View, Pressable } from "react-native";
import React, { useContext } from "react";
import { FlatList } from "native-base";
import { colorPalette } from "../../assets/theme/color-palette";
import Icon from "react-native-vector-icons/AntDesign";
import { db } from "../../firebase";
import { AuthContext } from "../components/contexts/auth.context";

const ResultsScreen = ({ navigation, route }) => {
  const { currentUsername } = useContext(AuthContext);

  let correctAnswer = 0;
  route.params.answers.forEach((q) => {
    if (q.answer === true) {
      correctAnswer++;
    }
  });

  // console.log(auth.currentUser.email);
  if (route.params.quizType !== "quiz-generator") {
    const docRef = db
      .collection("leaderboards")
      .doc(`${route.params.quizType}`);
    docRef.get().then((doc) => {
      if (doc.exists) {
        // console.log(doc.data()[auth.currentUser?.email]);
        if (doc.data()[currentUsername]) {
          if (doc.data()[currentUsername] < route.params.points) {
            // console.log(auth.currentUser.email);
            db.collection("leaderboards")
              .doc(route.params.quizType)
              .set(
                {
                  [currentUsername]: route.params.points,
                },
                { merge: true }
              );
          }
        } else {
          db.collection("leaderboards")
            .doc(route.params.quizType)
            .set(
              {
                [currentUsername]: route.params.points,
              },
              { merge: true }
            );
        }
      } else {
        db.collection("leaderboards")
          .doc(route.params.quizType)
          .set({
            [currentUsername]: route.params.points,
          });
      }
    });
  }

  // console.log(route.params.quizType);

  return (
    <SafeAreaView style={styles.container} accessible={true}>
      <View style={styles.resultContainer}>
        <Text>Your Results</Text>
      </View>

      <View style={styles.resultContainer}>
        <Text>Questions Answered Correctly</Text>
        <Text>
          ({correctAnswer} / {route.params.answers.length})
        </Text>
      </View>

      <Pressable style={styles.scoreCardContainer}>
        <Text style={styles.scoreCardTitle}>Score Card</Text>
        <FlatList
          numColumns={5}
          data={route.params.answers}
          renderItem={({ item, i }) => (
            <View style={styles.scoreCardQuestions}>
              <Text>{item.question}</Text>
              {item.answer === true ? (
                <Icon
                  name="checkcircle"
                  size={18}
                  style={styles.answerText}
                  color={"green"}
                />
              ) : (
                <Icon
                  name="closecircle"
                  size={18}
                  style={styles.answerText}
                  color={"red"}
                />
              )}
            </View>
          )}
        />
        <Text style={styles.scoreCardPoints}>
          Points: {route.params.points}
        </Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.reset({ index: 0, routes: [{ name: "Home" }] });
        }}
        testID="continueBtn"
      >
        <Text>Continue</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ResultsScreen;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  resultContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  scoreCardContainer: {
    backgroundColor: colorPalette.componentsBackgroundColor,
    height: 200,
    borderRadius: 7,
    marginTop: 20,
  },
  scoreCardTitle: {
    color: colorPalette.componentTextColor,
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 8,
  },
  scoreCardQuestions: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    marginLeft: "auto",
    marginRight: "auto",
    verticalAlign: "middle",
  },
  button: {
    backgroundColor: colorPalette.textColor,
    marginTop: 30,
    width: "50%",
    padding: 15,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 10,
    alignItems: "center",
  },
  scoreCardPoints: {
    color: colorPalette.componentTextColor,
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
    margin: 10,
  },
});
