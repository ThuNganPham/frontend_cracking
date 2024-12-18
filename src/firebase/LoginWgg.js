import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1dDkaJyBHWme7NgjbOV4JR4xdlaQryAI",
  authDomain: "zhu-zhu-b4c42.firebaseapp.com",
  projectId: "zhu-zhu-b4c42",
  storageBucket: "zhu-zhu-b4c42.appspot.com",
  messagingSenderId: "543127350127",
  appId: "1:543127350127:web:186064d1322b020781d69a",
  measurementId: "G-1B3B5L2DCT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, auth };
