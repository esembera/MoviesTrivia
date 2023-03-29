import { StyleSheet, View } from "react-native";
import React from "react";
import { Text } from "native-base";

const QuizScreen = () => {
  return (
    <View>
      <Text style={styles.text}>quiz-screen</Text>
    </View>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  text: {
    margin: 150,
    paddingTop: 100,
    fontSize: 20,
  },
});
