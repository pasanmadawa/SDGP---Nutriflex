import react, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  SectionList,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
  Pressable,
  // Avatar,
} from "react-native";
import { Avatar } from "react-native-paper";
import { db } from "./config/firebase-config";
import { signOut } from "firebase/auth";
import { auth } from "./config/firebase-config";
import WelcomeScreen from "./WelcomeScreen";
import StackNavigator from "../../StackNavigator";
import { useRoute, useNavigation } from "@react-navigation/native";
import { LogIn, userID } from "./LoginScreen";
import axios from "axios";
import { useStore } from "../../App";

const { width, height } = Dimensions.get("window");

const ProfilePage = () => {
  const navigation = useNavigation();
  const currentUser = useStore((state) => state.currentUser);
  const updateCurrentUser = useStore((state) => state.updateCurrentUser);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [age, setAge] = useState(null);
  const [userName, setUserName] = useState(null);
  console.log(currentUser);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        updateCurrentUser({});
        navigation.navigate("Welcome");
      })
      .catch((error) => {
        console.log("Error signing out:", error);
      });
  };

  useEffect(() => {
    setUserName(currentUser.name);
    setAge(currentUser.age);
    setWeight(currentUser.selectedWeight);
    setHeight(currentUser.selectedHeight);
  }, [currentUser]);
  console.log(height);
  console.log(age);
  console.log(userName);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>User Profile</Text>
      </View>
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.profileContainer}>
            <Avatar.Image
              style={styles.avatar}
              size={100}
              source={require("../../assets/appImages/logIn.jpg")}
            />
            <View style={styles.profileDetails}>
              <View style={styles.greetingContainer}>
                <Text style={styles.greeting}>Hello</Text>
                <Text style={styles.username}>{userName}</Text>
              </View>
            </View>
            <View style={styles.editContainer}>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editText}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.logoutButton}
              >
                <Text style={styles.editText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.profileContainer}>
            <View style={styles.heightweight}>
              <View style={styles.row}>
                <Text style={styles.label}>{height}cm</Text>
                <Text style={styles.value}>Height</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>{weight}Kg</Text>
                <Text style={styles.value}>Weight</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>{age}</Text>
                <Text style={styles.value}>Age</Text>
              </View>
            </View>
          </View>
          <View style={styles.profileContainer}>
            <View style={styles.questionForm}>
              <Text style={styles.question}>Update your Height</Text>
              <TextInput
                placeholder="Update your weight"
                placeholderTextColor="#7166e4"
                style={styles.input}
              />
            </View>
            <View style={styles.questionForm}>
              <Text style={styles.question}>Update your Weight</Text>
              <TextInput
                placeholder="Update your weight"
                placeholderTextColor="#7166e4"
                style={styles.input}
              />
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
    alignItems: "center",
    paddingTop: height * 0.05,
    paddingBottom: height * 0.02,
  },
  headerText: {
    fontSize: width * 0.07,
    color: "#fff",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  profileContainer: {
    alignSelf: "center",
    alignItems: "center",
    margin: 10,
    backgroundColor: "#ffffff",
    padding: 15,
    paddingBottom: 30,
    borderWidth: 1,
    borderColor: "#7166e4",
    borderRadius: 10,
    width: "90%",
  },
  avatar: {
    marginTop: 10,
  },
  profileDetails: {
    marginTop: 30,
    alignItems: "center",
    padding: 10,
    paddingVertical: 30,
    width: "80%",
    backgroundColor: "#f0f0ff",
    borderRadius: 10,
    borderWidth: 1,
  },
  greetingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
  },
  username: {
    fontSize: 24,
    marginLeft: 10,
  },
  editContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
  editButton: {
    backgroundColor: "#7166e4",
    padding: 10,
    borderRadius: 5,
  },
  logoutButton: {
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 5,
  },
  editText: {
    color: "#fff",
    textAlign: "center",
  },
  profileStats: {
    backgroundColor: "blue",
    flex: 1,
    justifyContent: "top",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  heightweight: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
  },
  row: {
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
    marginTop: 5,
  },
  questionForm: {
    marginTop: 20,
    paddingLeft: 20,
    width: "100%",
  },

  question: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    marginBottom: height * 0.01,
    marginTop: height * 0.02,
  },
  input: {
    backgroundColor: "#ffffff",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#7166e4",
    width: "80%",
  },
});

export default ProfilePage;
