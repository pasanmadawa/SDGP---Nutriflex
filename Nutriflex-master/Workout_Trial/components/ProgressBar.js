import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PageProgressBar = ({ totalPages, currentPage }) => {
  const progress = currentPage / totalPages; // Calculate progress ratio

  const progressBarStyle = {
    width: `${progress * 100}%`, // Set progress bar width based on ratio
    backgroundColor: "#7166e4", // Customize progress bar color
    borderRadius: 5, // Add rounded corners for aesthetics
  };

  const remainingBarStyle = {
    width: `${(1 - progress) * 100}%`, // Calculate remaining bar width
    backgroundColor: "#ffffff", // Customize remaining bar color
    borderRadius: 5,
  };

  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBar, progressBarStyle]} />
      <View style={[styles.progressBar, remainingBarStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  progressBar: {
    height: 8, // Set progress bar height
  },
});

export default PageProgressBar;
