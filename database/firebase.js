// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; 
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA83Rp_FMEk0aiPWQw2DrleCBkErnpNwEk",
  authDomain: "laboratorio-7-88aae.firebaseapp.com",
  projectId: "laboratorio-7-88aae",
  storageBucket: "laboratorio-7-88aae.appspot.com",
  messagingSenderId: "725239653985",
  appId: "1:725239653985:web:d7a757b3649a0735e2ec20",
  measurementId: "G-Q4E14YDXH4"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const database = getFirestore();