// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyMdCYTzBRjGcS2wzsJQAt9R1r0lg1NKQ",
  authDomain: "expense-tracker-69eae.firebaseapp.com",
  projectId: "expense-tracker-69eae",
  storageBucket: "expense-tracker-69eae.appspot.com",
  messagingSenderId: "25713629885",
  appId: "1:25713629885:web:90f8d82f99d3cd3859b5d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}