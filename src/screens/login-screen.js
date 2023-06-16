import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { colorPalette } from "../../assets/theme/color-palette";
import { auth, db } from "../../firebase";
import { useNavigation } from "@react-navigation/core";
import { AuthContext } from "../components/contexts/auth.context";
import { FavouriteMoviesContext } from "../components/contexts/favouriteMovies.context";
import { useToast } from "native-base";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn, setCurrentUsername } = useContext(AuthContext);
  const { setFavouriteMovies } = useContext(FavouriteMoviesContext);

  const toast = useToast();

  const navigation = useNavigation();

  //this triggers on loading the login screen and once auth state changes (user either signs up or logs in),
  //it navigates user to home screen
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const handleLogIn = () => {
    if (email === "" || password === "") {
      toast.show({
        title: "Error",
        description: "Please enter your email and password",
        variant: "subtle",
        placement: "bottom",
        bg: colorPalette.componentsBackgroundColor,
      });
      return;
    }
    logIn(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Signed in with user:", user.email, user.uid);
        getFavouriteMovies(user.uid);
        getUsername(user.uid);
      })
      .catch((error) => {
        if (
          error.code === "auth/wrong-password" ||
          error.code === "auth/user-not-found"
        ) {
          toast.show({
            title: "Error",
            description: "E-mail or password you entered is incorrect",
            variant: "subtle",
            placement: "bottom",
            bg: colorPalette.componentsBackgroundColor,
          });
        } else if (error.code === "auth/too-many-requests") {
          toast.show({
            title: "Error",
            description:
              "Too many unsuccessful login attempts. Please try again later.",
            variant: "subtle",
            placement: "bottom",
            bg: colorPalette.componentsBackgroundColor,
          });
        } else if (error.code === "auth/invalid-email") {
          toast.show({
            title: "Error",
            description: "Please enter a valid email address",
            variant: "subtle",
            placement: "bottom",
            bg: colorPalette.componentsBackgroundColor,
          });
        }
      });
  };

  const getFavouriteMovies = async (uid) => {
    const docRef = db.collection("users").doc(`${uid}`);
    await docRef.get().then((doc) => {
      setFavouriteMovies(doc.data().favMovies);
    });
    // console.log(favouriteMovies);
  };

  const getUsername = async (uid) => {
    const docRef = db.collection("users").doc(`${uid}`);
    await docRef.get().then((doc) => {
      setCurrentUsername(doc.data().username);
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      accessible={true}
    >
      <Text style={styles.welcomeText}>
        Welcome to MovieTrivia! {"\n"}
        {"\n"}
      </Text>
      <Text style={styles.welcomeText}>Please login to continue.{"\n"}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          testID="emailField"
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          testID="passwordField"
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer} accessible={true}>
        <TouchableOpacity onPress={handleLogIn} style={styles.button}>
          <Text style={styles.buttonText} testID="loginBtn">
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          testID="goToSignUp"
        >
          <Text style={styles.buttonOutlineText}>
            Don't have an account? Sign up here.
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: colorPalette.textColor,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: colorPalette.textColor,
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: colorPalette.textColor,
    textAlign: "center",
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    marginTop: 5,
    fontWeight: "700",
    fontSize: 16,
  },
  welcomeText: {
    fontSize: 16,
    color: colorPalette.textColor,
    fontWeight: "700",
  },
});
