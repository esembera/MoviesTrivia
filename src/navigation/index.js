import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/home-screen";
import LoginScreen from "../screens/login-screen";
import QuizScreen from "../screens/quiz-screen";
import DiscoverScreen from "../screens/discover-screen";
import ResultsScreen from "../screens/results-screen";
import QuizSelection from "../screens/quiz-selection-screen";
import withTitle from "../components/withTitle";
import LeaderboardScreen from "../screens/leaderboard-screen";
import UserFavouriteMoviesScreen from "../screens/user-favourite-movies-screen";
import RegisterScreen from "../screens/register-screen";

const Stack = createStackNavigator();

//this is the function that handles navigation, so any new screen has to be added to this function
//if you want the app to be able to navigate to it
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={withTitle(LoginScreen)}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={withTitle(RegisterScreen)}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={withTitle(HomeScreen)}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Discover"
        component={withTitle(DiscoverScreen)}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Quiz"
        component={withTitle(QuizScreen)}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Results"
        component={withTitle(ResultsScreen)}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QuizSelection"
        component={withTitle(QuizSelection)}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Leaderboard"
        component={withTitle(LeaderboardScreen)}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Favourites"
        component={withTitle(UserFavouriteMoviesScreen)}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default MyStack;
