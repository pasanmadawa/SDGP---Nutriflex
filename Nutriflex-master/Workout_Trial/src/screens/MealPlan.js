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

const MealPlan = () => {
  const [DATA, setData] = useState([
    {
      title: "Breakfast",
      data: [{ name: "Dosa", details: "Calories: 574, Serving: 2" }],
    },
    {
      title: "Lunch",
      data: [
        {
          name: "Brown rice and Dahl",
          details: "Calories: 974, Serving: 1 cup",
        },
      ],
    },
    {
      title: "Dinner",
      data: [
        {
          name: "Mac & Cheese",
          details: "Calories: 700, Serving: 1 cup (200g)",
        },
      ],
    },
  ]);

  const navigation = useNavigation();

  const [currentDate, setCurrentDate] = useState(new Date());
  const formattedDate = currentDate.toLocaleDateString("en-US");

  const [expandedItem, setExpandedItem] = useState(null);


  const handleExpandItem = (item) => {
    const itemIndex = DATA.findIndex((i) => i.data[0] === item); // assuming data[0] holds the item object

    if (itemIndex !== -1) {
      DATA[itemIndex].data[0].isExpanded = !DATA[itemIndex].data[0].isExpanded;
      setData([...DATA]); 
    }
  };

  const handleNavigateToEditMealPlan = (item) => {
    navigation.navigate("EditMealPlan", { selectedItem: item });
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
            onPress={() => handleNavigateToEditMealPlan(item)}
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
        <Text style={styles.headerText}>Meal Plan</Text>
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

export default MealPlan;
