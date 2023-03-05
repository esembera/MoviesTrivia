import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Title = () => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>MovieTrivia</Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  title: {
    color: "#EAFDFC",
    fontSize: 60,
    fontFamily: "GVTimeRegular",
  },
  titleContainer: {
    height: 150,
    backgroundColor: "#82AAE3",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
