import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCz3AkRxMjp0kr7FBPqq1yqiUKQBNI7IME",
  authDomain: "iti-airbnb.firebaseapp.com",
  projectId: "iti-airbnb",
  storageBucket: "iti-airbnb.appspot.com",
  messagingSenderId: "908654182860",
  appId: "1:908654182860:web:c1d1f153451b4a28e31d69",
};
//? Initialize Firebase for my App
export const app = initializeApp(firebaseConfig);
//? Initialize Firebase Authentication
export const firebaseAuth = getAuth(app);

// Local persistence
setPersistence(firebaseAuth, browserLocalPersistence)
  .then(() => {
    console.log("Firebase persistence set to LOCAL.");
  })
  .catch((error) => {
    console.error("Error setting persistence: ", error);
  });

//? Initialize Firestore Database to store data
export const firebaseFirestore = getFirestore(app);
