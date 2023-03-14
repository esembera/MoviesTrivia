import "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";
import React from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { useState, useCallback, useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import Title from "./components/title";
import MyStack from "./navigation";
import { NativeBaseProvider, extendTheme } from "native-base";
import { colorPalette } from "./theme/color-palette";

let customFonts = {
  GVTimeRegular: require("./assets/fonts/GvTimeRegular.ttf"),
};

SplashScreen.preventAutoHideAsync();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colorPalette.textColor,
    background: colorPalette.backgroundColor,
  },
};

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  const theme = extendTheme({
    components: {
      Button: {
        defaultProps: {
          colorScheme: colorPalette.componentsBackgroundColor,
        },
      },
      Text: {
        baseStyle: {
          color: colorPalette.textColor,
        },
      },
    },
  });

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
    <NativeBaseProvider theme={theme}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <Title />
        <NavigationContainer theme={MyTheme}>
          <MyStack />
        </NavigationContainer>
      </View>
    </NativeBaseProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#BFEAF5",
    flex: 1,
  },
});
