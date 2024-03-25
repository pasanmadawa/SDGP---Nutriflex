import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";
import axios from "axios";
import { Platform } from "react-native";
import PageProgressBar from "../../components/ProgressBar";

import DropdownComponent from "../../components/DropdownComponent";

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

function Customization_2() {
  const navigation = useNavigation();

  const [selectedHeight, setSelectedHeight] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [selectedWeightLoss, setSelectedWeightLoss] = useState(null);

  const [selectedHeightUnit, setSelectedHeightUnit] = useState("CM");
  const [selectedWeightUnit, setSelectedWeightUnit] = useState("KG");

  const handleHeightSelect = (height) => setSelectedHeight(height);
  const handleWeightSelect = (weight) => setSelectedWeight(weight);

  const handleCustom_2 = async () => {
    const userData_2 = {
      selectedHeight: selectedHeight,
      selectedWeight: selectedWeight,
      selectedWeightLoss: selectedWeightLoss,
    };

    try {
      if (selectedHeight == "" || selectedWeight == "") {
        alert("Please fill all fields");
        navigation.navigate("Custom_2");
      } else {
        if (selectedHeight !== "" && selectedWeight !== "") {
          const res = await axios.post(
            "http://192.168.1.2:5000/api/signInServer/Custom_2",
            userData_2,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          navigation.navigate("Custom_3");
        }
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleHeightUnitSelect = (unit) => {
    setSelectedHeightUnit(unit);
    if (unit !== selectedHeightUnit) {
      setSelectedHeight(null);
    }
  };

  const handleWeightUnitSelect = (unit) => {
    setSelectedWeightUnit(unit);
    if (unit !== selectedWeightUnit) {
      setSelectedWeight(null);
    }
  };

  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView style={styles.container}>
        <View style={styles.topText}>
          <Text style={styles.textTitles}>Let us get to know you</Text>
        </View>
        <PageProgressBar totalPages={3} currentPage={2} />

        <View style={styles.content}>
          <View style={styles.questionRow}>
            <Text style={styles.question}>What is your Height</Text>
            <View style={styles.unitRow1}>
              <TouchableOpacity
                style={[
                  styles.bubbles,
                  selectedHeightUnit === "CM" && styles.selectedOption,
                ]}
                onPress={() => handleHeightUnitSelect("CM")}
              >
                <Text style={styles.option_1}>CM</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.bubbles,
                  selectedHeightUnit === "FT" && styles.selectedOption,
                ]}
                onPress={() => handleHeightUnitSelect("FT")}
              >
                <Text style={styles.option_2}>FT</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TextInput
            keyboardType="numeric"
            placeholder="Enter your Height"
            placeholderTextColor="#7166e4"
            style={styles.input}
            value={selectedHeight}
            onChangeText={(selectedHeight) => setSelectedHeight(selectedHeight)}
          />

          <View style={styles.questionRow}>
            <Text style={styles.question}>What is your Weight</Text>
            <View style={styles.unitRow2}>
              <TouchableOpacity
                style={[
                  styles.bubbles,
                  selectedWeightUnit === "KG" && styles.selectedOption,
                ]}
                onPress={() => handleWeightUnitSelect("KG")}
              >
                <Text style={styles.option_1}>KG</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.bubbles,
                  selectedWeightUnit === "LB" && styles.selectedOption,
                ]}
                onPress={() => handleWeightUnitSelect("LB")}
              >
                <Text style={styles.option_2}>LB</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TextInput
            keyboardType="numeric"
            placeholder="Enter your Weight"
            placeholderTextColor="#7166e4"
            style={styles.input}
            value={selectedWeight}
            onChangeText={(selectedWeight) => setSelectedWeight(selectedWeight)}
          />

          <View style={styles.questionRow}>
            <Text style={styles.question}>What is your Weight Loss Goal?</Text>
            <View style={styles.unitRow3}>
              <TouchableOpacity
                style={[
                  styles.bubbles,
                  selectedWeightUnit === "KG" && styles.selectedOption,
                ]}
                onPress={() => handleWeightUnitSelect("KG")}
              >
                <Text style={styles.option_1}>KG</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.bubbles,
                  selectedWeightUnit === "LB" && styles.selectedOption,
                ]}
                onPress={() => handleWeightUnitSelect("LB")}
              >
                <Text style={styles.option_2}>LB</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TextInput
            keyboardType="numeric"
            placeholder="Enter your Weight Loss Goal"
            placeholderTextColor="#7166e4"
            style={styles.input}
            value={selectedWeightLoss}
            onChangeText={(selectedWeightLoss) =>
              setSelectedWeightLoss(selectedWeightLoss)
            }
          />
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#7166e4" }]}
            onPress={() => navigation.navigate("Custom_1")}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#7166e4" }]}
            onPress={handleCustom_2}
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
  content: {
    flex: 1,
    justifyContent: "center",
  },
  textTitles: {
    fontSize: width * 0.06, // 6% of the screen width
    fontWeight: "bold",
    textAlign: "center",
    marginTop: height * 0.02, // 2% of the screen height

    marginBottom: height * 0.001,
  },
  questionRow: {
    marginVertical: height * 0.02, // 2% of the screen height
    flexDirection: "row",
    alignItems: "center",
  },
  unitRow1: {
    flexDirection: "row",
    marginLeft: width * 0.02, // 2% of the screen width
  },
  unitRow2: {
    flexDirection: "row",
    marginLeft: width * 0.02, // 2% of the screen width
  },
  unitRow3: {
    flexDirection: "row",
    marginLeft: width * 0.02, // 2% of the screen width
  },
  bubbles: {
    backgroundColor: "#d9dbf8",
    padding: width * 0.03, // 3% of the screen width
    borderRadius: width * 0.02, // 2% of the screen width
    margin: width * 0.02, // 2% of the screen width
    borderWidth: 0.8,
    borderColor: "#7166e4",
  },
  selectedOption: {
    backgroundColor: "#7166e4",
  },
  option_1: {},
  option_2: {},
  question: {
    marginTop: height * 0.02, // 2% of the screen height
    fontSize: width * 0.05, // 5% of the screen width
    fontWeight: "bold",
    flex: 1,
    margin: width * 0.02, // 2% of the screen width
  },
  input: {
    backgroundColor: "#ffffff",
    padding: width * 0.04, // 4% of the screen width
    marginVertical: height * 0.01, // 2% of the screen height
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
});

export default Customization_2;
