import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";

import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
const { width, height } = Dimensions.get("window");

function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.background}>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/appImages/homePage1.jpg")}
        resizeMode="cover" // Adjust resizeMode as needed
      >
        <View style={styles.overlay} />

        <View style={styles.container}>
          <View style={styles.logoPlace}>
            <Text style={styles.logo}>Nutriflex</Text>
            <Text style={styles.slogan}>Revolutionize Your Routine</Text>
          </View>
          <View style={styles.btnLayout}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => navigation.navigate("Signup")}
            >
              <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  image: {
    flex: 1, // Make image cover the entire container
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  container: {
    flex: 1, // Allow child elements to use flexbox
    paddingHorizontal: 20, // Use padding instead of absolute positioning
  },
  logoPlace: {
    flex: 1, // Take up remaining space after buttons
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    color: "#ffffff",
    fontSize: width * 0.2, // Adjust font size as needed
    fontWeight: "bold",
    marginTop: height * 0.09, // Add some margin
  },
  slogan: {
    color: "#ffffff",
    fontSize: width * 0.05, // Adjust font size as needed

    marginBottom: height * 0.2, // Add some margin
  },
  btnLayout: {
    justifyContent: "space-around",
    flexDirection: "row",
    paddingBottom: "20%",
    // flex: 0.2, // Allocate space for buttons (20% of screen)
  },
  loginButton: {
    backgroundColor: "#d9d9d9",
    paddingVertical: 20, // Increased padding for more height
    paddingHorizontal: 20,
    width: "45%",
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  loginText: {
    color: "#000000",
    fontSize: width * 0.05,
    textAlign: "center",
    fontWeight: "bold",
  },
  registerButton: {
    backgroundColor: "#d9d9d9",
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: "45%", // Use percentage for width
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  registerText: {
    color: "#000000",
    fontSize: width * 0.05,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
