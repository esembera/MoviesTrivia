import { Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Text } from "native-base";
import { QuestionsContext } from "../components/contexts/questionsContext";
import { colorPalette } from "../../assets/theme/color-palette";
import Icon from "react-native-vector-icons/AntDesign";

const QuizScreen = ({ navigation }) => {
  const { questions } = useContext(QuestionsContext);

  const [points, setPoints] = useState(0);
  const [index, setIndex] = useState(0);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [counter, setCounter] = useState(15);
  let [options, setOptions] = useState([]);
  let interval = null;
  const currentQuestion = questions[index];

  useEffect(() => {
    if (selectedAnswer !== "") {
      if (selectedAnswer === currentQuestion?.correctAnswer) {
        setPoints((points) => points + 10);
        setAnswerStatus(true);
        answers.push({ question: index + 1, answer: true });
      } else {
        setAnswerStatus(false);
        answers.push({ question: index + 1, answer: false });
      }
    }
  }, [selectedAnswer]);

  useEffect(() => {
    setSelectedAnswer("");
    setAnswerStatus(null);
  }, [currentQuestion]);

  useEffect(() => {
    const myInterval = () => {
      if (counter >= 1) {
        setCounter((counter) => counter - 1);
      }
      if (counter === 0) {
        setIndex(index + 1);
        setCounter(15);
      }
    };
    interval = setTimeout(myInterval, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [counter]);

  useEffect(() => {
    if (index + 1 > questions.length) {
      navigation.navigate("Results", {
        answers: answers,
        points: points,
      });
    }
    options.push(currentQuestion.correctAnswer);
    currentQuestion.wrongAnswers.forEach((answer) => options.push(answer));
    options = shuffleQuestions(options);
  }, [currentQuestion]);

  useEffect(() => {
    if (!interval) {
      setInterval(15);
    }
  }, [index]);

  const shuffleQuestions = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  return (
    <SafeAreaView>
      <View style={styles.topContainer1}>
        <Text>Your custom quiz</Text>
        <Text style={styles.counter}>{counter}</Text>
      </View>
      <View style={styles.topContainer2}>
        <Text>Your progress</Text>
        <Text>
          ({index} / {questions?.length}) questions answered
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.questionText}>{currentQuestion?.question}</Text>
        <View style={styles.questionContainer}>
          {options?.map((option, i) => (
            <Pressable
              key={i}
              style={
                selectedAnswer === option &&
                option === currentQuestion.correctAnswer
                  ? styles.correctAnswer
                  : selectedAnswer !== "" && selectedAnswer === option
                  ? styles.wrongAnswer
                  : styles.answerContainer
              }
              onPress={() => selectedAnswer === "" && setSelectedAnswer(option)}
            >
              {selectedAnswer === option &&
              option === currentQuestion.correctAnswer ? (
                <Icon
                  name="checkcircle"
                  size={24}
                  style={styles.answerText}
                  color={"green"}
                />
              ) : selectedAnswer !== "" && selectedAnswer === option ? (
                <Icon
                  name="closecircle"
                  size={24}
                  style={styles.answerText}
                  color={"red"}
                />
              ) : (
                <Text style={styles.answerText}>{option}</Text>
              )}
            </Pressable>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  topContainer1: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
  },
  topContainer2: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    alignItems: "center",
  },
  container: {
    backgroundColor: colorPalette.componentsBackgroundColor,
    marginTop: 30,
    padding: 10,
    borderRadius: 6,
  },
  questionContainer: {
    marginTop: 12,
  },
  answerContainer: {
    marginVertical: 10,
    alignItems: "center",
    borderColor: colorPalette.backgroundColor,
    flexDirection: "row",
    borderRadius: 20,
    borderWidth: 0.5,
  },
  correctAnswer: {
    marginVertical: 10,
    alignItems: "center",
    borderColor: colorPalette.backgroundColor,
    flexDirection: "row",
    backgroundColor: "green",
    borderRadius: 20,
    borderWidth: 0.5,
  },
  wrongAnswer: {
    marginVertical: 10,
    alignItems: "center",
    borderColor: colorPalette.backgroundColor,
    flexDirection: "row",
    backgroundColor: "red",
    borderRadius: 20,
    borderWidth: 0.5,
  },
  questionText: {
    color: colorPalette.componentTextColor,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  answerText: {
    color: colorPalette.componentTextColor,
    textAlign: "center",
    height: 40,
    padding: 10,
  },
  counter: {
    padding: 10,
    backgroundColor: "magenta",
    borderRadius: 10,
  },
});
