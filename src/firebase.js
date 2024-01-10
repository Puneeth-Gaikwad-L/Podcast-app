// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0q3HHBjkpq8uCxmS-zGP3hf2zXz10EFU",
  authDomain: "podcast-app-react-4434b.firebaseapp.com",
  projectId: "podcast-app-react-4434b",
  storageBucket: "podcast-app-react-4434b.appspot.com",
  messagingSenderId: "409368007408",
  appId: "1:409368007408:web:1bd910377ea1f75793e835",
  measurementId: "G-9YRYCCS445",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, db, storage };
