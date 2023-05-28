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

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn, setCurrentUsername } = useContext(AuthContext);
  const { setFavouriteMovies } = useContext(FavouriteMoviesContext);

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
    logIn(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Signed in with user:", user.email, user.uid);
        getFavouriteMovies(user.uid);
        getUsername(user.uid);
      })
      .catch((error) => alert(error.message));
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
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.welcomeText}>
        Welcome to MovieTrivia! {"\n"}
        {"\n"}
      </Text>
      <Text style={styles.welcomeText}>Please login to continue.{"\n"}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogIn} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
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
