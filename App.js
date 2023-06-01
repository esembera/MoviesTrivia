import "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";
import React from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useState, useCallback, useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import MyStack from "./src/navigation";
import { NativeBaseProvider, extendTheme } from "native-base";
import { colorPalette } from "./assets/theme/color-palette";
import FavouriteMoviesContextProvider from "./src/components/contexts/favouriteMovies.context";
import { AuthProvider } from "./src/components/contexts/auth.context";
import QuestionsContextProvider from "./src/components/contexts/questionsContext";
import { LogBox } from "react-native";

let customFonts = {
  GVTimeRegular: require("./assets/fonts/GvTimeRegular.ttf"),
};

LogBox.ignoreLogs([
  "Require cycle: src/components/movieThumbnail.js -> assets/animations/fadeInFadeOutAnimation.js -> src/components/movieThumbnail.js",
]);

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

  //load custom font

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
      <AuthProvider>
        <FavouriteMoviesContextProvider>
          <QuestionsContextProvider>
            <View style={styles.container} onLayout={onLayoutRootView}>
              <NavigationContainer theme={MyTheme}>
                <MyStack />
              </NavigationContainer>
            </View>
          </QuestionsContextProvider>
        </FavouriteMoviesContextProvider>
      </AuthProvider>
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
