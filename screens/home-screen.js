import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "native-base";
import { colorPalette } from "../theme/color-palette";
import { auth } from "../firebase";

const HomeScreen = ({ navigation }) => {
  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome {auth.currentUser?.email}</Text>
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
          onPress={() => navigation.navigate("Quiz")}
          _text={{
            color: colorPalette.componentTextColor,
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
