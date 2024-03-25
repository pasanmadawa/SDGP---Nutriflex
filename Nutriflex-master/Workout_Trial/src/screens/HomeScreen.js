import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
const { width, height } = Dimensions.get("window");
import { calculateBMRMaleWithActivity, calculateHealthyCalorieDeficitMale, calculateBMRFemaleWithActivity, calculateHealthyCalorieDeficitFemale } from "./Logic";
import { useStore } from "../../App";

const HomeScreen = () => {
  const currentUser =  useStore((state) => state.currentUser);
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState(null);
  const [weight, setWeight] = useState(null);
  const [heightCm, setHeightCm] = useState(null);
  const [activityLevel, setActivityLevel] = useState(null);
  const [gender, selectedGender] = useState(null);
  const [caloriesConsumedToday, setCaloriesConsumedToday] = useState(0);
  const [caloriesBurntToday, setCaloriesBurntToday] = useState(0);

  // const [healthyCalorieDeficit , setHealthyCalorieDeficit] = useState(null);
  // setUserName(currentUser.name);
  useEffect (()=>{
    setUserName(currentUser.name);
    setAge(currentUser.age);
    setWeight(currentUser.selectedWeight);
    setHeightCm(currentUser.selectedHeight);
    setActivityLevel(currentUser.selectedOption);
    selectedGender(currentUser.selectedGender);
    // setHealthyCalorieDeficit(healthyCalorieDeficit);
  },[currentUser]);

  // useEffect (()=>{setHealthyCalorieDeficit(healthyCalorieDeficit)},[healthyCalorieDeficit]);


  // const [weight, setWeight] = useState(null);
  // const  [heightCm, setHeightCm] = useState(null);
  // const [activityLevel, setActivityLevel] = useState(null);

  // setUserName(currentUser.name);

  console.log(userName);
  console.log(age);
  console.log(weight);
  console.log(heightCm);
  console.log(activityLevel);
  console.log(gender);

  const test = gender;
  let healthyCalorieDeficit = 0; 

  if (test==="Male") {
    const {bmr,tdee} = calculateBMRMaleWithActivity(weight,height,age,activityLevel);
    console.log(bmr +" "+ tdee);
    healthyCalorieDeficit = calculateHealthyCalorieDeficitMale(tdee, age);
    console.log(healthyCalorieDeficit);
  } else if (test==="Female") {
    const { bmr, tdee } = calculateBMRFemaleWithActivity(weight,height,age,activityLevel);
    console.log(bmr +" "+ tdee);
    healthyCalorieDeficit = calculateHealthyCalorieDeficitFemale(tdee, age);
    console.log(healthyCalorieDeficit);
  }


  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome {userName}</Text>
      </View>
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.progressBarContainer}>
            <Text style={styles.progressText}>progress</Text>
            <Text style={styles.dateText}>Date</Text>
          </View>
          <View style={styles.progressBar}></View>
          <View style={styles.graphContainer}>
            <View style={styles.graph}></View>
          </View>
          <View style={styles.secondContainer}>
            <Text style={styles.heading}>Todays Schedule</Text>

            <View style={styles.graphContainer}>
              <View style={styles.graph}>
                <Text style={styles.goals}>
                  Today Calorie Deficit Goal :
                  <Text style={styles.value}> {healthyCalorieDeficit.toFixed(0)} Calorie</Text>
                </Text>
                <Text style={styles.goals}>
                  Calories Consumed Today : <Text> {caloriesConsumedToday} Calorie</Text>
                </Text>
                <Text style={styles.goals}>
                  Calories Burned Today :<Text> {caloriesBurntToday} Calorie</Text>
                </Text>
              </View>
            </View>

            <View style={styles.scheduleContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Workout Plan</Text>
              </View>
              <View style={styles.scheduleItems}>
                <View style={styles.scheduleItemsContainer}>
                  <Text>Push up</Text>
                  {/* Schedule Item */}
                  <TouchableOpacity style={styles.doneButton}>
                    <Text style={styles.doneText}>Done</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.scheduleItems}>
                <View style={styles.scheduleItemsContainer}>
                  <Text>Push up</Text>
                  {/* Schedule Item */}
                  <TouchableOpacity style={styles.doneButton}>
                    <Text style={styles.doneText}>Done</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.scheduleItems}>
                <View style={styles.scheduleItemsContainer}>
                  <Text>Push up</Text>
                  {/* Schedule Item */}
                  <TouchableOpacity style={styles.doneButton}>
                    <Text style={styles.doneText}>Done</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.scheduleContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Meal Plan</Text>
              </View>
              <View style={styles.scheduleItems}>
                <View style={styles.scheduleItemsContainer}>
                  <Text>Push up</Text>
                  {/* Schedule Item */}
                  <TouchableOpacity style={styles.doneButton}>
                    <Text style={styles.doneText}>Done</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.scheduleItems}>
                <View style={styles.scheduleItemsContainer}>
                  <Text>Push up</Text>
                  {/* Schedule Item */}
                  <TouchableOpacity style={styles.doneButton}>
                    <Text style={styles.doneText}>Done</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.scheduleItems}>
                <View style={styles.scheduleItemsContainer}>
                  <Text>Push up</Text>
                  {/* Schedule Item */}
                  <TouchableOpacity style={styles.doneButton}>
                    <Text style={styles.doneText}>Done</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
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
    paddingTop: height * 0.05,
    paddingBottom: height * 0.02,
    width: width,
    alignItems: "center",
  },
  headerText: {
    fontSize: width * 0.07,
    color: "#fff",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: width * 0.05,
  },
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.8,
    marginTop: height * 0.02,
  },
  progressBar: {
    width: "100%",
    height: height * 0.03,
    backgroundColor: "#ffffff",
    borderRadius: width * 0.05,
    marginTop: height * 0.01,
  },
  progressText: {
    marginRight: width * 0.02,
  },
  dateText: {
    flex: 1,
    textAlign: "right",
  },
  graphContainer: {
    backgroundColor: "#ffffff",
    width: width * 0.9,
    height: height * 0.2,
    borderWidth: 1,
    borderColor: "#7166e4",
    borderRadius: width * 0.05,
    marginTop: height * 0.02,
    justifyContent: "center",
    alignItems: "center",
  },
  graph: {
    backgroundColor: "#7166e4",
    padding: width * 0.05,
    width: "95%",
    height: "90%",
    borderRadius: width * 0.05,
  },
  goals: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: width * 0.04,
    marginBottom: height * 0.02,
  },
  value: {
    color: "#ff0000",
  },
  secondContainer: {
    marginTop: height * 0.02,
    width: width * 0.8,
    alignItems: "center",
  },
  heading: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    marginBottom: height * 0.02,
  },
  scheduleContainer: {
    backgroundColor: "#ffffff",
    width: width * 0.9,
    height: height * 0.6,
    borderRadius: width * 0.05,
    borderWidth: 1,
    borderColor: "#7166e4",
    marginTop: height * 0.02,
  },
  titleContainer: {
    padding: width * 0.03,
    backgroundColor: "#7166e4",
    borderTopLeftRadius: width * 0.05,
    borderTopRightRadius: width * 0.05,
    marginBottom: height * 0.01,
  },
  title: {
    fontSize: width * 0.05,
    color: "#fff",
    fontWeight: "bold",
  },
  scheduleItems: {
    padding: width * 0.05,
    backgroundColor: "#7166e4",
    borderRadius: width * 0.05,
    marginTop: height * 0.01,
    width: width * 0.8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  scheduleItemsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#f4f6fa",
    padding: width * 0.05,
    borderRadius: width * 0.05,
  },
  doneButton: {
    padding: width * 0.03,
    backgroundColor: "#4c4c4c",
    borderRadius: width * 0.05,
  },
  doneText: {
    color: "#fff",
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
});

export default HomeScreen;
