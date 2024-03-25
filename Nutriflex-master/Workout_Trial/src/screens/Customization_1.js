import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";
import axios from "axios";
import { Platform } from "react-native";
import PageProgressBar from "../../components/ProgressBar";

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

function Customization_1() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [age, setAge] = useState("");

  const handleGenderSelection = (gender) => {
    if (gender !== selectedGender) {
      setSelectedGender(gender);
    }
  };

  const handleCustom_1 = async () => {
    const userData_2 = {
      name: name,
      selectedGender: selectedGender,
      age: age,
    };

    try {
      if (name === "" || selectedGender === "" || age === "") {
        alert("Please fill and select all the fields");
        navigation.navigate("Custom_1");
      } else {
        if (name !== "" && selectedGender !== "" && age !== "") {
          const res = await axios.post(
            "http://192.168.1.2:5000/api/signInServer/Custom_1",
            userData_2,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          navigation.navigate("Custom_2");
        }
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView style={styles.container}>
        <View style={styles.topText}>
          <Text style={styles.title}>Let us get to know you</Text>
        </View>
        <PageProgressBar totalPages={3} currentPage={1} />
        <View style={styles.content}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>How should we call you?</Text>
            <TextInput
              value={name}
              placeholder="Enter your name"
              placeholderTextColor="#7166e4"
              onChangeText={(name) => setName(name)}
              style={styles.input}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Select your Gender</Text>
            <View style={styles.genderButtons}>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  selectedGender === "Male"
                    ? styles.selectedGenderButton
                    : null,
                ]}
                onPress={() => handleGenderSelection("Male")}
              >
                <Text
                  style={[
                    styles.genderButtonText,
                    selectedGender === "Male"
                      ? { color: "#ffffff" }
                      : { color: "#7166e4" },
                  ]}
                >
                  Male
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  selectedGender === "Female"
                    ? styles.selectedGenderButton
                    : null,
                ]}
                onPress={() => handleGenderSelection("Female")}
              >
                <Text
                  style={[
                    styles.genderButtonText,
                    selectedGender === "Female"
                      ? { color: "#ffffff" }
                      : { color: "#7166e4" },
                  ]}
                >
                  Female
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Enter your Age</Text>
            <TextInput
              keyboardType="numeric"
              value={age}
              placeholder="Enter your age"
              placeholderTextColor="#7166e4"
              onChangeText={(age) => setAge(age)}
              style={styles.input}
            />
          </View>
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedGender && age ? null : styles.disabledButton,
            ]}
            onPress={handleCustom_1}
            disabled={!selectedGender || !age}
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
  },
  topText: {
    alignItems: "center",
    marginBottom: height * 0.03, // 3% of the screen height
  },
  title: {
    fontSize: width * 0.06, // 6% of the screen width
    fontWeight: "bold",
    textAlign: "center",
    marginTop: height * 0.02, // 2% of the screen height

    marginBottom: height * 0.001,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  formGroup: {
    marginBottom: height * 0.04, // 2% of the screen height
  },
  label: {
    fontSize: width * 0.05, // 5% of the screen width
    fontWeight: "bold",
    marginBottom: height * 0.01, // 2% of the screen height
  },
  input: {
    backgroundColor: "#ffffff",
    padding: width * 0.04, // 4% of the screen width
    marginVertical: height * 0.02, // 2% of the screen height
    borderRadius: width * 0.03, // 3% of the screen width
    borderWidth: 1,
    borderColor: "#7166e4",
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
  genderButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: height * 0.02, // 5% of the screen height
    paddingHorizontal: width * 0.1, // 10% of the screen width
  },
  genderButton: {
    backgroundColor: "#ffffff",
    paddingVertical: width * 0.03, // 3% of the screen width
    paddingHorizontal: width * 0.08, // 8% of the screen width
    borderRadius: width * 0.03, // 3% of the screen width
    width: "45%",
    borderWidth: 1,
    borderColor: "#7166e4",
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
  selectedGenderButton: {
    backgroundColor: "#7166e4",
  },
  genderButtonText: {
    fontSize: width * 0.04, // 4% of the screen width
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed",
    bottom: 0,
    width: "100%",
    paddingHorizontal: width * 0.1, // 10% of the screen width
    paddingBottom: height * 0.02, // 2% of the screen height
    // backgroundColor: "#fff", // Background color for the button group
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
  disabledButton: {
    backgroundColor: "#ccc",
  },
});

export default Customization_1;
