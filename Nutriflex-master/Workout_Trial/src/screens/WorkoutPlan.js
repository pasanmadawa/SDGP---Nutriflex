import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

import { useNavigation } from "@react-navigation/native";

import { Platform } from "react-native";

const WorkoutPlan = () => {
  const [DATA, setData] = useState([
    {
      title: "Exercise 1",
      data: [{ name: "Sit ups", details: "Reps: 48 Calorie loss: 24" }],
    },
    {
      title: "Exercise 2",
      data: [
        { name: "Jumping Rope", details: "Duration: 30mins Calorie loss: 70" },
      ],
    },
    {
      title: "Exercise 3",
      data: [{ name: "Running", details: "Duration: 30mins Calorie loss: 65" }],
    },
    {
      title: "Exercise 4",
      data: [{ name: "Push Up", details: "Reps: 48 Calorie loss: 45" }],
    },
  ]);

  const navigation = useNavigation();

  const [currentDate, setCurrentDate] = useState(new Date());
  const formattedDate = currentDate.toLocaleDateString("en-US");

  // State to track expanded item
  const [expandedItem, setExpandedItem] = useState(null);

  // Function to handle expanding item
  const handleExpandItem = (item) => {
    // Find the index of the clicked item in the data
    const itemIndex = DATA.findIndex((i) => i.data[0] === item); // assuming data[0] holds the item object

    if (itemIndex !== -1) {
      // Update the isExpanded property of the clicked item
      DATA[itemIndex].data[0].isExpanded = !DATA[itemIndex].data[0].isExpanded;
      // Trigger a re-render using React.useState setter
      setData([...DATA]); // Spread operator to create a new array reference for re-render
    }
  };

  const handleNavigateToEditWorkoutPlan = (item) => {
    navigation.navigate("EditWorkoutPlan", { selectedItem: item });
  };

  const renderItem = ({ item, section, index }) => (
    <View style={styles.itemFrame}>
      <View style={styles.innerItem}>
        <Text style={styles.title}>{section.title}</Text>
        <View style={styles.itemNameContainer}>
          <Text style={styles.itemText}>{item.name}</Text>
          {item.isExpanded && (
            <View style={styles.detailsContainer}>
              <Text style={styles.detailsText}>{item.details}</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.moreDetailButton}
            onPress={() => handleExpandItem(item)}
          >
            <Text style={styles.moreDetailButtonText}>
              Click for More Details
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#7166e4" }]}
            onPress={() => handleNavigateToEditWorkoutPlan(item)}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#7166e4" }]}
          >
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Workout Plan</Text>
      </View>
      <View>
        <Text style={styles.date}>Date: {formattedDate}</Text>
      </View>
      <SectionList
        style={styles.container}
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, section, index }) =>
          renderItem({ item, section, index })
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fa",
  },
  header: {
    backgroundColor: "#7166e4",
    alignItems: "center",
    paddingTop: height * 0.05,
    paddingBottom: height * 0.02,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: width * 0.07,
    color: "white",
  },
  date: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    backgroundColor: "#7166e4",
    color: "white",
    textAlign: "center",
    margin: width * 0.05,
    padding: width * 0.04,
    borderRadius: width * 0.02,
  },
  itemFrame: {
    alignItems: "center",
    marginVertical: height * 0.01,
    marginHorizontal: width * 0.0001,
    borderRadius: width * 0.02,
  },

  innerItem: {
    padding: width * 0.04,
    backgroundColor: "#ffffff",
    borderWidth: width * 0.004,
    borderColor: "#7166e4",
    marginVertical: height * 0.01,
    marginHorizontal: width * 0.04,
    borderRadius: width * 0.02,
    width: "88%",
  },
  itemText: {
    fontSize: width * 0.06,
    marginBottom: height * 0.01,
  },
  itemNameContainer: {
    padding: width * 0.04,
    backgroundColor: "#f4f6fa",
    borderRadius: width * 0.02,
    borderWidth: width * 0.002,
    borderColor: "#7166e4",
  },
  moreDetailButton: {
    alignSelf: "center",
    padding: width * 0.02,
    borderRadius: width * 0.01,
    alignItems: "center",
    backgroundColor: "#7166e4",
    width: "80%",
    marginTop: height * 0.02,
    marginBottom: height * 0.01,
  },
  moreDetailButtonText: {
    color: "#ffffff",
    fontSize: width * 0.04,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: height * 0.02,
    paddingHorizontal: width * 0.1,
    marginBottom: height * 0.01,
  },
  button: {
    backgroundColor: "#7166e4",
    marginRight: width * 0.03,
    paddingVertical: width * 0.04,
    paddingHorizontal: width * 0.01,
    borderRadius: width * 0.02,
    width: "45%",
    alignSelf: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: width * 0.05,
    fontWeight: "bold",
  },

  detailsContainer: {
    backgroundColor: "#ffffff",
    borderRadius: width * 0.02,
    paddingHorizontal: width * 0.04,
    paddingVertical: width * 0.02,
  },
  detailsText: {
    fontSize: width * 0.04,
  },
  title: {
    fontSize: width * 0.08,
    marginBottom: height * 0.02,
    fontWeight: "bold",
  },
});

export default WorkoutPlan;
