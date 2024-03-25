import React, { useState } from "react";
import axios from "axios";
import { Platform } from "react-native";
import { auth } from "./config/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./config/firebase-config";

//import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
// import { AntDesign } from "@expo/vector-icons";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";

import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { useStore } from "../../App";

const { width, height } = Dimensions.get("window");

const LogIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userID, setUserID] = useState(null);
  const updateCurrentUser = useStore((state) => state.updateCurrentUser);

  console.log(userID);

  const logInFunction = async () => {
    try {
      if (email === "" || password === "") {
        alert("Please fill all the fields");
        //navigation.navigate("Login");
      } else {
        if (password.length < 8) {
          alert("Password must be at least 8 characters long");
        } else {
          signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
              // Signed in
              const user = userCredential.user;
              const userID = user.uid;
              const docRef = doc(db, "Users", userID);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                updateCurrentUser(docSnap.data());
              } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
              }
              navigation.navigate("Navigation");
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.error("Error:", errorMessage);
              alert("An error occurred during login, please try again later");
            });
          const { user } = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          const uid = user.uid;
          const res = await axios.post(
            "http://192.168.1.2:5000/api/logInServer/LogIn",
            { email, password, uid },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log("hi1");
          // const data = await res.data;
        }
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/appImages/logIn.jpg")}
        >
          <View style={styles.overlay} />
          <View style={styles.header}>
            <Text style={styles.greetingTitle}>Welcome back</Text>
            <Text style={styles.headTitle}>Log in</Text>
          </View>
          <View style={styles.inputTxt}>
            <Text style={styles.textTitles}>Enter your Email</Text>

            <TextInput
              placeholder="Email@gmail.com"
              placeholderTextColor={"#7166e4"}
              value={email}
              keyboardType="email-address"
              onChangeText={(email) => setEmail(email)}
              style={styles.inputArea}
            />
            <Text style={styles.textTitles}>Enter your Password</Text>

            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="* * * * * * * *"
                placeholderTextColor={"#7166e4"}
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry={!showPassword}
                style={styles.passwordInputArea}
              />
              <TouchableOpacity
                style={styles.passwordToggle}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Icon
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={24}
                  color="#7166e4"
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgotTxt}>Forgot Password?</Text>
          </TouchableOpacity>
          <View style={styles.btnLayout}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={logInFunction}
            >
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
            <View
              style={{
                alignSelf: "center",
                borderBottomWidth: 2.5,
                borderBottomColor: "rgb(217,217,217)",
                width: "100%",
              }}
            ></View>
            <TouchableOpacity style={styles.googleButton}>
              <Text style={styles.googleText}>Sign in with Google</Text>
              <Icon
                name="logo-google"
                size={24}
                color="black"
                style={styles.googleIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.createBtn}
              onPress={() => navigation.navigate("Signup")}
            >
              <Text style={styles.createText}>
                Don't have an account?{" "}
                <Text style={{ color: "#7166e4", fontWeight: "bold" }}>
                  Create account
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </KeyboardAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  header: {
    paddingTop: height * 0.05,
    width: width,
    alignItems: "center",
  },
  greetingTitle: {
    color: "white",
    paddingBottom: 1,
    fontSize: width * 0.08,
  },
  headTitle: {
    color: "white",
    paddingBottom: 50,
    fontSize: width * 0.1,
    fontWeight: "bold",
  },
  inputTxt: {
    marginTop: height * 0.04,
  },
  textTitles: {
    marginTop: 10,
    fontSize: width * 0.04,
    fontWeight: "bold",
    marginLeft: width * 0.05,
    marginBottom: width * 0.02,
    color: "white",
  },
  inputArea: {
    alignSelf: "center",
    backgroundColor: "white",
    padding: width * 0.03,
    borderRadius: 10,
    width: width * 0.9,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.9,
    alignSelf: "center",
  },
  passwordToggle: {
    position: "absolute",
    right: width * 0.04,
  },
  passwordInputArea: {
    alignSelf: "center",
    backgroundColor: "white",
    padding: width * 0.04,
    marginTop: height * 0.01,
    borderRadius: 10,
    width: "100%",
  },
  forgotTxt: {
    color: "white",
    margin: 5,
    marginRight: width * 0.06,
    alignSelf: "flex-end",
  },
  btnLayout: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: height * 0.02,
    width: "90%",
    alignSelf: "center",
  },
  loginButton: {
    alignSelf: "center",
    padding: width * 0.04,
    backgroundColor: "#7166e4",
    marginVertical: 30,
    marginHorizontal: 10,
    width: "100%",
    borderRadius: 10,
  },
  loginText: {
    color: "#ffffff",
    fontSize: width * 0.05,
    textAlign: "center",
  },
  googleButton: {
    alignSelf: "center",
    padding: width * 0.04,
    backgroundColor: "#7166e4",
    marginVertical: height * 0.02,
    width: "100%",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  googleText: {
    color: "#ffffff",
    fontSize: width * 0.05,
  },
  googleIcon: {
    marginRight: width * 0.02,
  },

  createBtn: {
    padding: width * 0.02,
  },

  createText: {
    color: "#ffffff",
    fontSize: width * 0.04,
    textAlign: "center",
  },
});

export const userID = userID;
export default LogIn;
// export {userID , LogIn};
