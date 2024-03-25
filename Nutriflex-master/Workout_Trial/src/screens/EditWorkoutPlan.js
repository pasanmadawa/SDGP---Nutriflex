import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";

const { width, height } = Dimensions.get("window");

import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const WorkoutPlanItem = ({ name, details }) => (
  <View style={styles.otherOptionsContainers}>
    <View style={styles.otherOptionDescContainer}>
      <Text>Name: {name}</Text>
      <Text>Details: {details}</Text>
    </View>
    <TouchableOpacity style={styles.confirmationButton}>
      <Text style={styles.buttonText}>Select</Text>
    </TouchableOpacity>
  </View>
);

const EditWorkoutPlan = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const { selectedItem } = route.params || {};

  const [workoutPlan, setWorkoutPlan] = useState(null);

  useEffect(() => {
    fetchWorkoutPlans();
  }, []);

  const fetchWorkoutPlans = async () => {
    try {
      const res = await axios.get(
        "http://192.168.1.2:5000/api/workoutLoad/workoutLoad"
      );
      setWorkoutPlan(res.data);
      console.log("Fetched Data:", res.data);
    } catch (error) {
      console.log("Fetch data Error:", error);
    }
  };

  // Display and edit workout plan details based on selectedItem
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back-sharp" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            Edit Workout : {selectedItem?.name}{" "}
            {/* Display selected item name */}
          </Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.outerContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Current Workout</Text>
            </View>
            <View style={styles.innerContainer}>
              <Text>Name: {selectedItem?.name}</Text>
              <Text>Details: {selectedItem?.details}</Text>
            </View>
          </View>
          <View style={styles.outerContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Suggested Workout Plan</Text>
            </View>
            {workoutPlan?.map((item, index) => (
              <View style={styles.innerContainer2} key={index}>
                <WorkoutPlanItem
                  name={item.workout}
                  details={`Calories burned per kg: ${item.calories}`}
                  duration={`Duration: ${item.duration}`}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: height * 0.05,
    paddingBottom: height * 0.02,
    width: width,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    right: width * 0.9,
    top: height * 0.055,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: width * 0.06,
    color: "white",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  outerContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#7166e4",
    paddingBottom: 10,
    marginVertical: height * 0.03,
    width: width * 0.9,
    alignSelf: "center",
  },
  titleContainer: {
    padding: 10,
    width: "100%",
    backgroundColor: "#7166e4",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 10,
  },
  title: {
    color: "white",
    fontSize: width * 0.05,
    fontWeight: "bold",
    textAlign: "center",
  },
  innerContainer: {
    padding: width * 0.04,
    backgroundColor: "#c2c3c6",
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
  },
  innerContainer2: {
    padding: width * 0.04,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    width: "100%",
    marginTop: height * 0.03,
    alignSelf: "center",
  },
  otherOptionsContainers: {
    backgroundColor: "#f4f6fa",
    borderWidth: 1,
    borderColor: "#7166e4",
    borderRadius: 10,
    height: height * 0.3,
    flexDirection: "column",
    justifyContent: "flex-end", // Added to position the button at the bottom
  },
  otherOptionDescContainer: {
    padding: width * 0.04,
    marginBottom: height * 0.07,
    backgroundColor: "#c2c3c6",
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
  },
  confirmationButton: {
    backgroundColor: "#7166e4",
    padding: width * 0.04,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: width * 0.05,
    fontWeight: "bold",
  },
});

export default EditWorkoutPlan;
