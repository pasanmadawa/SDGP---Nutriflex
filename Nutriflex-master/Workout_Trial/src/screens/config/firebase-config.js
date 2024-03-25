// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  
import { getAuth } from "firebase/auth";




const firebaseConfig = {
  apiKey: "AIzaSyC4cPpHlMyHA7odkiDKcdh5mnmG-ncRnbw",
  authDomain: "sdgp-project-2024-iit.firebaseapp.com",
  projectId: "sdgp-project-2024-iit",
  storageBucket: "sdgp-project-2024-iit.appspot.com",
  messagingSenderId: "340882517585",
  appId: "1:340882517585:web:df9f61b3091e5acb9bd270",
  measurementId: "G-BP60XJ5WSK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export {db,auth}

