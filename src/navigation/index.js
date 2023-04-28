import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/home-screen";
import LoginScreen from "../screens/login-screen";
import QuizScreen from "../screens/quiz-screen";
import DiscoverScreen from "../screens/discover-screen";
import ResultsScreen from "../screens/results-screen";
import QuizSelection from "../screens/quiz-selection-screen";

const Stack = createStackNavigator();

//this is the function that handles navigation, so any new screen has to be added to this function
//if you want the app to be able to navigate to it
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Quiz"
        component={QuizScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Results"
        component={ResultsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QuizSelection"
        component={QuizSelection}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default MyStack;
