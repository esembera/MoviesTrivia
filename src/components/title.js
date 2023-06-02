import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { colorPalette } from "../../assets/theme/color-palette";

const Title = ({ navigation, route }) => {
  // console.log(route.name);
  return (
    <View style={styles.titleContainer} accessible={true}>
      <Text style={styles.title}>MovieTrivia</Text>
      {route.name !== "Home" &&
        route.name !== "Login" &&
        route.name !== "Results" && (
          <Pressable
            style={styles.icon}
            onPress={() => navigation.goBack()}
            testID="goBackBtn"
          >
            <Icon
              name="left"
              size={30}
              style={styles.icon}
              color={colorPalette.backgroundColor}
            />
          </Pressable>
        )}
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  title: {
    color: colorPalette.backgroundColor,
    fontSize: 60,
    fontFamily: "GVTimeRegular",
  },
  titleContainer: {
    height: 150,
    paddingTop: 30,
    backgroundColor: colorPalette.textColor,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  icon: {
    position: "absolute",
    left: 5,
    bottom: 5,
  },
});
