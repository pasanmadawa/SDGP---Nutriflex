import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";
import PageProgressBar from "../../components/ProgressBar";

import axios from "axios";
import { useNavigation } from "@react-navigation/native";
// import Footer from "../../components/Footer";
import { useStore } from "../../App";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./config/firebase-config";

import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

function Customization_3() {
  const updateCurrentUser = useStore((state) => state.updateCurrentUser);
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);

  const [opacityAnim] = useState(new Animated.Value(0)); // For "More Information" text

  const information = {
    "Not really Active": ["Desk jobs, low-exertion leisure."],
    "Lightly Active": ["Walking, chores, light exercise"],
    "Moderately Active": ["Sports, brisk walking, active jobs."],
    "Highly Active": [" Intense workouts, physical labor, training."],
  };

  const handleCustom_3 = async () => {
    const userData_4 = {
      selectedOption: selectedOption,
    };

    try {
      if (selectedOption === null) {
        alert("Please fill all the fields");
        navigation.navigate("Custom_3");
      } else {
        if (selectedOption !== null) {
          const res = await axios.post(
            "http://192.168.1.2:5000/api/signInServer/Custom_3",
            userData_4,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const docRef = doc(db, "Users", res.data.UID);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            updateCurrentUser(docSnap.data());
          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
          }

          navigation.navigate("Navigation");
        }
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    // If a selected option exists, animate text opacity to 1
    if (selectedOption) {
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [selectedOption]);

  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView style={styles.container}>
        <View style={styles.topText}>
          <Text style={styles.title}>Let us get to know you</Text>
          <PageProgressBar totalPages={3} currentPage={3} />

          <View style={styles.content}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>What is your Activity</Text>

              {[
                "Not really Active",
                "Lightly Active",
                "Moderately Active",
                "Highly Active",
              ].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionBtn,
                    selectedOption === option
                      ? [styles.selectedOption, styles.selectedOptionLarger]
                      : null,
                    /* Add animated scale for smooth size change */
                    styles.animatedScale,
                  ]}
                  onPress={() => handleOptionPress(option)}
                >
                  <Animated.Text
                    style={{
                      opacity: selectedOption === option ? 1 : 0.5,
                      transform: [
                        { scale: selectedOption === option ? 1.1 : 1 },
                      ],
                      color: selectedOption === option ? "#ffffff" : "#7166e4",
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  >
                    {option}
                  </Animated.Text>
                  {selectedOption === option && (
                    <Animated.View
                      style={[
                        styles.moreInfoContainer,
                        { opacity: opacityAnim },
                      ]}
                    >
                      {/* <Text style={styles.moreInfoTitle}>More Information:</Text> */}
                      {information[option].map((infoLine) => (
                        <Text key={infoLine} style={styles.moreInfoText}>
                          {infoLine}
                        </Text>
                      ))}
                    </Animated.View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => navigation.navigate("Custom_2")}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button]}
            //onPress={() => navigation.navigate("Navigation")}
            onPress={handleCustom_3}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fa",
    paddingHorizontal: width * 0.05, // 5% of the screen width
    paddingTop: height * 0.05, // 5% of the screen height
    justifyContent: "space-between", // Distribute content vertically
  },

  topText: {
    marginBottom: height * 0.03,
  },

  title: {
    fontSize: width * 0.06, // 6% of the screen width
    fontWeight: "bold",
    textAlign: "center",
    marginTop: height * 0.02, // 2% of the screen height
    marginBottom: height * 0.03, // 2% of the screen height
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  formGroup: {
    marginTop: height * 0.08, // 2% of the screen height
    marginBottom: height * 0.02, // 2% of the screen height
  },
  label: {
    fontSize: width * 0.05, // 5% of the screen width
    fontWeight: "bold",
    marginBottom: height * 0.05, // 5% of the screen height
  },
  optionBtn: {
    backgroundColor: "#ffffff",
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.08,
    marginHorizontal: width * 0.01,
    borderRadius: width * 0.03,
    marginBottom: height * 0.02,
    borderWidth: 1,
    borderColor: "#7166e4",
  },
  selectedOption: {
    backgroundColor: "#7166e4",
  },
  selectedOptionLarger: {
    padding: 30, // Adjust padding for desired size increase
  },
  moreInfoText: {
    color: "#ffffff",
    paddingTop: height * 0.02,
    fontSize: width * 0.04,
  },
  animatedScale: {
    transform: [{ scale: 1 }],
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute", // Position at the bottom
    bottom: height * 0.02, // Adjust as needed
    left: 0,
    right: 0,
    paddingHorizontal: width * 0.1, // 10% of the screen width
  },
  button: {
    backgroundColor: "#7166e4",
    padding: width * 0.04, // 4% of the screen width
    borderRadius: width * 0.03, // 3% of the screen width
    width: "45%",
    alignItems: "center",
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
  buttonText: {
    color: "#ffffff",
    fontSize: width * 0.05, // 5% of the screen width
    fontWeight: "bold",
  },
});

export default Customization_3;
