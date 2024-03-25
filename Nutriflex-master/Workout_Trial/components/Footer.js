// Footer.js
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Footer = ({ previousScreen, nextScreen }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.previousButton}
        onPress={() => navigation.navigate(previousScreen)}
      >
        <Text style={styles.previousText}>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate(nextScreen)}
      >
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute", // Ensures the footer stays at the bottom
    bottom: 0,
    left: 0,
    right: 0,
    height: 60, // Adjust height as needed
    justifyContent: "space-around",
    flexDirection: "row",
    backgroundColor: "#a2abd9", // Adjust background color as needed
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  previousButton: {
    backgroundColor: "#536eff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: "30%",
    borderRadius: 10,
  },
  previousText: {
    color: "#ffffff",
    fontSize: 18,
    textAlign: "center",
  },
  nextButton: {
    backgroundColor: "#536eff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: "30%",
    borderRadius: 10,
  },
  nextText: {
    color: "#ffffff",
    fontSize: 18,
    textAlign: "center",
  },
});

export default Footer;
