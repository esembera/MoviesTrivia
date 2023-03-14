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
    color: "rgb(234, 253, 252)",
    fontSize: 60,
    fontFamily: "GVTimeRegular",
  },
  titleContainer: {
    height: 150,
    paddingTop: 30,
    backgroundColor: "rgb(130, 170, 227)",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
