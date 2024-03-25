import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import Icon from "react-native-vector-icons/Ionicons";

// Screens
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import ProfilePage from "./ProfilePage";
import MealPlan from "./MealPlan";
import WorkoutPlan from "./WorkoutPlan";
import EditMealPlan from "./EditMealPlan";
import EditWorkoutPlan from "./EditWorkoutPlan";
import StackNavigator from "../../StackNavigator";

import WelcomeScreen from "./WelcomeScreen";

// Screen names
const homeName = "Home";
const mealPlan = "Meal Plan";
const profilePage = "Profile";
const workoutPlan = "Workout Plan";
const editMealPlan = "EditMealPlan";
const editWorkoutPlan = "EditWorkoutPlan";
const welcome = "WelcomeScreen";
const stackNav = "Navigation";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === mealPlan) {
              iconName = focused ? "fast-food" : "fast-food-outline";
            } else if (rn === profilePage) {
              iconName = focused ? "person" : "person-outline";
            } else if (rn === workoutPlan) {
              iconName = focused ? "barbell" : "barbell-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#7166e4",
          tabBarInactiveTintColor: "grey",
          tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
          tabBarStyle: { padding: 10, height: 70 },
          // tabBarInactiveBackgroundColor: "red",
        })}
      >
        <Tab.Screen
          name={homeName}
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={mealPlan}
          component={StackNavigator1}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={workoutPlan}
          component={StackNavigator2}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={profilePage}
          component={ProfilePage}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function StackNavigator1() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={mealPlan} component={MealPlan} />
      <Stack.Screen name={editMealPlan} component={EditMealPlan} />
    </Stack.Navigator>
  );
}

function StackNavigator2() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={workoutPlan} component={WorkoutPlan} />
      <Stack.Screen name={editWorkoutPlan} component={EditWorkoutPlan} />
    </Stack.Navigator>
  );
}

export default MainContainer;
