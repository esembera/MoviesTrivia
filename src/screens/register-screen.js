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

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { signUp, setCurrentUsername } = useContext(AuthContext);
  const { favouriteMovies } = useContext(FavouriteMoviesContext);

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

  const handleSignUp = () => {
    if (email === "" || password === "" || username === "") {
      toast.show({
        title: "Error",
        description: "Please enter your username, email and password.",
        variant: "subtle",
        placement: "bottom",
        bg: colorPalette.componentsBackgroundColor,
      });
      return;
    }
    signUp(email, password)
      .then((userCredentials) => {
        console.log("Registered with user:", userCredentials.user.email);
        db.collection("users").doc(userCredentials.user.uid).set({
          favMovies: favouriteMovies,
          username: username,
        });
      })
      .catch((error) => {
        if (
          error.code === "auth/wrong-password" ||
          error.code === "auth/user-not-found"
        ) {
          toast.show({
            title: "Error",
            description:
              "E-mail or password you entered is incorrect. Please try again.",
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
            description: "Please enter a valid email address.",
            variant: "subtle",
            placement: "bottom",
            bg: colorPalette.componentsBackgroundColor,
          });
        } else if (error.code === "auth/weak-password") {
          toast.show({
            title: "Error",
            description:
              "Password you entered is too weak. Please try again with a stronger password. (min. 6 characters)",
            variant: "subtle",
            placement: "bottom",
            bg: colorPalette.componentsBackgroundColor,
          });
        } else if (error.code === "auth/email-already-in-use") {
          toast.show({
            title: "Error",
            description:
              "This email is already in use. Please try again using different email.",
            variant: "subtle",
            placement: "bottom",
            bg: colorPalette.componentsBackgroundColor,
          });
        }
      });
    setCurrentUsername(username);
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
      <Text style={styles.welcomeText}>Fill the form to register.{"\n"}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.input}
          autoCapitalize="none"
          testID="usernameField"
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          autoCapitalize="none"
          testID="emailField"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          testID="passwordField"
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
          testID="registerBtn"
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

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
    fontWeight: "700",
    fontSize: 16,
  },
  welcomeText: {
    fontSize: 16,
    color: colorPalette.textColor,
    fontWeight: "700",
  },
});
