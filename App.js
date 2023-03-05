import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeScreen from "./screens/home-screen";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { useState, useCallback, useEffect } from "react";

let customFonts = {
  GVTimeRegular: require("./assets/fonts/GvTimeRegular.ttf"),
};

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(customFonts);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <HomeScreen />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 16,
    backgroundColor: "#BFEAF5",
    flex: 1,
  },
});
