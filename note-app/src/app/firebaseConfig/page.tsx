// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbZUNU8OE5rXpzHxX1IKby-UMV8PPTv2s",
  authDomain: "note-app-7190a.firebaseapp.com",
  projectId: "note-app-7190a",
  storageBucket: "note-app-7190a.firebasestorage.app",
  messagingSenderId: "846713239836",
  appId: "1:846713239836:web:d7f11b41046d00c99622d9",
  measurementId: "G-HV941H2W2F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
