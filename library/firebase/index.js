// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGcudGwHa8PLaapdzcBg9tewMG6LWbwyc",
  authDomain: "finance-tracker-fde84.firebaseapp.com",
  projectId: "finance-tracker-fde84",
  storageBucket: "finance-tracker-fde84.appspot.com",
  messagingSenderId: "204258163970",
  appId: "1:204258163970:web:fdb646a9eecf1e6a82161b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { app, db };