import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "native-base";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigation.navigate("Quiz")}
          _text={{
            color: "rgb(234, 253, 252)",
          }}
          size="lg"
        >
          Start quiz
        </Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigation.navigate("Quiz")}
          _text={{
            color: "rgb(234, 253, 252)",
          }}
          size="lg"
        >
          View leaderboard
        </Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigation.navigate("Quiz")}
          _text={{
            color: "rgb(234, 253, 252)",
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
  },
  buttonContainer: {
    margin: 15,
  },
});
