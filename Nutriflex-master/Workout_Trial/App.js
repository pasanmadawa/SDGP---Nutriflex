import react from "react";
import StackNavigator from "./StackNavigator";

import { create } from 'zustand'

export const useStore = create((set) => ({
  currentUser: {},
  updateCurrentUser: (userData) => set({currentUser: userData}),

}))

export default function App() {
  return <StackNavigator />;
}
