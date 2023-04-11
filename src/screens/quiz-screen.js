import { Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import React, { useContext, useEffect, useState, useRef } from "react";
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
  const currentQuestion = questions[index];

  const intervalRef = useRef(null);

  const progressPercentage = Math.floor((index / questions.length) * 100);

  useEffect(() => {
    if (selectedAnswer !== "") {
      if (
        currentQuestion &&
        selectedAnswer === currentQuestion?.correctAnswer
      ) {
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
    intervalRef.current = setTimeout(myInterval, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [counter]);

  useEffect(() => {
    if (questions && questions.length > 0 && index + 1 > questions.length) {
      navigation.replace("Results", {
        answers: answers,
        points: points,
      });
    }
    let tempOptions = [];
    if (currentQuestion) {
      tempOptions.push(currentQuestion?.correctAnswer);
      if (currentQuestion?.wrongAnswers?.forEach) {
        currentQuestion.wrongAnswers.forEach((answer) =>
          tempOptions.push(answer)
        );
      }
      tempOptions = shuffleQuestions(tempOptions);
      setOptions(tempOptions);
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (!intervalRef.current != 15) {
      setCounter(15);
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
        <Pressable style={styles.counterContainer}>
          <Text style={styles.counter}>{counter}</Text>
        </Pressable>
      </View>
      <View style={styles.topContainer2}>
        <Text>Your progress</Text>
        <Text>
          ({index} / {questions?.length}) questions answered
        </Text>
      </View>

      <View style={styles.progressBar}>
        <Text
          style={{
            width: `${progressPercentage}%`,
            backgroundColor: colorPalette.componentsBackgroundColor,
            position: "absolute",
            height: 10,
            borderRadius: 12,
            marginTop: 20,
            right: 0,
            left: 0,
          }}
        ></Text>
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
                  size={22}
                  style={styles.answerText}
                  color={"green"}
                />
              ) : selectedAnswer !== "" && selectedAnswer === option ? (
                <Icon
                  name="closecircle"
                  size={22}
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

      <View
        style={answerStatus === null ? null : styles.answerMessageContainer}
      >
        {answerStatus === null ? null : (
          <Text style={answerStatus === null ? null : styles.answerMessage}>
            {!!answerStatus ? "Correct Answer" : "Wrong Answer"}
          </Text>
        )}
        {index + 1 >= questions.length ? (
          <Pressable
            onPress={() =>
              navigation.replace("Results", {
                points: points,
                answers: answers,
              })
            }
            style={styles.gameButton}
          >
            <Text style={{ color: "white" }}>Done</Text>
          </Pressable>
        ) : answerStatus === null ? null : (
          <Pressable
            onPress={() => setIndex(index + 1)}
            style={styles.gameButton}
          >
            <Text style={{ color: "white" }}>Next Question</Text>
          </Pressable>
        )}
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
    borderRadius: 20,
    borderWidth: 0.5,
  },
  correctAnswer: {
    marginVertical: 10,
    alignItems: "center",
    borderColor: colorPalette.backgroundColor,
    backgroundColor: "green",
    borderRadius: 20,
    borderWidth: 0.5,
  },
  wrongAnswer: {
    marginVertical: 10,
    alignItems: "center",
    borderColor: colorPalette.backgroundColor,
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
    color: colorPalette.componentTextColor,
    textAlign: "center",
    fontWeight: "bold",
  },
  counterContainer: {
    padding: 10,
    backgroundColor: colorPalette.componentsBackgroundColor,
    borderRadius: 20,
  },
  answerMessage: {
    fontSize: 17,
    textAlign: "center",
    fontWeight: "bold",
  },
  answerMessageContainer: {
    marginTop: 45,
    backgroundColor: colorPalette.backgroundColor,
    padding: 10,
    borderRadius: 7,
    height: 120,
  },
  gameButton: {
    backgroundColor: "green",
    padding: 10,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    borderRadius: 6,
  },
  progressBar: {
    backgroundColor: "white",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    height: 10,
    borderRadius: 20,
    justifyContent: "center",
    marginTop: 20,
    marginLeft: 10,
  },
});
